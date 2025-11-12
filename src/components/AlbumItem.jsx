import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id, className }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className={`${className} flex flex-col items-center justify-start p-4`}
    >
      <img
        className="w-full h-[160px] object-cover rounded-md"
        src={image}
        alt={name}
      />

      <p className="font-semibold text-white text-center mt-2 mb-1 truncate w-full">
        {name}
      </p>

      <p
        className="text-gray-400 text-sm text-center leading-snug overflow-hidden text-ellipsis line-clamp-3"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {desc}
      </p>
    </div>
  );
};

export default AlbumItem;
