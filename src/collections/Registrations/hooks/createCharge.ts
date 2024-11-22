import { FormBuilderPluginConfig } from '../types'

export const createCharge = async (
  beforeChangeData: any,
  formConfig: FormBuilderPluginConfig,
): Promise<any> => {
  const { data, operation } = beforeChangeData

  let dataWithPaymentDetails = data

  if (operation === 'create') {
    const { handlePayment } = formConfig || {}

    if (typeof handlePayment === 'function') {
      dataWithPaymentDetails = await handlePayment(beforeChangeData)
    }
  }

  return dataWithPaymentDetails
}
