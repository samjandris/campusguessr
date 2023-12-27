'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Button,
  IconButton,
  Stack,
  Slider,
  Typography,
  Modal,
  Box,
  Backdrop,
  Grid,
} from '@mui/material';
import {
  VolumeUp,
  VolumeDown,
  VolumeOff,
  AccessTimeFilled,
} from '@mui/icons-material';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { isFirefox, isMobile } from 'react-device-detect';
import './Guess.css';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));
import { getCampuses } from '@/lib/campus';

const toPlayRandom = Math.random();

export default function GuessPage() {
  const [data, setData] = useState<
    {
      name: string;
      video_id: string;
      video_start: number;
      location: { latitude: number; longitude: number };
    }[]
  >([]);
  const [render, setRender] = useState<boolean>(true);
  let searchParams = useSearchParams();

  const [toPlay, setToPlay] = useState<number>(
    Math.floor(toPlayRandom * data.length)
  );
  const bounds: [number, number][] = [];
  Object.values(data).forEach((point) => {
    bounds.push([point.location.latitude, point.location.longitude]);
  });

  const [player, setPlayer] = useState<YouTubePlayer>();
  const [volume, setVolume] = useState<number>(50);
  const [muted, setMute] = useState<boolean>(false);
  const [volumeVisible, setVolumeVisible] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [playbackRateVisible, setPlaybackRateVisible] =
    useState<boolean>(false);
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [selectedCampus, setSelectedCampus] = useState<string>();
  const [win, setWin] = useState<boolean>();
  const [finished, setFinished] = useState<boolean>(false);

  const [mobileInteract, setMobileInteract] = useState<boolean>(false);

  function mute() {
    if (player) {
      if (player.isMuted()) {
        setMute(false);
        player.unMute();
      } else {
        setMute(true);
        player.mute();
      }
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

  const handleVolumeChange = (_event: Event, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;

    player.setVolume(newVolume);
    setVolume(newVolume);
  };

  const handlePlaybackRateChange = (
    _event: Event,
    value: number | number[]
  ) => {
    const newPlaybackRate = Array.isArray(value) ? value[0] : value;

    player.setPlaybackRate(newPlaybackRate);
    setPlaybackRate(newPlaybackRate);
  };

  const handlePlaybackRateClick = () => {
    setPlaybackRateVisible(true);
    setTimeout(() => {
      setPlaybackRateVisible(false);
    }, 5000);
  };

  const onVideoReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    event.target.setVolume(50);
    setVolume(50);
    if (isMobile || isFirefox) {
      setMute(true);
      event.target.mute();
    }
    event.target.playVideo();
  };

  useEffect(() => {
    // fetch(
    //   '/api/campus?filterId=' +
    //     searchParams.get('filterId') +
    //     '&filterValue=' +
    //     searchParams.get('filterValue')
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setData(res.campuses);
    //   });

    getCampuses(
      searchParams.get('filterId'),
      searchParams.get('filterValue')
    ).then((res) => {
      setData(res);
    });
  }, []);

  return data.length > 0 ? (
    // <div className="video-background" style={{ display: 'block' }} key={render}>
    <div className="video-background" style={{ display: 'block' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isMobile && !mobileInteract}
        onClick={() => {
          setMobileInteract(true);
          setMute(false);
          player.unMute();
        }}
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
      <div
        onClick={() => player.playVideo()}
        aria-hidden="true"
        style={{ width: '100%', height: '100%' }}
      >
        <YouTube
          className="video-foreground"
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
        component={Link}
        href="/"
        sx={{
          position: 'absolute',
          right: 125,
          bottom: 15,
        }}
      >
        Back to Main Menu
      </Button>
      <Button
        variant="contained"
        onClick={() => setMapOpen(true)}
        sx={{
          position: 'absolute',
          right: 15,
          bottom: 15,
        }}
      >
        {finished ? 'Open Map' : 'Guess'}
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
          <LeafletMap
            locations={data}
            bounds={bounds}
            onClick={setSelectedCampus}
          />
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
                sx={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  top: 5,
                  zIndex: 99999,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {win
                  ? 'You won!'
                  : `Incorrect. The correct answer was ${data[toPlay].name}`}
              </Typography>
              <Button
                variant="contained"
                color="error"
                component={Link}
                href="/"
                sx={{
                  left: '1%',
                  bottom: 60,
                  width: '48%',
                  zIndex: 99999,
                }}
              >
                Choose Map
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
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
                  setSelectedCampus('');
                  setWin(false);
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
            sx={{
              position: 'absolute',
              right: 3,
              bottom: 80,
            }}
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
                  { value: 1, label: '1.0x' },
                  { value: 1.25, label: '1.25x' },
                  { value: 1.5, label: '1.5x' },
                  { value: 1.75, label: '1.75x' },
                  { value: 2, label: '2.0x' },
                ]}
                onChange={handlePlaybackRateChange}
                sx={{
                  position: 'relative',
                  right: 5,
                  height: 150,
                  bottom: 20,
                  '& .MuiSlider-markLabel': {
                    color: 'white',
                    left: '-115%',
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
  ) : (
    <div />
  );
}
