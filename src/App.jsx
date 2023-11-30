import React, { useState, useEffect } from "react";
import Card from "./components/Card"; // Adjust the path based on your project structure

const MemesComponent = () => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const memesPerPage = 50; // Adjust the number of memes per page as needed
  const totalMemesToFetch = 300;

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch(`https://meme-api.com/gimme/wholesomememes/${totalMemesToFetch}`);
        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.memes && data.memes.length > 0) {
          setMemes(data.memes);
        } else {
          console.log("No memes found in the initial API response");
        }
      } catch (error) {
        console.error("Error fetching initial memes:", error);
      }
    };

    fetchMemes();
  }, [totalMemesToFetch]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has scrolled to the bottom
      if (memes.length < totalMemesToFetch) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const fetchMoreMemes = async () => {
      try {
        const response = await fetch(`https://meme-api.com/gimme/wholesomememes/${memesPerPage}`);
        const data = await response.json();
        console.log("API Response (more memes):", data);

        if (data && data.memes && data.memes.length > 0) {
          setMemes((prevMemes) => [...prevMemes, ...data.memes]);
        } else {
          console.log("No more memes found in the API response");
        }
      } catch (error) {
        console.error("Error fetching more memes:", error);
      }
    };

    if (page > 1) {
      fetchMoreMemes();
    }
  }, [page, memesPerPage]);

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="memes-container">
    <h1>Wholesome Memes</h1>
    <div className="grid-container">
      {memes.map((meme, index) => (
        <Card key={index} imageUrl={meme.url} title={meme.title} />
      ))}
    </div>
  </div>
  );
};

export default MemesComponent;
