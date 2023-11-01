import { SVGProps, useState } from "react";
import "./App.css";

export function MaterialSymbolsMic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14Zm-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16q2.075 0 3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21h-2Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsMicOffOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.75 14.95L16.3 13.5q.35-.575.525-1.2T17 11h2q0 1.1-.325 2.087t-.925 1.863ZM12 9.15Zm2.8 2.8l-1.8-1.8V5q0-.425-.288-.713T12 4q-.425 0-.713.288T11 5v3.15l-2-2V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 .275-.063.5t-.137.45ZM11 21v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.438 3.538T12 16q.85 0 1.613-.263T15 15l1.425 1.425q-.725.575-1.588.975T13 17.925V21h-2Zm8.8 1.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4Z"
      ></path>
    </svg>
  );
}

function App() {
  const [recordingState, setRecordingState] = useState(false);
  const [transcriptText, setTranscript] = useState("");

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <p className="text-6xl font-Outfit font-bold py-5 text-[#333333] opacity-80">
        Verbalyze.
      </p>
      <div className="w-fit relative">
        <button
          className="p-5 bg-red-500 absolute rounded-full text-white font-bold bottom-[-20px] right-[-20px] z-50"
          onClick={async () => {
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
          {!recordingState ? (
            <MaterialSymbolsMic className="text-2xl" />
          ) : (
            <MaterialSymbolsMicOffOutline className="text-2xl" />
          )}
        </button>
        <p className="p-6  text-sm w-[500px] h-[500px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl mt-4 text-[#333333] opacity-90">
          {transcriptText}
        </p>
      </div>
    </div>
  );
}

export default App;
