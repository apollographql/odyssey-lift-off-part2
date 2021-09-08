const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (parent, args, context, info) => {
      const { dataSources } = context;
      return dataSources.trackAPI.getTracksForHome();
    },
  },
  Track: {
    author: (parent, args, context, info) => {
      const { dataSources } = context;
      const { authorId } = parent;
      return dataSources.trackAPI.getAuthor(authorId);
    }
  }
};

module.exports = { resolvers };
