import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    next,
    previous,
    seekSong,
    shufflePlay,
    isShuffle,
    repeat,
    isRepeat,
  } = useContext(PlayerContext);

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p className="relative group cursor-pointer text-gray-300 text-sm">
            {track.desc.slice(0, 20)}...
            <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-[#2c2c2c] text-white text-xs p-2 rounded-md w-64 shadow-lg z-10">
              {track.desc}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            onClick={shufflePlay}
            className={`w-4 cursor-pointer ${
              isShuffle ? "opacity-100 text-green-500" : "opacity-50"
            }`}
            src={assets.shuffle_icon}
            alt="shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="previous"
          />

          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="play"
            />
          )}

          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="next"
          />
          <img
            onClick={repeat}
            className={`w-4 cursor-pointer ${
              isRepeat ? "opacity-100 text-green-500" : "opacity-50"
            }`}
            src={assets.loop_icon}
            alt="repeat"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Player;
