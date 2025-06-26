import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

// 환경에 따라 적절한 .env 파일을 로드 (next.config.ts와 동일한 로직)
const envFile =
  process.env.APP_ENV === "beta"
    ? ".env.beta"
    : process.env.APP_ENV === "prod"
    ? ".env"
    : ".env.dev";

dotenv.config({ path: envFile, override: true });

if (!process.env.NEXT_PUBLIC_GRAPHQL_API) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_API 환경변수가 설정되어 있지 않습니다.");
}

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_API,
  documents: "app/**/*.graphql",
  generates: {
    "graphql/generated/": {
      preset: "client",
      presetConfig: {
        baseTypesPath: "~@/graphql/generated/graphql",
        fragmentMasking: false,
      },
    },
    "graphql/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },
    "app/": {
      preset: "near-operation-file-preset",
      presetConfig: {
        baseTypesPath: "~@/graphql/generated/graphql",
        extension: ".generated.ts",
        importTypesNamespace: "Types",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        useTypeImports: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config;
