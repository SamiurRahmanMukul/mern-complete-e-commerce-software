import axios from "axios";
import { useEffect, useState } from "react";
import jwtEncodeUrl from "../utils/helperJwtEncoder";

const useFetchApiData = (url, categoryReload) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await jwtEncodeUrl(url);

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, categoryReload]);

  return { loading, data, error };
};

export default useFetchApiData;
