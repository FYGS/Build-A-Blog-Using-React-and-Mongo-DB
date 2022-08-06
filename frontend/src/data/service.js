export const fetchData = async (url) => {
  const result = await fetch(url, {
      method: 'get',
  });
  return await result.json();
};

export const postData = async (url, configs) => {
  const result = await fetch(url, {
    method: 'post',
    ...configs,
});
return await result.json();
};

export const configs = {
  API_BASE_URL: '/api',
};
