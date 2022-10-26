const fetch = require('node-fetch');

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // returns the same data as tracksForHome, but uses node-fetch instead of RESTDataSource
    tracksForHomeFetch: async () => {
      const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
      const res = await fetch(`${baseUrl}/tracks`);
      return res.json();
    },
  },
  Track: {
    author: async ({ authorId }, _, { dataSources }) => {
      // using fetch instead of dataSources
      const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
      const res = await fetch(`${baseUrl}/author/${authorId}`);
      return res.json();

      // return dataSources.trackAPI.getAuthor(authorId);
    },
  },
};

module.exports = resolvers;
