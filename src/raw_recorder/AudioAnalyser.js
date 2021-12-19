// import React, { useEffect, useState } from "react";
// import AudioVisualiser from "./AudioVisualiser";

// const AudioAnalyser = (props) => {
//   const [audioData, setaudioData] = useState(new Uint8Array(0));
//   const requestRef = React.useRef();
//   var audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   var analyser = audioContext.createAnalyser();
//   var dataArray = new Uint8Array(analyser.frequencyBinCount);
//   var source = audioContext.createMediaStreamSource(props.audio);
//   useEffect(() => {
//     source.connect(analyser);
//     requestRef.current = requestAnimationFrame(tick);
//     return () => {
//       cancelAnimationFrame(requestRef.current);
//       analyser.disconnect();
//       source.disconnect();
//     };
//   }, []);
//   const tick = () => {
//     analyser.getByteTimeDomainData(dataArray);
//     setaudioData(dataArray);
//     requestRef.current = requestAnimationFrame(tick);
//   };
//   return <AudioVisualiser audioData={audioData} />;
// };

// export default AudioAnalyser;

import React, { Component } from "react";
import AudioVisualiser from "./AudioVisualiser";

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <AudioVisualiser audioData={this.state.audioData} />;
  }
}

export default AudioAnalyser;
