import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'pages/api/graphql/schema/root.graphql',
  documents: 'graphql/query/*.graphql',
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
          Date: 'Date',
        },
      },
    },
    'graphql/types/client.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config
