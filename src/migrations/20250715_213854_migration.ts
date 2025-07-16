import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Migrating data from "registrations" to "registrations-v2"...')

  const oldRegistrations = await payload.find({
    collection: 'registrations',
    limit: 9999, // Adjust limit as needed for your data size
    depth: 0,
    overrideAccess: true,
    req,
  })

  for (const oldReg of oldRegistrations.docs) {
    const parentNameParts = oldReg.parentName ? String(oldReg.parentName).split(' ') : []
    const parentFirstName = parentNameParts.length > 0 ? parentNameParts[0] : ''
    const parentLastName = parentNameParts.length > 1 ? parentNameParts.slice(1).join(' ') : ''

    await payload.create({
      collection: 'registrations-v2',
      data: {
        year: String(oldReg.year), // Convert number to string
        firstName: oldReg.childFirstName,
        lastName: oldReg.childLastName,
        dob: oldReg.childBirthdate,
        ethnicity: oldReg.ethnicity ?? "Some other race",
        gender: oldReg.gender ?? "Prefer not to say",
        notes: oldReg.notes,
        paid: true, // All old registrations are considered paid
        parents: [
          {
            firstName: parentFirstName,
            lastName: parentLastName,
            phone: oldReg.parentPhone,
            email: oldReg.parentEmail,
            postalCode: oldReg.postalCode ?? "",
          },
        ],
      },
      overrideAccess: true,
      req,
    })
  }

  payload.logger.info('Migration from "registrations" to "registrations-v2" complete.')
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Reverting migration: Deleting all "registrations-v2" documents...')

  // Delete all documents from the new collection
  const allNewRegistrations = await payload.find({
    collection: 'registrations-v2',
    limit: 9999, // Adjust limit as needed
    depth: 0,
    overrideAccess: true,
    req,
  })

  for (const newReg of allNewRegistrations.docs) {
    await payload.delete({
      collection: 'registrations-v2',
      id: newReg.id,
      overrideAccess: true,
      req,
    })
  }

  payload.logger.info('Reversion complete: "registrations-v2" documents deleted.')
}