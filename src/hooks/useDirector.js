import { useEffect, useState } from "react";
import axios from "axios";

export default function useDirector(movieId) {
  const [director, setDirector] = useState("Unknown");

  useEffect(() => {
    if (!movieId) {
      setDirector("Unknown");
      return;
    }

    async function fetchDirector() {
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
        const directorData = response.data.crew.find((person) => person.job === "Director");
        setDirector(directorData ? directorData.name : "Unknown");
      } catch (error) {
        console.error("Error fetching director:", error);
        setDirector("Unknown");
      }
    }

    fetchDirector();
  }, [movieId]);

  return director;
}
