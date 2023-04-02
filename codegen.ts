import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'pages/api/graphql/schema/root.graphql',
  generates: {
    'pages/api/graphql/types/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        mappers: {
          PrismaUser: '@prisma/client/index.d#User',
        },
        scalars: {
          Date: 'string',
        },
      },
    },
  },
}

export default config
