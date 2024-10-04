import type { BasePayload, CollectionSlug, GlobalSlug } from "payload"

const sourceApiUrl = process.env.SOURCE_API_URL || 'http://localhost:3000';
const apiKey = process.env.SOURCE_API_KEY || 'your-api-key';

const fetchWithAuth = (url: string) =>
  fetch(`${sourceApiUrl}${url}`, {
    headers: {
      Authorization: `users API-Key ${apiKey}`,
    },
  });

export const seedUp = async ({ payload }: { payload: BasePayload }) => {
  // Function to transfer data for a collection
  const transferCollection = async (collectionName: string) => {
    const response = await fetchWithAuth(`/api/${collectionName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const items = data.docs;
    for (const item of items) {
      await payload.create({
        collection: collectionName as CollectionSlug,
        data: item,
      });
    }
  }

  // Transfer collections
  const collections = ['users', 'events', 'media', 'pages'];
  for (const collection of collections) {
    await transferCollection(collection);
  }

  // Function to transfer global data
  const transferGlobal = async (slug: string) => {
    const response = await fetchWithAuth(`/api/globals/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const globalData = await response.json();
    await payload.updateGlobal({
      slug: slug as GlobalSlug,
      data: globalData,
    });
  }

  // Transfer globals
  const globals = ['company-info', 'header', 'footer'];
  for (const global of globals) {
    await transferGlobal(global);
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
