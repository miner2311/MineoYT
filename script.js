document.addEventListener('DOMContentLoaded', function() {
    fetchLatestVideo();
  });
  
  function fetchLatestVideo() {
    const apiKey = 'AIzaSyAVTr5Sibixz-qxktu0PM1N4NeZ2iAFjY0'; 
    const channelId = 'UC18P6ul4qthaJpWw8Un7SJw'; 
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3&type=video`;
  
    fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);  // API 응답을 콘솔에 출력
          const videoItems = data.items; // API 응답에서 비디오 항목 가져오기
          if (videoItems.length > 0) {
            videoItems.forEach(item => {
              const videoId = item.id.videoId;
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
  
