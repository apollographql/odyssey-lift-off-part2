import { gql }  from 'graphql-tag'

const typeDefs = gql`


  type Query {
    students : [Student!]
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
  }


  type Student  {
   name : String 
   rollno : Int
}

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main Author"
    author: Author!
    "The track's illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
  }

  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture"
    photo: String
  }
`;




let data = [{
  name : "rushikesh", 
  rollno : 12
}]

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: () => {},
    students : ( )  => [data]
  }
};




export {
  typeDefs ,
  resolvers
}