import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  IconButton,
  Stack,
  Slider,
  Backdrop,
  Grid,
  Typography,
} from '@mui/material';
import {
  VolumeUp,
  VolumeDown,
  VolumeOff,
  AccessTimeFilled,
} from '@mui/icons-material';
import YouTube from 'react-youtube';
import { isMobile } from 'react-device-detect';
import './Guess.css';

function App() {
  const [player, setPlayer] = useState(null);
  const [mobileInteract, setMobileInteract] = useState(false);
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
      setMute(true);
      player.mute();
    }
  }

  const handleVolumeClick = () => {
    if (volumeVisible || isMobile) {
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
    if (isMobile) {
      setMute(true);
      event.target.mute();
    }
    event.target.playVideo();
  };

  function updateMobileInteract() {
    setMobileInteract(true);
    setMute(false);
    player.unMute();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="video-background" style={{ display: 'block' }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isMobile && !mobileInteract}
          onClick={() => updateMobileInteract()}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              <Typography>Tap to unmute</Typography>
            </Grid>
          </Grid>
        </Backdrop>
        <div className="video-foreground">
          <YouTube
            videoId="vLSc7iliXlA"
            opts={{
              width: 1280,
              height: 720,
              playerVars: {
                autoplay: 1,
                loop: 1,
                start: 10,
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
              onMouseEnter={() => !isMobile && setVolumeVisible(true)}
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
              <IconButton
                id="volume-button"
                aria-label="mute"
                onClick={() => handleVolumeClick()}
              >
                {volume >= 50 && !muted && <VolumeUp color="primary" />}
                {volume < 50 && volume > 0 && !muted && (
                  <VolumeDown color="primary" />
                )}
                {(volume === 0 || muted) && <VolumeOff color="primary" />}
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
