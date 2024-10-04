import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // transfer users
  const users = await payload.find({
    collection: 'users',
    depth: 1,
  })
  for (const user of users.docs) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: user,
    })
  }
  // transfer events
  const events = await payload.find({
    collection: 'events',
    depth: 1,
  })
  for (const event of events.docs) {
    await payload.update({
      collection: 'events',
      id: event.id,
      data: event,
    })
  }
  // tranfer media
  const media = await payload.find({
    collection: 'media',
    depth: 1,
  })
  for (const item of media.docs) {
    await payload.update({
      collection: 'media',
      id: item.id,
      data: item,
    })
  }
  // transfer pages
  const pages = await payload.find({
    collection: 'pages',
    depth: 1,
  })
  for (const page of pages.docs) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: page,
    })
  }

  // transfer globals CompanyInfo, header, footer
  //   const CompanyInfo = await payload.findGlobal({
  //     slug: 'globals',
  //     depth: 1,

  //   })
  //   if (CompanyInfo.totalDocs === 0) {
  //     await payload.create({
  //       collection: 'globals',
  //       data: CompanyInfo,
  //     })
  //   }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
}
