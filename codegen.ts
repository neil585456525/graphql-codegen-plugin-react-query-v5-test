import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./example.schema.gql",
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/__generate__/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "@neil585456525/typescript-react-query": {
            fetcher: "graphql-request",
            addInfiniteQuery: true,
            reactQueryVersion: 5,
            exposeQueryKeys: true,
            exposeMutationKeys: true,
            exposeFetcher: true,
            exposeDocument: true,
          },
        },
      ],
    },
  },
};

export default config;
