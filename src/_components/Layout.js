import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useIntl } from "react-intl";
import { history } from "../_helpers/index";
import { authenticationService } from "../_services/index";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  exitButton: {
    display: "flex",
    justifyContent: "",
  },
}));

export function Layout({ children, ...rest }) {
  const intl = useIntl();
  // const intl = useIntl();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const logout = () => {
    authenticationService.logout();
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFilmsClick = () => {
    history.push("/films");
  };

  const handleStarsClick = () => {
    history.push("/stars");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {intl.formatMessage({ id: "title" })}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem
              onClick={handleFilmsClick}
              button
              key={intl.formatMessage({ id: "films" })}
            >
              <ListItemText primary={intl.formatMessage({ id: "films" })} />
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={handleStarsClick}
              button
              key={intl.formatMessage({ id: "stars" })}
            >
              <ListItemText primary={intl.formatMessage({ id: "stars" })} />
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={logout}
              button
              key={intl.formatMessage({ id: "logout" })}
            >
              <ListItemText primary={intl.formatMessage({ id: "logout" })} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main id='main' className={classes.content}>
        <Toolbar />
        {/* <div className={classes.drawerHeader} /> */}
        {children}
      </main>
    </div>
  );
}
