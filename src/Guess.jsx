import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, IconButton, Stack, Slider } from '@mui/material';
import {
  VolumeUp,
  VolumeDown,
  VolumeMute,
  AccessTimeFilled,
} from '@mui/icons-material';
import YouTube from 'react-youtube';
import './Guess.css';

// eslint-disable-next-line no-lone-blocks
{
  /* <iframe
  id="videoYT"
  width="560"
  height="315"
  src="https://www.youtube.com/embed/JWjCCP79MnI?autoplay=1&amp;controls=0&amp;loop=1&amp;start=2&amp;mute=1"
  title="Guess the Campus"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/> */
}

function App() {
  const [player, setPlayer] = useState(null);
  const [volume, setVolume] = useState(50);
  const [muted, setMute] = useState(false);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playbackRateVisible, setPlaybackRateVisible] = useState(false);

  function mute() {
    if (player.isMuted()) {
      setMute(false);
      player.unMute();
    } else {
      player.mute();
      setMute(true);
    }
  }

  const handleVolumeClick = () => {
    if (volumeVisible) {
      mute();
    } else {
      setVolumeVisible(true);
      setTimeout(() => {
        setVolumeVisible(false);
      }, 5000);
    }
  };

  const handleVolumeChange = (event) => {
    player.setVolume(event.target.value);
    setVolume(event.target.value);
  };

  const handlePlaybackRateChange = (event) => {
    player.setPlaybackRate(event.target.value);
    setPlaybackRate(event.target.value);
  };

  const handlePlaybackRateClick = () => {
    setPlaybackRateVisible(true);
    setTimeout(() => {
      setPlaybackRateVisible(false);
    }, 5000);
  };

  const onVideoReady = (event) => {
    setPlayer(event.target);
    event.target.setVolume(50);
    setVolume(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="video-background" style={{ display: 'block' }}>
        <div className="video-foreground">
          <YouTube
            videoId="JWjCCP79MnI"
            opts={{
              width: 1280,
              height: 720,
              playerVars: {
                autoplay: 1,
                loop: 1,
                mute: 1,
              },
            }}
            onReady={onVideoReady}
          />
        </div>
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            right: 15,
            bottom: 15,
          }}
        >
          Guess
        </Button>
        {player && (
          <>
            <Stack
              spacing={0.5}
              direction="row"
              alignItems="center"
              onMouseEnter={() => setVolumeVisible(true)}
              onMouseLeave={() => setVolumeVisible(false)}
              sx={{ position: 'absolute', right: 3, bottom: 50 }}
            >
              {volumeVisible && (
                <Slider
                  aria-label="Volume"
                  value={volume}
                  onChange={handleVolumeChange}
                  sx={{ width: 125 }}
                />
              )}
              <IconButton aria-label="mute" onClick={() => handleVolumeClick()}>
                {volume >= 50 && !muted && <VolumeUp color="primary" />}
                {volume < 50 && volume > 0 && !muted && (
                  <VolumeDown color="primary" />
                )}
                {(volume === 0 || muted) && <VolumeMute color="primary" />}
              </IconButton>
            </Stack>
            <Stack
              spacing={2}
              direction="column"
              onMouseEnter={() => setPlaybackRateVisible(true)}
              onMouseLeave={() => setPlaybackRateVisible(false)}
              sx={{ position: 'absolute', right: 3, bottom: 80 }}
            >
              {playbackRateVisible && (
                <Slider
                  aria-label="Playback Rate"
                  orientation="vertical"
                  value={playbackRate}
                  min={0.25}
                  max={2}
                  step={0.25}
                  marks={[
                    { value: 0.25, label: '0.25x' },
                    { value: 0.5, label: '0.5x' },
                    { value: 0.75, label: '0.75x' },
                    { value: 1, label: '1x' },
                    { value: 1.25, label: '1.25x' },
                    { value: 1.5, label: '1.5x' },
                    { value: 1.75, label: '1.75x' },
                    { value: 2, label: '2x' },
                  ]}
                  onChange={handlePlaybackRateChange}
                  sx={{ position: 'relative', height: 150, bottom: 20 }}
                />
              )}
              {!playbackRateVisible && (
                <IconButton
                  aria-label="Playback Rate Icon"
                  onClick={() => handlePlaybackRateClick()}
                >
                  <AccessTimeFilled color="primary" />
                </IconButton>
              )}
            </Stack>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default App;
