import Form from './EForm'
import type { EForm } from './EForm'
import EItem from './EItem'

interface EInputComponent extends React.FC<EForm<unknown>> {
  EItem: typeof EItem
}

const EForm = Form as EInputComponent

EForm.EItem = EItem
export default EForm
