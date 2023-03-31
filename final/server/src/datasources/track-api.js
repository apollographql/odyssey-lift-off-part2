const { RESTDataSource } = require('@apollo/datasource-rest');

class TrackAPI extends RESTDataSource {
  // the Catstronauts catalog is hosted on this server
  baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';

  async getTracksForHome() {
    return this.get('tracks');
  }

  async getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }
}

module.exports = TrackAPI;
