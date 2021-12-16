import React, { Component } from "react";

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
const drawAudio = (stream) => {
  var ctx = new AudioContext();
  var audio = document.getElementById("aud");
  console.log(audio);
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  // we have to connect the MediaElementSource with the analyser
  audioSrc.connect(analyser);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // we're ready to receive some data!
  // loop
  var analyserCanvas = document.getElementById("canvas");
  const ctxaud = analyserCanvas.getContext("2d");
  ctxaud.clearRect(0, 0, analyserCanvas.width, analyserCanvas.height);
  const draw = (dataParm) => {
    let dataArray = [...dataParm];
    ctxaud.fillStyle = "rgb(200, 200, 200)";
    // ctxaud.fillRect(0, 0, analyserCanvas.width, analyserCanvas.height);
    ctxaud.lineWidth = 2;
    ctxaud.strokeStyle = "rgb(0, 0, 0)";
    ctxaud.beginPath();
    var sliceWidth = (analyserCanvas.width * 1.0) / dataParm.length;
    var x = 0;
    for (var i = 0; i < dataParm.length; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * analyserCanvas.height) / 2;

      if (i === 0) {
        ctxaud.moveTo(x, y);
      } else {
        ctxaud.lineTo(x, y);
      }

      x += sliceWidth;
    }
    ctxaud.lineTo(analyserCanvas.width, analyserCanvas.height / 2);
    ctxaud.stroke();

    // ctxaud.fillStyle = "white"; //white background
    // ctxaud.lineWidth = 2; //width of candle/bar
    // ctxaud.strokeStyle = "#d5d4d5"; //color of candle/bar
    // const space = analyserCanvas.width / dataParm.length;
    // dataParm.forEach((value, i) => {
    //   ctxaud.beginPath();
    //   ctxaud.moveTo(space * i, analyserCanvas.height); //x,y
    //   ctxaud.lineTo(space * i, analyserCanvas.height - value); //x,y
    //   ctxaud.stroke();
    // });
  };
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    // update data in frequencyData
    analyser.getByteFrequencyData(frequencyData);
    // render frame based on values in frequencyData
    // console.log(frequencyData);
    draw(frequencyData);
    setTimeout(() => {
      ctxaud.clearRect(0, 0, canvas.width, canvas.height);
    }, 1000);
  }
  // audio.start();
  renderFrame();
};

export default drawAudio;
