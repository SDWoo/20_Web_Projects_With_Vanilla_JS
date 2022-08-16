export const saveLocalItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  const Item = JSON.parse(localStorage.getItem(key));
  return Item;
};
