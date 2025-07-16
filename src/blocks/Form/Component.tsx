import { FormBlock } from '@/payload-types'
import { ContactForm } from './ContactForm'
import { DynamicForm } from './DynamicForm'
import Container from '@/components/Container'
import { RegistrationForm } from './RegistrationForm'

export type PostError = {
  message: string
  status?: string
}

export const FormBlockRouter = (props: FormBlock & { nested?: boolean }) => {
  const { form, nested } = props
  const { formType } = typeof form !== 'string' ? form : {}

  if (formType === 'dynamic') {
    if (nested) return <DynamicForm {...props} />
    return (
      <Container>
        <div className="mx-auto max-w-2xl">
          <DynamicForm {...props} />
        </div>
      </Container>
    )
  }

  if (typeof form === 'object' && formType === 'static') {
    if (form.form === 'contact') {
      if (nested) return <ContactForm {...props} />
      return (
        <Container>
        <div className="mx-auto max-w-2xl">
          <ContactForm {...props} />
        </div>
        </Container>
      )
    }
    if (form.form === 'registration') {
      if (nested) return <RegistrationForm {...props} />
      return (
        <Container>
        <div className="mx-auto max-w-2xl">
          <RegistrationForm {...props} />
          </div>
        </Container>
      )
    }
  }
}
