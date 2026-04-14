import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Banner } from '@payloadcms/ui'
import { getCurrentRegistrationYear } from '@/utilities/registrationYear'

const RegistrationCount = async () => {
  const payload = await getPayload({ config: configPromise })
  const registrationYear = getCurrentRegistrationYear()
  const { totalDocs: count } = await payload.count({
    collection: 'registrations-v2',
    where: {
      year: { equals: registrationYear },
    },
  })
  return (
    <div>
      <Banner type="success">
        <h2 className="my-4 text-3xl font-semibold">
          {registrationYear} Registration Count: {count}
        </h2>
      </Banner>
    </div>
  )
}

export default RegistrationCount
