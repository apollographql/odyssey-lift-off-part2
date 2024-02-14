const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    tracksForHome: [Track!]!
    track: Track
  }

  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
  }

  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type Module {
    id: ID!
    title: String!
    length: Int
  }
`;

module.exports = typeDefs;
