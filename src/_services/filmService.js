import { instance } from "./index";

export const filmService = {
  getMovies,
  getMovieDetails,
  addFilmDetail
};

function getMovies() {
  const resp = instance.get("/films").then((res) => res);
  return resp;
}

function getMovieDetails(id) {
  const resp = instance.get(`/films/getfilmdetails/${id}`).then((res) => res);
  return resp;
}

function addFilmDetail(filmDetail) {
  const resp = instance.post("films/addFilmDetails", filmDetail).then((res) => res);
}
