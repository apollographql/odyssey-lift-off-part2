import { TrackAPI } from "./datasources/track-api";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI;
  };
}
