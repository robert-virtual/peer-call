import { addVideoStream } from "./utilities.js";

let peer = new Peer();
const callId = document.getElementById("call-id");
const llamar = document.getElementById("llamar");
const myId = document.getElementById("myId");
let localStream = new MediaStream();

(async () => {
  peer.on("open", (id) => {
    console.log("My peer ID is: " + id);
    myId.textContent = "Mi Id: " + id;
  });
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  const myVideo = document.createElement("video");
  addVideoStream(myVideo, localStream, "Local", true);

  llamar.addEventListener("click", () => {
    //   var conn = peer.connect(callId.value);
    //   console.log(conn);
    console.log("llamar.EventListener.click");
    let call = peer.call(callId.value, localStream);
    const newVideo = document.createElement("video");
    call.on("stream", (remoteStream) => {
      addVideoStream(newVideo, remoteStream, "Remoto", true);
    });
    call.on("close", () => {
      newVideo.remove();
    });
  });

  peer.on("call", (call) => {
    // Answer the call, providing our mediaStream
    call.answer(localStream);

    const newVideo = document.createElement("video");
    call.on("stream", (remoteStream = new MediaStream()) => {
      addVideoStream(newVideo, remoteStream, "Remoto", true);
    });
    call.on("close", () => {
      newVideo.remove();
    });
  });
})();
