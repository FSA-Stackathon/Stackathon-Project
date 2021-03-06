import React, { useState, useEffect, useRef } from 'react';
import Main from './Main';
import ReactHowler from 'react-howler';

// Some utility functions
const mod = (num, m) => ((num % m) + m) % m;

const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map((song) => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};

// The stateful Audio component
const Audio = () => {
  const [currentSong, setCurrentSong] = useState({});
  const [currentSongList, setCurrentSongList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  let howlerRef = useRef(null);

  function getHowler() {
    return howlerRef.howler;
  }
  function getDuration() {
    //returns the total length of the song (seconds)
    howlerRef.howler.duration;
  }
  function getSeek() {
    //returns where we pause the song
    const getSeek = howlerRef.howler.seek();
  }

  function setSeek() {
    //sets the position within the song (in seconds)
    const seek = howlerRef.seek(0.5);
  }

  function play() {
    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function load(currentSong, currentSongList) {
    setCurrentSong(currentSong);
    setCurrentSongList(currentSongList);
  }

  function startSong(song, list) {
    pause();
    load(song, list);
    play();
  }

  function toggleOne(selectedSong, selectedSongList) {
    if (selectedSong.id !== currentSong.id) {
      startSong(selectedSong, selectedSongList);
    } else {
      toggle();
    }
  }

  function toggle() {
    if (isPlaying) pause();
    else play();
  }

  function mute() {
    setIsMuted(!isMuted);
  }

  function next() {
    startSong(...skip(1, { currentSong, currentSongList }));
  }

  function prev() {
    startSong(...skip(-1, { currentSong, currentSongList }));
  }

  return (
    <div>
      <ReactHowler
        src={currentSong.audioUrl || ['']}
        playing={isPlaying}
        mute={isMuted}
        ref={(ref) => (howlerRef = ref)}
        html5={true}
        preload={true}
      />
      <Main
        currentSong={currentSong}
        isPlaying={isPlaying}
        isMuted={isMuted}
        mute={mute}
        prev={prev}
        next={next}
        toggleOne={toggleOne}
        toggle={toggle}
      />
    </div>
  );
};

export default Audio;
