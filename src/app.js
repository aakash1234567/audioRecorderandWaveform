import Raw from "./raw_recorder";
import Pkg1 from "./npm_pkg1";
import Pkg2 from "./npm_pkg2";
import "./app.css";
const App = () => {
  return (
    <>
      <div>
        <h1>Raw recorder</h1>
        <Raw />
      </div>
      <p>
        whole system is designed from scratch. No extra npm package used. First
        start recording the audio and when done with recording the same audio
        can be played with audio tag. In both cases recording and playing audio
        waveform can be visualised.
      </p>
      <div>
        <h1>
          Recorder using npm package react-mic: npm install --save react-mic
        </h1>
        <Pkg1 />
        <p>
          Made from npm package react-mic. Has built in waveform visualiser. But
          when playing recorded audio we have to use another waveform visualiser
          or alternatively study the code of react-mic and then make necessary
          changes in the node module itself(Experimental)
        </p>
      </div>
      <div>
        <h1>Recorder using npm package2</h1>
        <Pkg2 />
      </div>
    </>
  );
};

export default App;
