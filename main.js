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

  // addVideoStream(localStream, true);
  llamar.addEventListener("click", async () => {
    //   var conn = peer.connect(callId.value);
    //   console.log(conn);
    let call = peer.call(callId.value, localStream);
    call.on("stream", function (remoteStream) {
      // `stream` is the MediaStream of the remote peer.
      // Here you'd add it to an HTML video/canvas element.
      addVideoStream(remoteStream, true);
    });
    // addVideoStream(localStream, true);
  });

  peer.on("call", (call) => {
    // Answer the call, providing our mediaStream
    call.answer(localStream);
    call.on("stream", function (remoteStream) {
      // `stream` is the MediaStream of the remote peer.
      // Here you'd add it to an HTML video/canvas element.
      addVideoStream(remoteStream, true);
    });
  });
})();
