import { useEffect, useState } from "react";
import axios from "axios";

export default function useCast(movieId) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) {
      setCast([]);
      return;
    }

    async function fetchCast() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            },
          }
        );

        const topCast = response.data.cast.slice(0, 3).map((c) => c.name);
        setCast(topCast);
      } catch (error) {
        console.error("Error fetching cast:", error);
        setCast([]);
      }
    }

    fetchCast();
  }, [movieId]);

  return cast;
}
