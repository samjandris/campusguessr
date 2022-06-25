import React from 'react';
import './App.css';
// import ReactPlayer from 'react-player';

function App() {
  // document.getElementById('videoYT').click();
  return (
    <div>
      <iframe
        className="yt-video"
        id="videoYT"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Qsz5m1nl4jM?controls=0&amp;start=1219&autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/* <ReactPlayer
        playing
        width="100%"
        height="100%"
        scale={1.1}
        muted
        className="react-player"
        url="https://youtu.be/lw3pxW8O93o"
        config={{
          youtube: {
            playerVars: {
              disablekb: 1,
            },
          },
        }}
      /> */}
    </div>
  );
}

export default App;
