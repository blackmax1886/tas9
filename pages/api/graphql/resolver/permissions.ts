import { rule, shield } from 'graphql-shield'

const isCurrentUser = rule()(
  async (parent, { id }, context) => id === context.session.user.id
)
const isOwner = rule()(async (parent, args, context) => {
  const userId = context.session.user.id

  return args.userId === userId
})

const permissions = shield({
  Query: {
    user: isCurrentUser,
    tasks: isOwner,
  },
  Mutation: {
    deleteUser: isCurrentUser,
  },
})

export default permissions
