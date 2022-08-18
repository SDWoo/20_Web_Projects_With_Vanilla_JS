const LIMIT = 5;
export const getData = async (page) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`
    );
    if (!res.ok) {
      throw new Error('서버 에러');
    }
    return await res.json();
  } catch (e) {
    throw new Error(`에러발생 ${e}`);
  }
};
