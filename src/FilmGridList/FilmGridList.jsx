import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { tmdbInstancer } from "../_services/index";
import { Link } from "@material-ui/core";
import { history } from "../_helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    height: 185,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const handleFilmOnclick = (filmId) => {
  history.push({
    pathname: "filmdetail",
    state: { Id: filmId },
  });
};

export function FilmGridList({ filmsProp, ...props }) {
  const classes = useStyles();
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(filmsProp);
  });

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {films &&
          films.map((film) => (
            <GridListTile key={film.filmImageUrl}>
              <img
                src={tmdbInstancer.getLittleImage(film.filmImageUrl)}
                alt={film.filmName}
              />
              <Link onClick={() => handleFilmOnclick(film.id)}>
                <GridListTileBar
                  title={film.filmName}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${film.title}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </Link>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
