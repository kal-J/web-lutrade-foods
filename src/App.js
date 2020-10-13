import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './redux/mapStateToProps';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import Menu from './components/navigation';
import Routes from './routes';
import { red } from '@material-ui/core/colors';
import colors from './components/layout/colors';
import './App.scss';
import Loading from './components/loading/Loading';
import { setLoading, setUser } from './redux/actions';
import firebase from './firebase';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.light },
  },
  status: {
    danger: red,
  },
});

const App = (props) => {
  const { loading, error } = props.redux_state;
  const { setLoading, setUser } = props;

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="app_container">
        <Loading />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="gradient">
        {error && <div className="row error">{error}</div>}
        {loading && <Loading />}

        <Menu />

        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, { setLoading, setUser })(App);
