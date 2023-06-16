import { rule, shield } from "graphql-shield"

// Define the rule
const isCurrentUser = rule()(async (parent, { id }, context) => id === context.session.user.id)
const isOwner = rule()(async (parent, args, context) => {
    // Get the user ID from the session
    const userId = context.session.user.id
  
    // Check if the user is the owner of the object by comparing the userId in the session with the userId in the args
    return args.userId === userId
  })

// Apply the rule to the fields
const permissions = shield({
    Query: {
      user: isCurrentUser,
      tasks: isOwner,
    },
    Mutation: {
        deleteUser: isCurrentUser,
    }
  })

export default permissions
