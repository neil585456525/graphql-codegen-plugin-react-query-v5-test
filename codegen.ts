import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "@neil585456525/typescript-react-query": {
            addInfiniteQuery: true,
            reactQueryVersion: 5,
          },
        },
      ],
    },
  },
};

export default config;
