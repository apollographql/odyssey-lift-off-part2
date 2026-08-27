import { RESTDataSource } from "@apollo/datasource-rest";

export class TrackAPI extends RESTDataSource {
  baseURL = "https://catstronauts-api.up.railway.app/";

  getTracksForHome() {
    return this.get("tracks");
  }
  getAuthor(authorId: string) {
    return this.get(`authors/${encodeURIComponent(authorId)}`);
  }
}
