import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import { history } from "../_helpers/index";
import { Role } from "../_helpers/index";
import { authenticationService } from "../_services/index";
import { PrivateRoute } from "../_components/index";
import { HomePage } from "../HomePage/index";
import { LoginPage } from "../LoginPage/index";
import { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { i18n } from "../i18n/index";
import { Films, FilmDetail } from "../Films/index";
import { Stars } from "../Stars/index";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export function App() {
  const [currentUser, setcurrentUser] = useState({});
  const [isAdmin, setisAdmin] = useState(false);
  const [locale, setlocale] = useState("tr");

  useEffect(() => {
    if (localStorage.getItem("locale")) {
      setlocale(localStorage.getItem("tr"));
    }
    authenticationService.currentUser.subscribe((x) => {
      setcurrentUser(x);
      x && x.role === Role.Admin;
    });
  });

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "light",
        },
      }),
    []
  );

  return (
    <IntlProvider locale={locale} messages={i18n[locale]}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute
            exact
            path="/films"
            roles={[Role.Admin, Role.FilmUser]}
            component={Films}
          />
          <PrivateRoute
            exact
            path="/stars"
            roles={[Role.Admin, Role.StarUser]}
            component={Stars}
          />
          <PrivateRoute
            exact
            path="/filmdetail"
            roles={[Role.Admin, Role.FilmUser]}
            component={FilmDetail}
          />
        </ThemeProvider>
        <Route exact path="/login" component={LoginPage} />
      </Router>
    </IntlProvider>
  );
}
