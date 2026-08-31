import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    /** Returns an array of Tracks that will be used to populate
     * the homepage grid of our web client
     */
    // tracksForHome: (parent, args, context, info) =>{},
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    tracksForHomeFetch: async (_, __, { dataSources }) => {
      const baseUrl = "https://odyssey-lift-off-rest-api.herokuapp.com";
      const res = await fetch(`${baseUrl}/tracks`);
      return res.json();
    },
  },
  Track: {
    author: async ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
  },
};
