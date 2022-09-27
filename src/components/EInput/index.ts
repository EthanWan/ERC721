import Input from './EInput'
import type { EInputProps } from './EInput'
import ETextArea from './ETextArea'

interface EInputComponent extends React.FC<EInputProps> {
  ETextArea: typeof ETextArea
}

const EInput = Input as EInputComponent

EInput.ETextArea = ETextArea
export default EInput
