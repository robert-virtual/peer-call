const videoGrid = document.getElementById("video-grid");

export function addVideoStream(stream, msg, muted = false) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.textContent = msg;
  let video = document.createElement("video");
  video.srcObject = stream;
  video.muted = muted;
  video.addEventListener("loadedmetadata", () => video.play());
  div.append(video);
  div.append(p);
  videoGrid.append(div);
}
