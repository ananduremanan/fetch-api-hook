import axios from "axios";
import { useState, useEffect } from "react";

async function fetcher(
  url?: string,
  method = "get",
  dataObject?: object,
  headerObject?: object
) {
  try {
    const response = await axios({
      url,
      method: method.toLowerCase(),
      data: dataObject,
      headers: headerObject,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function useDataFetching(url: string, method = "get") {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetcher(url, method);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [url, method]);

  return data;
}
