import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";
import SkeletonCard from "./SkeletonCard";

const DisplayHome = () => {
  const { songsData, albumsData, loadingSongs, loadingAlbums } =
    useContext(PlayerContext);

  return (
    <>
      <Navbar />

      <div className="mb-10 px-4 md:px-8">
        <h1 className="my-5 font-bold text-2xl text-white">Featured Charts</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {loadingAlbums
            ? Array(8)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : albumsData.map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                  className="border border-gray-700 bg-[#181818] hover:bg-[#282828] rounded-lg h-[300px] overflow-hidden transition-all duration-300 cursor-pointer"
                />
              ))}
        </div>
      </div>

      <div className="mb-10 px-4 md:px-8">
        <h1 className="my-5 font-bold text-2xl text-white">
          Today's Biggest Hits
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {loadingSongs
            ? Array(10)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : songsData.map((item, index) => (
                <SongItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                  className="border border-gray-700 bg-[#181818] hover:bg-[#282828] rounded-lg h-[300px] overflow-hidden transition-all duration-300 cursor-pointer"
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
