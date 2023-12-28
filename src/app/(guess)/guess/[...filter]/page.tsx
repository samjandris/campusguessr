'use client';

import { useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';
const LeafletMap = dynamic(() => import('@/components/LeafletMap'));

import { Volume1, Volume2 } from 'lucide-react';
import '@/styles/guess.css';

import { Campus } from '@/lib/types';
import { filterCampus } from '@/lib/game';

export default function Guess({ params }: { params: { filter: string[] } }) {
  const [data, setData] = useState<Campus[]>([]);
  const [mapBounds, setMapBounds] = useState<[number, number][]>([]);
  const [campusToPlay, setCampusToPlay] = useState(0);

  const [youtubePlayer, setYoutubePlayer] = useState<YouTubePlayer>();
  const [youtubePlayerMuted, setYoutubePlayerMuted] = useState<boolean>(true);
  const [youtubePlayerVolume, updateYoutubePlayerVolume] = useReducer(
    (_prevVolume: number, newVolume: number) => {
      if (newVolume < 0) {
        newVolume = 0;
      } else if (newVolume > 100) {
        newVolume = 100;
      }

      youtubePlayer.setVolume(newVolume);
      return newVolume;
    },
    50
  );

  const [mapVisible, setMapVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  const [selectedCampus, setSelectedCampus] = useState('');

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
            <h1>Starting Game</h1>
          </div>
          <div
            className="video-background w-full h-full"
            data-visible={videoVisible}
          >
            <YouTube
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
            className="absolute right-5 bottom-5 rounded-xl shadow-lg shadow-gray-700 w-[250px] h-[200px] opacity-50 hover:w-[600px] hover:h-[500px] hover:opacity-100 transition-all duration-300"
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

          {selectedCampus && (
            <Button
              variant="outline"
              size="sm"
              className="absolute left-5 bottom-5"
            >
              Guess {selectedCampus}
            </Button>
          )}

          <div className="flex gap-2 items-center absolute right-5 top-5">
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
        </div>
      )}
    </div>
  );
}
