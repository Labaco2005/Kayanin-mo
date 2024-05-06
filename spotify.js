document.addEventListener("DOMContentLoaded", function() {
  var queryInput = document.getElementById("query");
  var searchButton = document.querySelector(".search-button");

  // Disable search button initially
  searchButton.disabled = true;

  // Add event listener to input field
  queryInput.addEventListener("input", function() {
    // Check if input field is empty
    if (queryInput.value.trim() === "") {
      searchButton.disabled = true;
    } else {
      searchButton.disabled = false;
    }
  });
});

var audioPlayer = new Audio();
var isMusicPlaying = false;
var isSongFound = false;

function searchSong() {
  var query = document.getElementById("query").value;
  var apiUrl = "https://markdevs-last-api.onrender.com/spotify?q=" + encodeURIComponent(query);
  var loadingSpinner = document.getElementById("loadingSpinner");

  // Show loading spinner
  loadingSpinner.style.display = "block";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        playSong(data.result);
        isSongFound = true;
      } else {
        isSongFound = false;
        showErrorMessage("Song not found");
      }
      // Hide loading spinner
      loadingSpinner.style.display = "none";
    })
    .catch(error => {
      console.error('Error:', error);
      // Hide loading spinner on error
      loadingSpinner.style.display = "none";
    });
}

function playSong(url) {
  audioPlayer.src = url;
  audioPlayer.addEventListener('timeupdate', updateSeekRange);
  audioPlayer.play();
  isMusicPlaying = true;
  document.getElementById("playPauseButton").textContent = "Pause";
  document.getElementById("playPauseButton").disabled = false;
  document.getElementById("downloadButton").disabled = false; // Enable download button
}

function updateSeekRange() {
  var seekRange = document.getElementById("seekRange");
  seekRange.max = audioPlayer.duration;
  seekRange.value = audioPlayer.currentTime;

  var currentTime = document.getElementById("currentTime");
  currentTime.textContent = formatTime(audioPlayer.currentTime);
}

function seekToTime() {
  var seekRange = document.getElementById("seekRange");
  audioPlayer.currentTime = seekRange.value;
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function togglePlayPause() {
  if (isMusicPlaying) {
    if (audioPlayer.paused) {
      audioPlayer.play();
      document.getElementById("playPauseButton").textContent = "Pause";
    } else {
      audioPlayer.pause();
      document.getElementById("playPauseButton").textContent = "Play";
    }
  }
}

function goBack() {
  audioPlayer.pause();
  isMusicPlaying = false;
  document.getElementById("playPauseButton").textContent = "Play";
  document.getElementById("playPauseButton").disabled = true;
  document.getElementById("downloadButton").disabled = true; // Disable download button
  window.location.href = "mainCenter.html";
}

function downloadAudio() {
  var downloadLink = document.createElement('a');
  downloadLink.href = audioPlayer.src;
  downloadLink.download = 'audio.mp3';
  downloadLink.click();
}

function showErrorMessage(message) {
  var errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  setTimeout(function() {
    errorMessage.textContent = "";
  }, 3000); // Hide message after 3 seconds
}
