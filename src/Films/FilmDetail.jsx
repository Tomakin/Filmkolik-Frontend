import React, { useEffect, useState } from "react";
import { filmService, tmdbInstancer } from "../_services/index";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Color from "color";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rating from "react-rating";
import yellow from "../assets-images/star-yellow.png";
import grey from "../assets-images/star-grey.png";

const useStyles = makeStyles((theme) => ({
  paperBgColor: {
    backgroundColor: Color("rgba(26, 25, 23, 0)").alpha(0.7).string(),
  },
  movieName: {
    ...theme.typography.button,
    fontSize: "40px",
    textAlign: "center",
    color: Color("rgb(255, 255, 255)").string(),
  },
  overview: {
    color: Color("rgb(255, 255, 255)").string(),
  },
  tagLine: {
    fontSize: "24px",
    color: theme.palette.primary.light,
  },
  genre: {
    color: theme.palette.primary.light,
    fontSize: "24px",
  },
  prodComps: {
    color: Color("rgb(255, 255, 255)").string(),
  },
  actors: {
    color: Color("rgb(255, 255, 255)").string(),
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: theme.spacing(3, 2),
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  rating: {
    textAlign: "end",
  },
  border: {
    borderColor: theme.palette.primary.dark,
    border: "3px solid",
    borderRadius: "16px",
  },
  icon: {
    width: "26px",
    height: "26px",
  },
}));

function FilmDetail(props) {
  const Id = props.location.state.Id;
  const [film, setFilm] = useState({});
  const [credits, setCredits] = useState({});
  const [filmDetails, setFilmDetails] = useState({});

  const classes = useStyles();

  useEffect(() => {
    tmdbInstancer.getMovie(Id).then((f) => {
      setFilm(f.data);
    });
    tmdbInstancer.getCredits(Id).then((c) => {
      setCredits(c.data);
    });
    filmService.getMovieDetails(Id).then((d) => {
      setFilmDetails(d.data);
    });
  }, []);

  const handleRating = (value) => {
    setFilmDetails({ ...filmDetails, score: value });
  };
  const textareaOnChangeHandler = () => {
    setFilmDetails({ ...filmDetails, not: event.target.value });
  };
  const handleButtonOnclick = () => {
    filmService.addFilmDetail(filmDetails);
  };

  if (film.backdrop_path && document.getElementById("main")) {
    var main = document.getElementById("main");
    main.style.backgroundImage = `url(${tmdbInstancer.getOriginalImage(
      film.backdrop_path
    )})`;
    main.style.backgroundSize = "cover";
    main.style.backgroundPosition = "top center";
  }

  if (credits.cast) {
    var actors = credits.cast
      .filter((obj) => obj.known_for_department === "Acting")
      .slice(0, 5);
  }

  return (
    <div>
      <Container>
        <Paper className={classes.paperBgColor}>
          <Grid container>
            <Grid md={5} item>
              <Box
                component="img"
                maxWidth="100%"
                height="100%"
                alt="The house from the offer."
                src={tmdbInstancer.getLittleImage(film.poster_path)}
              />
            </Grid>
            <Grid md={7} item>
              <Typography className={classes.movieName}>
                {film.original_title}
              </Typography>
              <Box px={3}>
                <Typography className={classes.tagLine}>
                  {film.tagline}
                </Typography>
              </Box>
              <Box px={3}>
                <Typography className={classes.overview}>
                  {film.overview}
                </Typography>
              </Box>
              <Box p={3}>
                <Typography className={classes.genre}>
                  {film.genres &&
                    film.genres.map((genre) => genre.name).join(", ")}
                </Typography>
              </Box>
              <Box px={3}>
                <Typography className={classes.prodComps}>
                  {film.production_companies &&
                    film.production_companies
                      .map((comp) => comp.name)
                      .join(", ")}
                </Typography>
              </Box>
              <Box p={3}>
                <Typography className={classes.actors}>
                  {actors && actors.map((actors) => actors.name).join(", ")}
                </Typography>
              </Box>
              <Box p={3}>
                <Box className={classes.rating} px={3}>
                  <Rating
                    stop={10}
                    placeholderRating={filmDetails.score}
                    placeholderSymbol={
                      <img src={yellow} className={classes.icon} />
                    }
                    emptySymbol={<img src={grey} className={classes.icon} />}
                    fullSymbol={<img src={yellow} className={classes.icon} />}
                    onChange={handleRating}
                  />
                </Box>
                <textarea
                  className={classes.textarea}
                  value={filmDetails.not}
                  placeholder={filmDetails.not}
                  // onChange = {(event) => {setFilmDetails({event, ...filmDetails})}}
                  onChange={textareaOnChangeHandler}
                />
              </Box>
              <Box p={3} display="flex" flexDirection="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleButtonOnclick}
                >
                  Rate
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export { FilmDetail };
