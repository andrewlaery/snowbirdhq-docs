  import { defineDocumentType, makeSource } from 'contentlayer/source-files'

  export const Property = defineDocumentType(() => ({
    name: 'Property',
    filePathPattern: `properties/**/*.mdx`,
    contentType: 'mdx',
    fields: {
      title: {
        type: 'string',
        description: 'Property name',
        required: true,
      },
      location: {
        type: 'string',
        description: 'Location in Queenstown',
        required: true,
      },
      capacity: {
        type: 'number',
        description: 'Maximum guests',
        required: true,
      },
      access: {
        type: 'enum',
        options: ['public', 'private'],
        default: 'public',
      },
    },
    computedFields: {
      slug: {
        type: 'string',
        resolve: (property) => property._raw.flattenedPath.replace('properties/', ''),
      },
    },
  }))

  export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Property],
  })
