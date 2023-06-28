import {TrackAPI} from "./datasources/track-api"

export interface TrackContext {
  dataSources: {
    trackAPI: TrackAPI
  }
}