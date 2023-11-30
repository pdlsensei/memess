import React from "react";

const DownloadButton = ({ handleDownload }) => {
  return (
    <button onClick={handleDownload}>
      Download Meme
    </button>
  );
};

export default DownloadButton;
