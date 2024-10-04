import type { BasePayload, CollectionSlug, GlobalSlug } from "payload"

export const seedUp = async ({ payload }: { payload: BasePayload }) => {
  // transfer users
  const users = await payload.find({
    collection: 'users',
    depth: 10,
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
    depth: 10,
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
    depth: 10,
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
    depth: 10,
  })
  for (const page of pages.docs) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: page,
    })
  }

  // transfer globals CompanyInfo, Header, Footer
  const CompanyInfo = await payload.findGlobal({
    slug: 'company-info',
    depth: 10,
  })
  if (CompanyInfo.updatedAt === null) {
    await payload.updateGlobal({
      slug: 'company-info',
      data: CompanyInfo,
    })
  }

  const Header = await payload.findGlobal({
    slug: 'header',
    depth: 10,
  })
  if (Header.updatedAt === null) {
    await payload.updateGlobal({
      slug: 'header',
      data: Header,
    })
  }

  const Footer = await payload.findGlobal({
    slug: 'footer',
    depth: 10,
  })
  if (Footer.updatedAt === null) {
    await payload.updateGlobal({
      slug: 'footer',
      data: Footer,
    })
  }
}

export const seedDown = async ({ payload }: { payload: BasePayload }) => {
  // Remove seeded data
  const collections: CollectionSlug[] = ['users', 'events', 'media', 'pages'];
  const globals: GlobalSlug[] = ['company-info', 'header', 'footer'];

  // Delete all documents from collections
  for (const collection of collections) {
    const items = await payload.find({ collection, limit: 1000 });
    for (const item of items.docs) {
      await payload.delete({ collection, id: item.id });
    }
  }

  // Reset globals
  for (const slug of globals) {
    await payload.updateGlobal({ slug, data: {} });
  }
}
