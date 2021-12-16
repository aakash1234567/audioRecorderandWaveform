import React, { useEffect } from "react";

const AudioVisualiser = (props) => {
  useEffect(() => {
    draw();
  });

  const draw = () => {
    var canvas = document.getElementById("canva");
    const { audioData } = props;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  };

  return <canvas width="700" height="200" id="canva" />;
};

export default AudioVisualiser;
