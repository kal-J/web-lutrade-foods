const setUser = (value) => ({
  type: 'SETUSER',
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

export { setUser, setLoading, setError };
