import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Banner, Gutter } from '@payloadcms/ui'

const RegistrationCount = async () => {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs: count } = await payload.count({
    collection: 'registrations',
    where: {
      year: { equals: 2025 },
    },
  })
  return (
    <div>
      <Banner type="success">
        <h2 className="my-4 text-3xl font-semibold">2025 Registration Count: {count} </h2>
      </Banner>
    </div>
  )
}

export default RegistrationCount
