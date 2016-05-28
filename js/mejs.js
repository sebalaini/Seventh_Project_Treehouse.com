
window.onload = function() {

var video = document.getElementById("video");
var progress = document.getElementById("progress");
var bufferedBar = document.getElementById("buffered-amount");
var timeCurrent = document.getElementById("time-current");
var	timeDuration = document.getElementById("time-duration");
var playButton = document.getElementById("play-pause");
var muteButton = document.getElementById("mute");
var volumeBar = document.getElementById("volume-bar");
var cc = document.getElementById("cc");
var speedBtn = document.getElementById("speed");
var fullScreenButton = document.getElementById("full-screen");

var ph01 = document.getElementById("ph01");
var ph02 = document.getElementById("ph02");
var ph03 = document.getElementById("ph03");
var ph04 = document.getElementById("ph04");
var ph05 = document.getElementById("ph05");
var ph06 = document.getElementById("ph06");
var ph07 = document.getElementById("ph07");
var ph08 = document.getElementById("ph08");
var ph09 = document.getElementById("ph09");
var ph10 = document.getElementById("ph10");
var ph11 = document.getElementById("ph11");
var	ph12 = document.getElementById("ph12");
var ph13 = document.getElementById("ph13");
var ph14 = document.getElementById("ph14");
var ph15 = document.getElementById("ph15");
var ph16 = document.getElementById("ph16");







//?¿
function bufferedBar() {
			function updateLoadProgress() {
				if (video.buffered.length > 0) {
					var percent = (video.buffered.end(0) / video.duration) * 100;
					video.bufferBar.css("width", percent + '%');
				}
			}
			video.bind("progress", function() {
				updateLoadProgress();
			});
			video.bind("loadeddata", function() {
				updateLoadProgress();
			});
			video.bind("canplaythrough", function() {
				updateLoadProgress();
			});
			video.bind("playing", function() {
				updateLoadProgress();
			});
		}





// Function for the progress bar
function updateProgress() {
   var value = 0;
   if (video.currentTime > 0) {
      value = Math.floor((100 / video.duration) * video.currentTime);
   }
   progress.style.width = value + "%";
}

// Event listener for the progress bar
video.addEventListener("timeupdate", updateProgress, false);


// Function for the current time
function timing() {
	var currtime = video.currentTime 
  var minutes = Math.floor(currtime / 60);
  var seconds = Math.floor(currtime - minutes * 60);
	var x = minutes < 10 ? " " + minutes + ":": minutes;
  var y = seconds < 10 ? "0" + seconds : seconds;
  timeCurrent.innerHTML = ( x + y + " " + "/");
}

// Event listener for the current time
video.addEventListener("timeupdate", timing, false);


// Function for the current time
function timing2() {
	var totaltime = video.duration 
  var minutes = Math.floor(totaltime / 60);
  var seconds = Math.floor(totaltime - minutes * 60);
	var x = minutes < 10 ? " " + minutes + ":": minutes;
  var y = seconds < 10 ? "0" + seconds : seconds;
  timeDuration.innerHTML = ( x + y + " ");
}

// Event listener for the total time
video.addEventListener("timeupdate", timing2, false);


// Event listener for the play/pause button
playButton.addEventListener("click", function() {
	if (video.paused == true) {
		// Play the video
		video.play();	
		// Update the button background
		playButton.style.backgroundImage="url(icons/pause-icon.png)";
	} else {
		// Pause the video
		video.pause();
		// Update the button background
		playButton.style.backgroundImage="url(icons/play-icon.png)";
	}
});


// Event listener for the mute button
muteButton.addEventListener("click", function() {
	if (video.muted == false) {
		// Mute the video
		video.muted = true;
		// Update the button background
		muteButton.style.backgroundImage="url(icons/volume-off-icon.png)";
	} else {
		// Unmute the video
		video.muted = false;
		// Update the button background
		muteButton.style.backgroundImage="url(icons/volume-on-icon.png)";
	}
});


// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen(); // Firefox
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen(); // Chrome and Safari
	}
});


volumeBar.addEventListener('change', onVolumeBarChange);
// Event listener for the volume bar
function onVolumeBarChange () {
  // Update the video volume
	video.volume = volumeBar.value;
	if (video.volume == 0) {
    // Update the button background
    muteButton.style.backgroundImage="url(icons/volume-off-icon.png)";
  } else {
    // Update the button background
    muteButton.style.backgroundImage="url(icons/volume-on-icon.png)";
  }
}

};


