import React, { useEffect, useState } from "react";
import { filmService } from "../_services/index";
import { FilmGridList } from "../FilmGridList/index";

export function Films() {
  const [films, setfilms] = useState([]);

  useEffect(() => {
    filmService.getMovies().then((res) => {
      setfilms(res.data);
    });
  }, []);

  return (
    <div>
      Filmler
      <FilmGridList filmsProp={films} />
    </div>
  );
}
