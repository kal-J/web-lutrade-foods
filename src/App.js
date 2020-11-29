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
import { setLoading, setUser, setRestaurant, setError } from './redux/actions';
import firebase from './firebase';
import Footer from './components/footer/Footer';

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
  const { loading, error, user } = props.redux_state;
  const { setLoading, setUser, setRestaurant } = props;

  useEffect(() => {
    setLoading(true);
    console.log('\n\n\n\n', 'onAuthSateChanged hook began execution...');

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    setLoading(false);
    console.log('\n\n\n\n', 'onAuthSateChanged hook ended execution...');

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('\n\n\n\n', 'firebase Firestore hook began execution...');
    if (user.uid) {
      console.log('\n\n\n\n', user.uid, '\n\n\n');
      firebase
        .firestore()
        .collection('restaurants')
        .where('admin_uid', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const restaurant_snapshot = querySnapshot.docs[0];
            const restaurant_data = restaurant_snapshot.data();
            const restaurant_id = restaurant_snapshot.id;

            console.log(JSON.stringify(restaurant_data, null, 2));

            setRestaurant({ id: restaurant_id, ...restaurant_data });
          } else {
            setError('There was an error in retrieving restaurant information');
          }
        });
    }
    console.log('\n\n\n\n', 'firebase Firestore hook ended execution...');
  }, [user, setRestaurant]);

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

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, { setLoading, setUser, setRestaurant })(
  App
);
