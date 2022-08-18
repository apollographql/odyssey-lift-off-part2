const resolvers = {
    Query: {
        // Returns an array of Tracks that will be used to populate
        // - the homepage grid of our web client.
        // The normal arguments are - parent, args, context, and info
        // We replaced the first two with _, and __
        // The last argument we are omitting since we dont need it and it comes
        //  - after the argument that we do need - "context".
        // With the "context" arg, we are destructuing it to
        // - get the info we need {dataSources}
        tracksForHome: (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracksForHome();
        }
    },

    Track: {
        author: ({authorId}, _, {dataSources}) => {
            return dataSources.trackAPI.getAuthor(authorId);
        }
    }
};

module.exports = resolvers;