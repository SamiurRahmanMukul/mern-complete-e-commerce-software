import axios from "axios";
import { useEffect, useState } from "react";
import jwtEncodeUrl from "../utils/helperJwtEncoder";

const useFetchApiData = (url, categoryReload) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await jwtEncodeUrl(url);

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponse(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, categoryReload]);

  return { loading, response, error };
};

export default useFetchApiData;
