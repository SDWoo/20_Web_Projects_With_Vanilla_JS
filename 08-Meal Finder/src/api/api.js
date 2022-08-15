const ITEM_SEARCH_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const RANDOM_SEARCH_URL = `https://www.themealdb.com/api/json/v1/1/random.php`;

export const searchItemAPI = async (searchWord) => {
  try {
    const res = await fetch(`${ITEM_SEARCH_URL}${searchWord}`);
    if (!res.ok) {
      throw new Error('Server Error');
    }
    return res.json();
  } catch (e) {
    throw new Error(`Error! ${e}`);
  }
};

export const searchRandomAPI = async () => {
  try {
    const res = await fetch(`${RANDOM_SEARCH_URL}`);
    if (!res.ok) {
      throw new Error('Server Error');
    }
    return res.json();
  } catch (e) {
    throw new Error(`Error! ${e}`);
  }
};
