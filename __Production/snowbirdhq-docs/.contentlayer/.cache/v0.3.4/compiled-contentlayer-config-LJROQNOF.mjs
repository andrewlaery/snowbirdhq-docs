// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Property = defineDocumentType(() => ({
  name: "Property",
  filePathPattern: `properties/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Property name",
      required: true
    },
    location: {
      type: "string",
      description: "Location in Queenstown",
      required: true
    },
    capacity: {
      type: "number",
      description: "Maximum guests",
      required: true
    },
    access: {
      type: "enum",
      options: ["public", "private"],
      default: "public"
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (property) => property._raw.flattenedPath.replace("properties/", "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Property]
});
export {
  Property,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LJROQNOF.mjs.map
