const commentTypes = `
  # Comment definitions
  type Comment {
    id: ID!
    comment: String!
    createdAt: String!
    updatedAt: String!
    user: User!
    post: Post!
  }

  # Input to mutate comments
  input CommentInput {
    comment: String!
    post: Int!
    user: Int!
  }
`;

const commentQueries = `
  commentsByPost(post: ID!, first: Int, offset: Int): [Comment!]!
`;

const commentMutations = `
  createComment(input: CommentInput!): Comment
  updateComment(id: ID!, input: CommentInput!): Comment
  deleteComment(id: ID!): Boolean
`;

export { commentTypes, commentQueries, commentMutations };
