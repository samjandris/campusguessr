'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));

import { Search, Volume1, Volume2 } from 'lucide-react';
import '@/styles/guess.css';

import { Campus } from '@/lib/types';
import { filterCampus } from '@/lib/game';

export default function Guess({ params }: { params: { filter: string[] } }) {
  const router = useRouter();
  const [data, setData] = useState<Campus[]>([]);
  const [mapBounds, setMapBounds] = useState<[number, number][]>([]);
  const [campusToPlay, setCampusToPlay] = useState(0);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>(null);
  const [youtubePlayerMuted, setYoutubePlayerMuted] = useState(true);
  const [youtubePlayerVolume, setYoutubePlayerVolume] = useState(50);

  const [mapVisible, setMapVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [selectedCampus, setSelectedCampus] = useState('');
  const [winStatus, setWinStatus] = useState<boolean | null>(null);

  function updateYoutubePlayerVolume(newVolume: number) {
    const clampedVolume = Math.min(Math.max(newVolume, 0), 100);
    youtubePlayer.setVolume(clampedVolume);
    setYoutubePlayerVolume(clampedVolume);
  }

  function checkWin() {
    setWinStatus(selectedCampus === data[campusToPlay].name);
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
            className="absolute right-5 bottom-16 rounded-xl shadow-lg shadow-gray-700 w-[250px] h-[200px] opacity-50 hover:w-[600px] hover:h-[500px] hover:opacity-100 transition-all duration-300"
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
              variant="outline"
              size="sm"
              disabled={!selectedCampus}
              onClick={checkWin}
            >
              {selectedCampus ? 'Guess ' + selectedCampus : 'Place Your Guess'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchOpen(true);
              }}
            >
              <Search />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Exit</Link>
            </Button>
          </div>

          <div
            className="flex gap-2 items-center absolute right-5 top-5 transition-all duration-300"
            data-visible={youtubePlayer !== null}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                youtubePlayerMuted
                  ? youtubePlayer.unMute()
                  : youtubePlayer.mute();
                setYoutubePlayerMuted(!youtubePlayerMuted);
              }}
            >
              {youtubePlayerMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                updateYoutubePlayerVolume(youtubePlayerVolume - 10);
              }}
            >
              <Volume1 />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                updateYoutubePlayerVolume(youtubePlayerVolume + 10);
              }}
            >
              <Volume2 />
            </Button>
          </div>

          <AlertDialog open={winStatus !== null}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {winStatus ? 'Congratulations!' : 'Sorry, try again!'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {winStatus
                    ? 'You guessed it right!'
                    : 'You guessed it wrong! The correct answer was ' +
                      data[campusToPlay].name +
                      '.'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  Go Home
                </AlertDialogCancel>
                <AlertDialogAction onClick={newGame}>
                  Play Again
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
            <CommandInput placeholder="Type a campus to search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {data.map((campus) => (
                <CommandItem
                  key={campus.name}
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedCampus(campus.name);
                    setSearchOpen(false);
                  }}
                >
                  <span>{campus.name}</span>
                </CommandItem>
              ))}
            </CommandList>
          </CommandDialog>
        </div>
      )}
    </div>
  );
}
