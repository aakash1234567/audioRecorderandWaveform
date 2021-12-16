const Pkg2 = () => {
  return (
    <div>
      <div className="wrapper">
        <header>
          <h1>Web dictaphone</h1>
        </header>

        <section className="main-controls">
          <canvas className="visualizer" height="60px"></canvas>
          <div id="buttons">
            <button className="record">Record</button>
            <button className="stop">Stop</button>
          </div>
        </section>

        <section className="sound-clips"></section>
      </div>

      <label htmlFor="toggle">❔</label>
      <input type="checkbox" id="toggle" />
      <aside>
        <h2>Information</h2>

        <p>
          Web dictaphone is built using{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia">
            getUserMedia
          </a>{" "}
          and the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API">
            MediaRecorder API
          </a>
          , which provides an easier way to capture Media streams.
        </p>

        <p>
          Icon courtesy of{" "}
          <a href="http://findicons.com/search/microphone">Find Icons</a>.
          Thanks to <a href="http://soledadpenades.com/">Sole</a> for the
          Oscilloscope code!
        </p>
      </aside>
    </div>
  );
};

export default Pkg2;
