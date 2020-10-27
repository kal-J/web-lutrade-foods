import firebase from '../firebase';

const addMenuItem = (data, setLoading, setError, restaurant) => {
  const { id, menu } = restaurant;

  return new Promise((resolve, reject) => {
    setLoading(true);
    firebase
      .firestore()
      .collection('restaurants')
      .doc(id)
      .update({
        menu: [...menu, data],
      })
      .then(() => {
        setLoading(false);
        resolve(true);
      })
      .catch((error) => {
        setLoading(false);
        setError('There was an Error adding new Item onto the menu');
        reject(error);
      });
  });
};

export { addMenuItem };
