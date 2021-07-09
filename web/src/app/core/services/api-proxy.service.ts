import { Injectable } from '@angular/core';
import axios from 'axios';
import {AnimeResponse,EpisodesResponse,MoviesResponse,SpecialsReponse,OvasResponse,ServersResponse,SearchResponse } from '../models/models';
import {Anime,Episode,Server } from '../models/models';
@Injectable({
  providedIn: 'root'
})
export class ApiProxyService {
  BASE_URL = "https://aruppi.jeluchu.xyz/apis/animeflv/v1"

  constructor() { }
  
    async getLatestAnimes():Promise<Anime[]> {
        try {
            const animes = await axios.get<AnimeResponse>(`${this.BASE_URL}/TV/latest/1`)
            return animes.data.tv
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    async getLatestEpisodes():Promise<Episode[]> {
        try {
            const animes = await axios.get<EpisodesResponse>(`${this.BASE_URL}/LatestEpisodesAdded`)
            return animes.data.episodes;
        } catch (error) {
            console.error(error)
            return null;
        }
    }


    async getLatestMovies():Promise<Anime[]> {
        try {
            const animes = await axios.get<MoviesResponse>(`${this.BASE_URL}/Movies/latest/1`)
            return animes.data.movies;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    async getLatestSpecials():Promise<Anime[]> {
        try {
            const animes = await axios.get<SpecialsReponse>(`${this.BASE_URL}/Special/latest/1`)
            return animes.data.special;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    async getLatestOvas() {
        try {
            const animes = await axios.get<OvasResponse>(`${this.BASE_URL}/Ova/latest/1`)
            return animes.data.ova;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    async getEpisodeServers(animeId:string, animeTitle:string):Promise<Server[]> {
        try {
            const servers = await axios.get<ServersResponse>(`${this.BASE_URL}/GetAnimeServers/${animeId}/${animeTitle}`)

            return servers.data.servers;
        } catch (error) {
          return null;
        }
    }

    async getAnimeInfo(animeId:string, animeTitle:string):Promise<Anime> {
        try {
            const animes = await axios.get<SearchResponse>(`${this.BASE_URL}/Search/${animeTitle.toLowerCase()}`)

            for (let anime of animes.data.search) {
                if (anime.id == `anime/${animeId}`)
                    return anime;
            }

            return null;

        } catch (error) {
            console.error(error)
            return null;
        }
    }


    async getSearch(search:string):Promise<Anime[]> {
        try {
            const animes = await axios.get<SearchResponse>(`${this.BASE_URL}/Search/${search}`)
            return animes.data.search;

        } catch (error) {
            console.error(error)
            return null;
        }
    }
}
