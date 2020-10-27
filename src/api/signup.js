import firebase from '../firebase';

const signup = (data, setLoading, setError, setUser) => {
  const { restaurant_name, email, password } = data;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      const { user } = data;

      // create new restaurant

      firebase
        .firestore()
        .collection('restaurants')
        .add({
          admin_uid: user.uid,
          name: restaurant_name,
        })
        .then(() => {
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            setError('The password is too weak.');
          } else {
            setError(errorMessage);
          }
          setLoading(false);
        });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        setError('The password is too weak.');
      } else {
        setError(errorMessage);
      }
      setLoading(false);
    });
};

export { signup };
