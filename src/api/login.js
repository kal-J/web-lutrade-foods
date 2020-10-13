import firebase from '../firebase';

const login = (data, setLoading, setError, setUser) => {
  const { email, password } = data;

  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
          const {user} = data;
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const accessToken = user.accessToken;
        // The signed-in user info.

        setUser(user);
        setLoading(false);

      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        if (error) {
          setError(errorMessage);
        } else setError('something went wrong, try again');
        setLoading(false);
      });
};

export { login };
