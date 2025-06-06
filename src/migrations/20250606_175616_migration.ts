import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  // Fetch all paid form-submissions
  const { docs: submissions } = await payload.find({
    collection: 'form-submissions',
    where: { 'payment.status': { equals: 'paid' } },
    limit: 10000,
    req,
  })

  for (const submission of submissions) {
    const submissionData = submission.submissionData as any
    const year = new Date(submission.createdAt).getFullYear()
    const parentEmail = submissionData?.parents?.[0]?.email
    const players = Array.isArray(submissionData?.players) ? submissionData.players : []

    for (const player of players) {
      if (!player) continue
      const childFirstName = player.firstName || player.childFirstName
      const childLastName = player.lastName || player.childLastName
      const gender = player.gender || 'N/A'
      const ethnicity = player.ethnicity || 'N/A'

      // Find the registration
      const regs = await payload.find({
        collection: 'registrations',
        where: {
          year: { equals: year },
          childFirstName: { equals: childFirstName },
          childLastName: { equals: childLastName },
          parentEmail: { equals: parentEmail },
        },
        limit: 10,
        req,
      })

      for (const reg of regs.docs) {
        await payload.update({
          collection: 'registrations',
          id: reg.id,
          data: { ethnicity, gender },
          req,
        })
      }
    }
  }
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Optionally remove ethnicity from all registrations
  const regs = await payload.find({ collection: 'registrations', limit: 10000, req })
  for (const reg of regs.docs) {
    await payload.update({
      collection: 'registrations',
      id: reg.id,
      data: { ethnicity: '', gender: '' },
      req,
    })
  }
}
