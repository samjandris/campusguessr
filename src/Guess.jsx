/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  IconButton,
  Stack,
  Slider,
  Typography,
  Modal,
  Box,
} from '@mui/material';
import {
  VolumeUp,
  VolumeDown,
  VolumeOff,
  AccessTimeFilled,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { isMobile } from 'react-device-detect';
import './Guess.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

const toPlayRandom = Math.random();

function Guess(props) {
  const { location } = props;

  const [render, setRender] = useState(true);

  const { data } = location.state;
  const [toPlay, setToPlay] = useState(Math.floor(toPlayRandom * data.length));
  const bounds = [];
  Object.values(data).forEach((point) => {
    bounds.push([point.location.latitude, point.location.longitude]);
  });

  const [player, setPlayer] = useState(null);
  const [volume, setVolume] = useState(50);
  const [muted, setMute] = useState(false);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playbackRateVisible, setPlaybackRateVisible] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState();
  const [win, setWin] = useState();
  const [finished, setFinished] = useState(false);

  // const [mobileInteract, setMobileInteract] = useState(false);

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

  // function updateMobileInteract() {
  //   setMobileInteract(true);
  //   setMute(false);
  //   player.unMute();
  // }

  function MapClickComponent() {
    useMapEvents({
      click: () => {
        setSelectedCampus();
      },
    });
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      key={render}
    >
      <div
        className="video-background"
        style={{ display: 'block' }}
        key={render}
      >
        {/* <Backdrop
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
        </Backdrop> */}
        <div className="video-foreground">
          <YouTube
            videoId={data[toPlay].video_id}
            opts={{
              width: 1280,
              height: 720,
              playerVars: {
                autoplay: 1,
                playlist: data[toPlay].video_id,
                loop: 1,
                controls: 0,
                start: data[toPlay].video_start,
              },
            }}
            onReady={onVideoReady}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => setMapOpen(true)}
          sx={{
            position: 'absolute',
            right: 15,
            bottom: 15,
          }}
        >
          Guess
        </Button>
        <Modal open={mapOpen} onClose={() => setMapOpen(false)} keepMounted>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 1,
            }}
          >
            <MapContainer
              bounds={bounds}
              scrollWheelZoom
              onClick={() => setSelectedCampus()}
              style={{ height: '100%', width: '100%', zIndex: 99 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {data.map((uni) => (
                <div key={uni.name}>
                  <Marker
                    position={[uni.location.latitude, uni.location.longitude]}
                    eventHandlers={{
                      click: () => {
                        setSelectedCampus(uni.name);
                      },
                    }}
                  >
                    <Tooltip
                      direction="right"
                      offset={[0, 0]}
                      opacity={0.65}
                      permanent
                    >
                      {uni.name}
                    </Tooltip>
                  </Marker>
                  <MapClickComponent />
                </div>
              ))}
            </MapContainer>
            {selectedCampus && !finished && (
              <Button
                variant="contained"
                onClick={() => {
                  if (selectedCampus === data[toPlay].name) {
                    setFinished(true);
                    setWin(true);
                  } else {
                    setFinished(true);
                    setWin(false);
                  }
                }}
                sx={{
                  left: '1%',
                  bottom: 60,
                  width: '98%',
                  zIndex: 99999,
                }}
              >
                Guess {selectedCampus}
              </Button>
            )}

            {finished && (
              <>
                <Typography
                  variant="h6"
                  align="center"
                  backgroundColor="rgba(255, 255, 255, 0.8)"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    top: 5,
                    zIndex: 99999,
                  }}
                >
                  {win
                    ? 'You won!'
                    : `Incorrect. The correct answer was ${data[toPlay].name}`}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/"
                  sx={{
                    left: '1%',
                    bottom: 60,
                    width: '48%',
                    zIndex: 99999,
                  }}
                >
                  Exit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                      const rand = Math.floor(Math.random() * data.length);
                      if (rand !== toPlay) {
                        setToPlay(rand);
                        break;
                      }
                    }
                    setPlayer(null);
                    setVolume(50);
                    setMute(false);
                    setVolumeVisible(false);
                    setPlaybackRate(1);
                    setPlaybackRateVisible(false);
                    setMapOpen(false);
                    setSelectedCampus();
                    setWin();
                    setFinished(false);
                    setRender(!render);
                  }}
                  sx={{
                    left: '3%',
                    bottom: 60,
                    width: '48%',
                    zIndex: 99999,
                  }}
                >
                  Play Again
                </Button>
              </>
            )}
          </Box>
        </Modal>
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
                  sx={{
                    position: 'relative',
                    height: 150,
                    bottom: 20,
                    '& .MuiSlider-markLabel': {
                      color: 'white',
                    },
                  }}
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

Guess.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Guess;
