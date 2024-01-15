const apiKey = 'AIzaSyCG0fjdfhugHxtL3mfmYnEC8bXo2cSfMlQ';
const channelId = 'UC18P6ul4qthaJpWw8Un7SJw';
const maxResults = 5;

const videoContainer = document.getElementById('video-container');

// YouTube API를 사용하여 동영상 정보 가져오기
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const videos = data.items;

        // 동영상 정보를 이용하여 동적으로 웹사이트에 추가
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');

            const thumbnailUrl = video.snippet.thumbnails.medium.url;
            const videoTitle = video.snippet.title;
            const videoId = video.id.videoId;

            videoCard.innerHTML = `
                <img src="${thumbnailUrl}" alt="${videoTitle}">
                <p>${videoTitle}</p>
                <i class="play-icon" onclick="playVideo('${videoId}')">&#9658;</i>
            `;

            videoContainer.appendChild(videoCard);
        });
    })
    .catch(error => console.error('Error fetching YouTube API:', error));

// 동영상 재생 함수
function playVideo(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}
