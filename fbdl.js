function downloadAndPlayVideo() {
    var url = document.getElementById("videoUrl").value;

    fetchVideo(url);
}

function fetchVideo(url) {
    fetch(`https://all-in-one-api-by-faheem.replit.app/api/download/fb2?url=${url}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === true && data.result.status === "ok") {
            var links = data.result.links;
            var videoPlayer = `<video controls autoplay>`;
            videoPlayer += `<source src="${links.hd}" type="video/mp4">`;
            videoPlayer += `Your browser does not support the video tag.`;
            videoPlayer += `</video>`;
            document.getElementById("videoPlayer").innerHTML = videoPlayer;

            var downloadLink = `<button onclick="startDownloadCountdown('${links.hd}')" class="download-button">Download</button>`;
            document.getElementById("downloadLink").innerHTML = downloadLink;
        } else {
            document.getElementById("videoPlayer").innerHTML = `<p>Error: Unable to fetch video information</p>`;
            document.getElementById("downloadLink").innerHTML = "";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("videoPlayer").innerHTML = `<p>Error: Unable to fetch video information</p>`;
        document.getElementById("downloadLink").innerHTML = "";
    });
}

function startDownloadCountdown(videoUrl) {
    var countdown = 10; // Countdown duration in seconds
    var countdownInterval = setInterval(function() {
        document.getElementById("downloadLink").innerHTML = `Download will start in ${countdown} seconds...`;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            window.location.href = videoUrl; // Start download
        }
    }, 1000);
}

function goBack() {
    window.location.href = "mainCenter.html"; // Redirect to mainCenter.html
}
