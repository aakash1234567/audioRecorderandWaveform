import React, { Component } from "react";
import AudioAnalyser from "./AudioAnalyser";
import { ReactAudioRecorder } from "./AudioRecorder";

class Raw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
    };
  }
  render() {
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
              this.setState({
                audio: document.getElementById("player").captureStream(),
              });
            };
            return (
              <div>
                <audio
                  id="player"
                  controls
                  download
                  src={audioResult}
                  onPlay={helper}
                  onEnded={() =>
                    this.setState({
                      audio: null,
                    })
                  }
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
                {audio ? <AudioAnalyser audio={audio} /> : ""}
                {this.state.audio ? (
                  <AudioAnalyser audio={this.state.audio} />
                ) : (
                  ""
                )}
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default Raw;
