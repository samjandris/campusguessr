'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));

import '@/styles/guess.css';
import {
  IconSearch,
  IconVolumeDown,
  IconVolumeUp,
} from '@/components/ui/Icons';

import { Campus } from '@/lib/types';
import { filterCampus } from '@/lib/game';

export default function Guess({ params }: { params: { filter: string[] } }) {
  const [data, setData] = useState<Campus[]>([]);
  const [mapBounds, setMapBounds] = useState<[number, number][]>([]);
  const [campusToPlay, setCampusToPlay] = useState(0);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>(null);
  const [youtubePlayerMuted, setYoutubePlayerMuted] = useState(true);
  const [youtubePlayerVolume, setYoutubePlayerVolume] = useState(50);

  const [mapVisible, setMapVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [gameOverOpen, setGameOverOpen] = useState(false);

  const [selectedCampus, setSelectedCampus] = useState('');
  const [winStatus, setWinStatus] = useState<boolean | null>(null);

  function updateYoutubePlayerVolume(newVolume: number) {
    const clampedVolume = Math.min(Math.max(newVolume, 0), 100);
    youtubePlayer.setVolume(clampedVolume);
    setYoutubePlayerVolume(clampedVolume);
  }

  function checkWin() {
    setWinStatus(selectedCampus === data[campusToPlay].name);
    setGameOverOpen(true);
  }

  function newGame() {
    setVideoVisible(false);
    setSelectedCampus('');
    setWinStatus(null);

    setTimeout(() => {
      setCampusToPlay((prevToPlay) => {
        let toPlay = Math.floor(Math.random() * data.length);
        while (prevToPlay === toPlay) {
          toPlay = Math.floor(Math.random() * data.length);
        }

        return toPlay;
      });
    }, 1000);
  }

  const onVideoReady = (event: YouTubeEvent) => {
    setYoutubePlayer(event.target);
    event.target.setVolume(youtubePlayerVolume);
    youtubePlayerMuted ? event.target.mute() : event.target.unMute();
    event.target.playVideo();
  };

  useEffect(() => {
    if (params.filter.length !== 2) return;
    filterCampus(params.filter[0], params.filter[1]).then((resData) => {
      const newMapBounds: [number, number][] = [];
      Object.values(resData).forEach((point: any) => {
        newMapBounds.push([point.location.latitude, point.location.longitude]);
      });

      setData(resData);
      setMapBounds(newMapBounds);

      let toPlay = Math.floor(Math.random() * resData.length);
      console.log(toPlay);
      setCampusToPlay(toPlay);
    });
  }, [params.filter]);

  return (
    <div className="h-full">
      {data.length > 0 && (
        <div>
          <div
            className="flex justify-center items-center h-screen transition-all duration-1000"
            data-visible={!videoVisible}
          >
            <h1>The game is about to start</h1>
          </div>
          <div
            className="video-background w-full h-full"
            data-visible={videoVisible}
          >
            <YouTube
              key={campusToPlay}
              className="video"
              videoId={data[campusToPlay].video_id}
              opts={{
                width: 1280,
                height: 720,
                playerVars: {
                  autoplay: 1,
                  playlist: data[campusToPlay].video_id,
                  loop: 1,
                  controls: 0,
                  start: data[campusToPlay].video_start,
                },
              }}
              onReady={onVideoReady}
              onPlay={() => {
                setVideoVisible(true);
              }}
            />
          </div>

          <div
            className="absolute right-5 bottom-20 rounded-xl shadow-lg shadow-gray-700 w-[250px] h-[200px] opacity-50 hover:w-[600px] hover:h-[500px] hover:opacity-100 transition-all duration-300"
            data-visible={mapVisible}
          >
            <LeafletMap
              locations={data}
              bounds={mapBounds}
              onClick={(mapClick) => {
                setSelectedCampus(mapClick);
              }}
              onReady={() => {
                console.log('map visible: ', mapVisible);
                setMapVisible(true);
              }}
            />
          </div>

          <div className="flex gap-2 items-center absolute right-5 bottom-5">
            <Button
              variant="shadow"
              isDisabled={!selectedCampus}
              onPress={checkWin}
            >
              {selectedCampus ? 'Guess ' + selectedCampus : 'Place Your Guess'}
            </Button>
            <Button
              variant="shadow"
              isIconOnly
              onPress={() => {
                setSearchOpen(true);
              }}
            >
              <IconSearch />
            </Button>
            <Link href="/">
              <Button variant="shadow">Exit</Button>
            </Link>
          </div>

          <div
            className="flex gap-2 items-center absolute right-5 top-5 transition-all duration-300"
            data-visible={youtubePlayer !== null}
          >
            <Button
              variant="shadow"
              onPress={() => {
                youtubePlayerMuted
                  ? youtubePlayer.unMute()
                  : youtubePlayer.mute();
                setYoutubePlayerMuted(!youtubePlayerMuted);
              }}
            >
              {youtubePlayerMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button
              variant="shadow"
              isIconOnly
              onPress={() => {
                updateYoutubePlayerVolume(youtubePlayerVolume - 10);
              }}
            >
              <IconVolumeDown />
            </Button>
            <Button
              variant="shadow"
              isIconOnly
              onPress={() => {
                updateYoutubePlayerVolume(youtubePlayerVolume + 10);
              }}
            >
              <IconVolumeUp />
            </Button>
          </div>

          <Modal
            isOpen={searchOpen}
            onOpenChange={() => setSearchOpen(!searchOpen)}
          >
            <ModalContent>
              <ModalHeader>Search for a campus</ModalHeader>
              <ModalBody>
                <Autocomplete
                  placeholder="Type a campus to search..."
                  defaultSelectedKey={selectedCampus}
                  onSelectionChange={(value) => {
                    setSelectedCampus(value as string);
                    setSearchOpen(false);
                  }}
                >
                  {data.map((campus) => (
                    <AutocompleteItem key={campus.name} value={campus.name}>
                      {campus.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    setSearchOpen(false);
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={gameOverOpen}
            isDismissable={false}
            hideCloseButton
            backdrop="blur"
          >
            <ModalContent>
              <ModalHeader>
                {winStatus ? 'Congratulations!' : 'Sorry, try again!'}
              </ModalHeader>
              <ModalBody>
                {winStatus
                  ? 'You guessed it right!'
                  : 'You guessed it wrong! The correct answer was ' +
                    data[campusToPlay].name +
                    '.'}
              </ModalBody>
              <ModalFooter>
                <Link href="/">
                  <Button>Go Home</Button>
                </Link>
                <Button
                  onPress={() => {
                    setGameOverOpen(false);
                    newGame();
                  }}
                >
                  Play Again
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
}
