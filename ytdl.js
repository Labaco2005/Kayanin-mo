const apiUrl = 'https://markdevs-last-api.onrender.com/api/ytdl?url=';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const videoPlayer = document.getElementById('video-player');

searchButton.addEventListener('click', () => {
  const videoUrl = searchInput.value;
  if (videoUrl) {
    const fullApiUrl = `${apiUrl}${encodeURIComponent(videoUrl)}`;
    videoPlayer.src = fullApiUrl;
    videoPlayer.play(); // Auto-play the video
    searchInput.value = ''; // Clear the search input
  } else {
    alert('Please enter a valid YouTube URL.');
  }
});
