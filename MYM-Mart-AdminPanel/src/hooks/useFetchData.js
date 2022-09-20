import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchData = (url, fetchAgain) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      try {
        const res = axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setResponse(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
  }, [url, fetchAgain]);

  return [loading, error, response];
};

export default useFetchData;
