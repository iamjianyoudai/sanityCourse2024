import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gc9qrbb1',
    dataset: 'production'
  }
})

// import 'server-only'

// import {createClient, type QueryParams} from 'next-sanity'

// export const client = createClient({
//   projectId: 'gc9qrbb1',
//   dataset: 'production',
//   apiVersion: '2024-01-01',
//   useCdn: false,
// })

// export async function sanityFetch<const QueryString extends string>({
//   query,
//   params = {},
//   tags,
// }: {
//   query: QueryString
//   params?: QueryParams
//   tags?: string[]
// }) {
//   return client.fetch(query, params, {
//     next: {
//       revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
//       tags,
//     },
//   })
// }
