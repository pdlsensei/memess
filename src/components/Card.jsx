import React from "react";
import DownloadButton from "./DownloadButton"; // Adjust the path based on your project structure

const Card = ({ imageUrl, title }) => {
  const handleDownload = () => {
    // You can implement the download logic here
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "wholesome-meme.jpg";
    link.click();
  };

  return (
    <div className="card flex flex-col">
      <img className="img" src={imageUrl} alt={title} />
      <p>{title}</p>
      <DownloadButton handleDownload={handleDownload} />
    </div>
  );
};

export default Card;
