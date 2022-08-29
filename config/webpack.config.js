const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const path = require('path')
const fs = require('fs')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const paths = require('./paths')

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false
  }

  try {
    require.resolve('react/jsx-runtime')
    return true
  } catch (e) {
    return false
  }
})()

const useTypeScript = fs.existsSync(paths.appTsConfig)

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile')
  const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000')

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: paths.publicUrlOrPath.startsWith('.') ? { publicPath: '../../' } : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            ident: 'postcss',
            config: false,
            plugins: [
              'tailwindcss',
              'postcss-flexbugs-fixes',
              [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
            ],
          },
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
    ].filter(Boolean)
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            root: paths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      )
    }
    return loaders
  }

  return {
    target: ['browserslist'],
    stats: 'errors-warnings',
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: paths.appIndexJs,
    output: {
      path: paths.appBuild,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      publicPath: paths.publicUrlOrPath,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    infrastructureLogging: {
      level: 'none',
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        // This is only used in production mode
        new CssMinimizerPlugin(),
      ],
    },
    resolve: {
      // modules: ['node_modules', paths.appNodeModules].concat(
      //   modules.additionalModulePaths || []
      // ),
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        // ...(modules.webpackAliases || {}),
      },
      plugins: [
        // new ModuleScopePlugin(paths.appSrc, [
        //   paths.appPackageJson,
        //   reactRefreshRuntimeEntry,
        //   reactRefreshWebpackPluginRuntimeEntry,
        //   babelRuntimeEntry,
        //   babelRuntimeEntryHelpers,
        //   babelRuntimeRegenerator,
        // ]),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Handle node_modules packages that contain sourcemaps
        shouldUseSourceMap && {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader'),
        },
        {
          oneOf: [
            {
              test: [/\.avif$/],
              type: 'asset',
              mimetype: 'image/avif',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit,
                },
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit,
                },
              },
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve('@svgr/webpack'),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve('file-loader'),
                  options: {
                    name: 'static/media/[name].[hash].[ext]',
                  },
                },
              ],
              issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: hasJsxRuntime ? 'automatic' : 'classic',
                    },
                  ],
                ],
                plugins: [
                  isEnvDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: shouldUseSourceMap,
                inputSourceMap: shouldUseSourceMap,
              },
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                modules: {
                  mode: 'icss',
                },
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: /\.module\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                modules: {
                  mode: 'local',
                  getLocalIdent: '[name]_[hash:5]',
                },
              }),
            },
            {
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ].filter(Boolean),
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      // isEnvProduction &&
      //   shouldInlineRuntimeChunk &&
      //   new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // // Makes some environment variables available in index.html.
      // // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // // It will be an empty string unless you specify "homepage"
      // // in `package.json`, in which case it will be the pathname of that URL.
      // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // // This gives some necessary context to module not found errors, such as
      // // the requesting resource.
      // new ModuleNotFoundPlugin(paths.appPath),
      // // Makes some environment variables available to the JS code, for example:
      // // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // // It is absolutely essential that NODE_ENV is set to production
      // // during a production build.
      // // Otherwise React will be compiled in the very slow development mode.
      // new webpack.DefinePlugin(env.stringified),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/main/packages/react-refresh
      isEnvDevelopment &&
        new ReactRefreshWebpackPlugin({
          overlay: false,
        }),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      // isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      // // Generate an asset manifest file with the following content:
      // // - "files" key: Mapping of all asset filenames to their corresponding
      // //   output file so that tools can pick it up without having to parse
      // //   `index.html`
      // // - "entrypoints" key: Array of files which are included in `index.html`,
      // //   can be used to reconstruct the HTML if necessary
      // new WebpackManifestPlugin({
      //   fileName: 'asset-manifest.json',
      //   publicPath: paths.publicUrlOrPath,
      //   generate: (seed, files, entrypoints) => {
      //     const manifestFiles = files.reduce((manifest, file) => {
      //       manifest[file.name] = file.path
      //       return manifest
      //     }, seed)
      //     const entrypointFiles = entrypoints.main.filter(
      //       fileName => !fileName.endsWith('.map')
      //     )

      //     return {
      //       files: manifestFiles,
      //       entrypoints: entrypointFiles,
      //     }
      //   },
      // }),
      // // Moment.js is an extremely popular library that bundles large locale files
      // // by default due to how webpack interprets its code. This is a practical
      // // solution that requires the user to opt into importing specific locales.
      // // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // // You can remove this if you don't use Moment.js:
      // new webpack.IgnorePlugin({
      //   resourceRegExp: /^\.\/locale$/,
      //   contextRegExp: /moment$/,
      // }),
      // // Generate a service worker script that will precache, and keep up to date,
      // // the HTML & assets that are part of the webpack build.
      // isEnvProduction &&
      //   fs.existsSync(swSrc) &&
      //   new WorkboxWebpackPlugin.InjectManifest({
      //     swSrc,
      //     dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
      //     exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
      //     // Bump up the default maximum size (2mb) that's precached,
      //     // to make lazy-loading failure scenarios less likely.
      //     // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
      //     maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      //   }),
      // TypeScript type checking
      // useTypeScript &&
      //   new ForkTsCheckerWebpackPlugin({
      //     async: isEnvDevelopment,
      //     typescript: {
      //       typescriptPath: resolve.sync('typescript', {
      //         basedir: paths.appNodeModules,
      //       }),
      //       configOverwrite: {
      //         compilerOptions: {
      //           sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      //           skipLibCheck: true,
      //           inlineSourceMap: false,
      //           declarationMap: false,
      //           noEmit: true,
      //           incremental: true,
      //           tsBuildInfoFile: paths.appTsBuildInfoFile,
      //         },
      //       },
      //       context: paths.appPath,
      //       diagnosticOptions: {
      //         syntactic: true,
      //       },
      //       mode: 'write-references',
      //       // profile: true,
      //     },
      //     issue: {
      //       // This one is specifically to match during CI tests,
      //       // as micromatch doesn't match
      //       // '../cra-template-typescript/template/src/App.tsx'
      //       // otherwise.
      //       include: [
      //         { file: '../**/src/**/*.{ts,tsx}' },
      //         { file: '**/src/**/*.{ts,tsx}' },
      //       ],
      //       exclude: [
      //         { file: '**/src/**/__tests__/**' },
      //         { file: '**/src/**/?(*.){spec|test}.*' },
      //         { file: '**/src/setupProxy.*' },
      //         { file: '**/src/setupTests.*' },
      //       ],
      //     },
      //     logger: {
      //       infrastructure: 'silent',
      //     },
      //   }),
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: () => {}, // require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),
        failOnError: !isEnvDevelopment,
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
        // ESLint class options
        cwd: paths.appPath,
        resolvePluginsRelativeTo: __dirname,
        // baseConfig: {
        //   extends: [require.resolve('eslint-config-react-app/base')],
        //   rules: {
        //     ...(!hasJsxRuntime && {
        //       'react/react-in-jsx-scope': 'error',
        //     }),
        //   },
        // },
      }),
    ].filter(Boolean),
    performance: false,
  }
}
