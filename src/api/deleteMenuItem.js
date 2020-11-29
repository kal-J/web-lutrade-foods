import firebase from '../firebase';

const deleteMenuItem = (item, setLoading, setError, restaurant) => {
  const { id, name, menu } = restaurant;

  return new Promise((resolve, reject) => {
    setLoading(true);

    if (!id) {
      setError('Failed to read restaurant information from the server');
      setLoading(false);
      return reject({ status: 'failure' });
    }

    const newMenu = menu.filter(
      (restaurant_item, index) => restaurant_item !== item
    );

    firebase
      .firestore()
      .collection('restaurants')
      .doc(id)
      .update({
        menu: [...newMenu],
      })
      .then(() => {
        firebase
          .storage()
          .ref(`${name}/${item.meal_item_image_name}`)
          .delete()
          .then(() => {
            console.log('\n\n\n', 'DELETED IMAGE');
          })
          .catch(() =>
            setError(
              'something went wrong, while trying to delete the item image'
            )
          );

        setLoading(false);
        resolve(true);
      })
      .catch((error) => {
        setLoading(false);
        setError('There was an Error Deleting the Item from the menu');
        reject(error);
      });
  });
};

export { deleteMenuItem };
