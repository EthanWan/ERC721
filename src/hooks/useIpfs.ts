import React, { useState, useEffect } from 'react'
import type { IPFS } from 'ipfs-core-types'
// dot-prop: used to obtain a property of an object when the name of property is a string
// here we get ipfs.id when calling dotProp.get(ipfs, cmd), with cmd = 'id'
// and we get ipfs.hash when calling with cmd = 'hash' etc.
import { getProperty } from 'dot-prop'

/*
 * Pass the command you'd like to call on an ipfs instance.
 *
 * callIpfs uses setState write the response as a state variable, so that your component
 * will re-render when the result 'res' turns up from the call await ipfsCmd.
 *
 */
export default function useIpfs(
  ipfs: IPFS,
  cmd: string,
  opts: { [key: string]: string }
) {
  const [res, setRes] = useState<unknown>(null)
  useEffect(() => {
    callIpfs(ipfs, cmd, setRes, opts)
  }, [ipfs, cmd, opts])
  return res
}

async function callIpfs(
  ipfs: IPFS,
  cmd: string,
  setRes: React.Dispatch<unknown>,
  ...opts: unknown[]
) {
  if (!ipfs) return null
  console.log(`Call ipfs.${cmd}`)
  const ipfsCmd = getProperty(ipfs, cmd)
  // @ts-ignore
  const res = await ipfsCmd(...opts)
  console.log(`Result ipfs.${cmd}`, res)
  setRes(res)
}
