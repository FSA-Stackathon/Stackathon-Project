import React, { useState, useEffect, useRef } from 'react';
import Main from './Main';
import ReactHowler from 'react-howler';

// creates the Audio element
// While the Audio element is part of HTML5, it doesn't `visually` show up anywhere in the DOM.
// However, we interact with it the same way we would a DOM node. That's pretty cool!

// const AUDIO = document.createElement('audio');

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

  const howlerRef = useRef(null);

  const myLoadFunc = () => {
    if (howlerRef.current) {
      console.log('howler', howlerRef.current);
      howlerRef.current.load();
    }
  };

  function play() {
    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function load(currentSong, currentSongList) {
    // AUDIO.src = currentSong.audioUrl;
    // AUDIO.load();

    console.log('player', myLoadFunc());
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
    startSong(...skip(1, this.state));
  }

  function prev() {
    startSong(...skip(-1, this.state));
  }

  return (
    <div>
      <ReactHowler
        src={currentSong.audioUrl || ['']}
        playing={isPlaying}
        mute={isMuted}
        ref={howlerRef}
        html5={true}
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
