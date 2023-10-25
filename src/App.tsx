import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recordingState, setRecordingState] = useState(false);
  const [transcriptText, setTranscript] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/transcript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Method": "POST",
      },
      body: JSON.stringify({
        transcriptText,
      }),
    });
  }, [transcriptText]);

  return (
    <div>
      <button
        onClick={() => {
          const voiceRecog = new window.webkitSpeechRecognition();
          voiceRecog.continuous = true;
          voiceRecog.onresult = (eV) => {
            setTranscript(eV.results[0][0].transcript);
          };

          if (!recordingState) {
            voiceRecog.start();
            setRecordingState(true);
          } else {
            voiceRecog.stop();
            setRecordingState(false);
          }
        }}
      >
        {recordingState ? "Stop Recording" : "Start Recording"}
      </button>
      <p>Problem: {transcriptText}</p>
      <p>Remedy: </p>
    </div>
  );
}

export default App;
