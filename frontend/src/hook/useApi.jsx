import { useState } from 'react';
import axios from 'axios';

const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, method = 'get', body = null, headers = {}) => {
    setIsLoading(true);

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });

      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      setData([]); // Asegurarse de que data es un array en caso de error
    }

    setIsLoading(false);
  };

  return { data, error, isLoading, fetchData, setData };
};

export default useApi;
