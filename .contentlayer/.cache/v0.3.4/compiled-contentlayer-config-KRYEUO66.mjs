// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Property = defineDocumentType(() => ({
  name: "Property",
  filePathPattern: `properties/*/property.mdx`,
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
      resolve: (property) => property._raw.sourceFileDir.split("/").pop()
    }
  }
}));
var WelcomeHouseRules = defineDocumentType(() => ({
  name: "WelcomeHouseRules",
  filePathPattern: `properties/*/welcome-house-rules.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Document title",
      default: "Welcome & House Rules"
    }
  },
  computedFields: {
    propertySlug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split("/").pop()
    }
  }
}));
var UserInstructions = defineDocumentType(() => ({
  name: "UserInstructions",
  filePathPattern: `properties/*/user-instructions.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Document title",
      default: "User Instructions"
    }
  },
  computedFields: {
    propertySlug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split("/").pop()
    }
  }
}));
var CriticalInfo = defineDocumentType(() => ({
  name: "CriticalInfo",
  filePathPattern: `properties/*/critical-info.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Document title",
      default: "Critical & Essential Information"
    }
  },
  computedFields: {
    propertySlug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split("/").pop()
    }
  }
}));
var LocalGuide = defineDocumentType(() => ({
  name: "LocalGuide",
  filePathPattern: `locations/*/local-guide.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Guide title",
      required: true
    },
    location: {
      type: "string",
      description: "Location name",
      required: true
    }
  },
  computedFields: {
    locationSlug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split("/").pop()
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Property, WelcomeHouseRules, UserInstructions, CriticalInfo, LocalGuide]
});
export {
  CriticalInfo,
  LocalGuide,
  Property,
  UserInstructions,
  WelcomeHouseRules,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KRYEUO66.mjs.map
