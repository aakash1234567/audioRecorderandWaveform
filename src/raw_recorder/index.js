import React, { useState } from "react";
import AudioAnalyser from "./AudioAnalyser";
import { ReactAudioRecorder } from "./AudioRecorder";

const Raw = () => {
  const [mediaAudio, setmediaAudio] = useState(null);
  return (
    <div className="App">
      <ReactAudioRecorder
        render={({
          timer,
          stopRecording,
          startRecording,
          resumeRecording,
          pauseRecording,
          audioResult,
          status,
          errorMessage,
          audio,
        }) => {
          const helper = (e) => {
            console.log(document.getElementById("player").captureStream());
            setmediaAudio(document.getElementById("player").captureStream());
          };
          return (
            <div>
              <audio
                id="player"
                controls
                download
                src={audioResult}
                onPlay={helper}
                title="testing.wav"
                onEnded={() => setmediaAudio(null)}
              />
              <p>
                Status : <b>{status}</b>
              </p>
              <p>
                Error Message : <b>{errorMessage}</b>
              </p>
              <div>
                <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                <div>
                  <button onClick={startRecording}>Start</button>
                  <button onClick={stopRecording}>Stop</button>
                  <button onClick={pauseRecording}>Pause</button>
                  <button onClick={resumeRecording}>Resume</button>
                </div>
              </div>
              <div></div>
              {audio ? <AudioAnalyser audio={audio} /> : ""}
              {mediaAudio ? <AudioAnalyser audio={mediaAudio} /> : ""}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Raw;
