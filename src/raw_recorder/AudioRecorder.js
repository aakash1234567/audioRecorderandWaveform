import { useState, useRef } from "react";
import useTimer from "./useTimer";
const RECORD_STATUS = {
  IDLE: "idle",
  RECORDING: "recording",
  PAUSED: "paused",
};
let mediaRecorder;
let localStream;

const useAudioRecorder = () => {
  const dataArray = useRef([]);

  const [audio, setAudio] = useState(null);
  const [status, setStatus] = useState(RECORD_STATUS.IDLE);
  const [audioResult, setAudioResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    timer,
    handleStartTimer,
    handlePauseTimer,
    handleResumeTimer,
    handleResetTimer,
  } = useTimer();

  const startRecording = () => {
    if (status === RECORD_STATUS.IDLE) {
      try {
        setErrorMessage("");

        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((mediaStreamObj) => {
            localStream = mediaStreamObj;

            mediaRecorder = new MediaRecorder(mediaStreamObj);
            mediaRecorder.start();
            mediaRecorder.onstart = () => {
              handleStartTimer();
              setStatus(RECORD_STATUS.RECORDING);
              setAudio(mediaRecorder.stream);
            };
            mediaRecorder.ondataavailable = (event) => {
              dataArray.current.push(event.data);
            };
          })
          .catch((error) => {
            setErrorMessage(error?.message);
          });
      } catch (error) {
        setErrorMessage(error?.message);
      }
    } else {
      return;
    }
  };

  const resumeRecording = () => {
    if (status === RECORD_STATUS.PAUSED) {
      mediaRecorder.resume();
      mediaRecorder.onresume = () => {
        handleResumeTimer();
        setStatus(RECORD_STATUS.RECORDING);
      };
    } else {
      return;
    }
  };

  const pauseRecording = () => {
    if (status === RECORD_STATUS.RECORDING) {
      mediaRecorder.pause();
      mediaRecorder.onpause = () => {
        handlePauseTimer();
        setStatus(RECORD_STATUS.PAUSED);
      };
    } else {
      return;
    }
  };

  const stopRecording = () => {
    if (status !== RECORD_STATUS.IDLE) {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        handleResetTimer();
        let audioData = new Blob(dataArray.current, { type: "audio/wav;" });
        dataArray.current = [];
        setAudioResult(window.URL.createObjectURL(audioData));
        setStatus(RECORD_STATUS.IDLE);
        localStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
        setAudio(null);
      };
    } else {
      return;
    }
  };

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer,
    audio,
  };
};

export const ReactAudioRecorder = ({ render }) => {
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer,
    audio,
  } = useAudioRecorder();

  return render({
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    audioResult,
    errorMessage,
    timer,
    audio,
  });
};
