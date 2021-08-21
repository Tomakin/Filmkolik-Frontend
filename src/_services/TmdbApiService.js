import axios from "axios";

class TmdbApiService {
  constructor() {
    const tmdbApiKey = "d33930af25951e9b7724219a7973019a";
    const language = "tr"
    const baseUrl = "https://api.themoviedb.org/3/";
    this.movieKeyword = "movie";
    this.starKeyword = "person";
    this.imageUrl = "http://image.tmdb.org/t/p/";
    this.sizes = {
      little: "w500",
      big: "original",
    };

    const instancer = axios.create({
      baseURL: baseUrl,
      params: {
        api_key: tmdbApiKey,
        language: language
      },
    });
    this.axiosInstencer = instancer;
  }

  //Movie
  async getMovie(movieId) {
    try {
      const resp = await this.axiosInstencer.get(
        `${this.movieKeyword}/${movieId}`
      );
      return resp;
    } catch (errorResp) {
      return Promise.reject(errorResp);
    }
  }

  async getCredits(movieId) {
    try {
      const resp = await this.axiosInstencer.get(
        `${this.movieKeyword}/${movieId}/credits`
      );
      return resp;
    } catch (errorResp) {
      return Promise.reject(errorResp);
    }
  }

  //Star
  async getStar(starId) {
    try {
      const resp = await this.axiosInstencer.get(`${starKeyword}/${starId}`);
      return resp;
    } catch (errorResp) {
      return Promise.reject(errorResp);
    }
  }

  getLittleImage(image) {
    return `${this.imageUrl}${this.sizes.little}${image}`;
  }

  getOriginalImage(image) {
    return `${this.imageUrl}${this.sizes.big}${image}`;
  }
}

const tmdbInstancer = new TmdbApiService();
export { tmdbInstancer };
