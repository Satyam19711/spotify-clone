import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "https://spotify-backend-2-sl5d.onrender.com";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    const song = songsData.find((item) => item._id === id);
    if (song) {
      setTrack(song);
      setTimeout(() => play(), 300);
    }
  };

  const previous = () => {
    if (!track || songsData.length === 0) return;
    const albumSongs = songsData.filter((s) => s.album === track.album);
    const index = albumSongs.findIndex((s) => s._id === track._id);

    if (index > 0) {
      setTrack(albumSongs[index - 1]);
    } else {
      setTrack(albumSongs[albumSongs.length - 1]);
    }
    setTimeout(() => play(), 300);
  };

  const next = () => {
    if (!track || songsData.length === 0) return;
    const albumSongs = songsData.filter((s) => s.album === track.album);
    const index = albumSongs.findIndex((s) => s._id === track._id);

    if (isRepeat) {
      audioRef.current.currentTime = 0;
      play();
      return;
    }

    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * albumSongs.length);
      while (randomIndex === index && albumSongs.length > 1) {
        randomIndex = Math.floor(Math.random() * albumSongs.length);
      }
      setTrack(albumSongs[randomIndex]);
      setTimeout(() => play(), 300);
      return;
    }

    if (index < albumSongs.length - 1) {
      setTrack(albumSongs[index + 1]);
    } else {
      setTrack(albumSongs[0]);
    }

    setTimeout(() => play(), 300);
  };

  const shufflePlay = () => {
    setIsShuffle((prev) => {
      const newState = !prev;
      if (newState) setIsRepeat(false);
      return newState;
    });
  };

  const repeat = () => {
    setIsRepeat((prev) => {
      const newState = !prev;
      if (newState) setIsShuffle(false);
      return newState;
    });
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    const width = seekBg.current.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);
      setSongsData(res.data.songs);
      setTrack(res.data.songs[0]);
    } catch (error) {
      console.log("Song Fetch Error:", error.message);
    }
  };

  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      setAlbumsData(res.data.album || []);
    } catch (error) {
      console.log("Album Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (!seekBar.current || !audioRef.current.duration) return;

      seekBar.current.style.width =
        Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        ) + "%";

      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
    };

    const handleSongEnd = () => {
      if (isRepeat) {
        audioRef.current.currentTime = 0;
        play();
      } else {
        next();
      }
    };

    audioRef.current.ontimeupdate = handleTimeUpdate;
    audioRef.current.onended = handleSongEnd;
  }, [track, isRepeat, isShuffle]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    time,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    shufflePlay,
    repeat,
    songsData,
    albumsData,
    isShuffle,
    isRepeat,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
