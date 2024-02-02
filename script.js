// script.js
document.addEventListener('DOMContentLoaded', function() {
  fetchLatestVideo();
});

function fetchLatestVideo() {
  const apiKey = 'AIzaSyAVTr5Sibixz-qxktu0PM1N4NeZ2iAFjY0'; 
  const uploadsPlaylistId = 'UU18P6ul4qthaJpWw8Un7SJw'; // 'Uploads' 재생 목록 ID
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${uploadsPlaylistId}&part=snippet,id&order=date&maxResults=3`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.items.length > 0) {
              data.items.forEach(item => {
                  const videoId = item.snippet.resourceId.videoId;
                  displayLatestVideo(videoId);
              });
          } else {
              console.error('No videos found');
          }
      })
      .catch(error => {
          console.error('Error fetching latest video:', error);
      });
}

function displayLatestVideo(videoId) {
  const container = document.getElementById('latest-video-container');
  container.innerHTML += `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `;
}
