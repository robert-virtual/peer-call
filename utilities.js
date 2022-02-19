const videoGrid = document.getElementById("video-grid");

export function addVideoStream(stream, muted = false) {
  let video = document.createElement("video");
  video.srcObject = stream;
  video.muted = muted;
  video.addEventListener("loadedmetadata", () => video.play());

  videoGrid.append(video);
}
