const postTypes = `
  # Post definition types
  type Post {
    id: ID!
    title: String!
    content: String!
    photo: String!
    createdAt: String!
    updatedAt: String!
    author: User!
    comments: [Comment!]!
  }

  input PostInput {
    title: String!
    content: String!
    photo: String!
    author: Int!
  }
`;

const postQueries = `
  posts(first: Int, offset: Int): [Post!]!
  post(id: ID!): Post
`;

const postMutations = `
  createPost(input: PostInput!): Post
  updatePost(id: ID!, input: PostInput!): Post
  delete(id: ID!, input: PostInput!): Boolean
`;

export { postTypes, postQueries, postMutations };