import {useState, useEffect, useCallback} from 'react';

const useFetch = <T extends unknown>(
  url: string,
  options?: {[key: string]: string},
) => {
  const [data, setData] = useState<T>();

  const fetchData = useCallback(async () => {
    await fetch(url, options)
      .then(response => response.json())
      .then(value => setData(value));
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, fetchData};
};

export default useFetch;
