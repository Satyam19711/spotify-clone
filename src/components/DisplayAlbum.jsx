import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  const getDaysAgo = (dateString) => {
    const addedDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - addedDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    if (albumsData && albumsData.length > 0) {
      const found = albumsData.find((item) => item._id === id);
      setAlbumData(found);
    }
  }, [albumsData, id]);

  if (!albumData) {
    return (
      <>
        <Navbar />
        <p className="text-white mt-10">Loading album...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-10 px-4">
        <img
          className="w-48 h-48 object-cover rounded-md shadow-md"
          src={albumData.image}
          alt={albumData.name}
        />
        <div className="flex flex-col text-white">
          <p className="uppercase text-sm text-gray-400 tracking-wide">
            Playlist
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-3 mt-1">
            {albumData.name}
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl">
            {albumData.desc}
          </p>
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-[0.4fr_2fr_1fr_0.6fr] mt-12 mb-4 px-4 text-gray-400 text-xs uppercase tracking-wide">
        <p>#</p>
        <p>Title</p>
        <p>Date Added</p>
        <div className="flex justify-center">
          <img className="w-4 opacity-80" src={assets.clock_icon} alt="clock" />
        </div>
      </div>

      <hr className="border-gray-700 mb-3 mx-4" />

      <div className="flex flex-col">
        {songsData
          .filter((item) => item.album === albumData.name)
          .map((item, index) => (
            <div
              key={index}
              onClick={() => playWithId(item._id)}
              className="grid grid-cols-[0.4fr_2fr_1fr_0.6fr] sm:grid-cols-[0.4fr_2fr_1fr_0.6fr] 
              items-center px-4 py-2 sm:py-3 text-gray-300 hover:bg-[#ffffff18] cursor-pointer transition-all duration-150"
            >
              <p className="text-sm text-gray-500">{index + 1}</p>

              <div className="flex items-center space-x-4 truncate">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-[#1f1f1f] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-white text-sm md:text-base font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {albumData.name}
                  </p>
                </div>
              </div>

              <p className="hidden sm:block text-sm text-gray-400">
                {item.createdAt ? getDaysAgo(item.createdAt) : "Unknown"}
              </p>

              <p className="text-sm text-center text-gray-400">
                {item.duration}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default DisplayAlbum;
