const setUser = (value) => ({
  type: 'SETUSER',
  payload: value,
});

const setRestaurant = (value) => ({
  type: 'SETRESTAURANT',
  payload: value,
});

const setLoading = (value) => ({
  type: 'SETLOADING',
  payload: value,
});

const setError = (value) => ({
  type: 'SETERROR',
  payload: value,
});

const addMealItem = (value) => ({
  type: 'ADDMEALITEM',
  payload: value,
});

export { setUser, setLoading, setError, addMealItem, setRestaurant };
