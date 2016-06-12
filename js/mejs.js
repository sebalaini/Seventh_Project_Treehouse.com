
window.onload = function() {

var video = document.getElementById("video");
var progress = document.getElementById("progress");
var progressBar = document.getElementById("progress-amount");
var buffered = document.getElementById("buffered");
var bufferedBar = document.getElementById("buffered-amount");
var timeCurrent = document.getElementById("time-current");
var	timeDuration = document.getElementById("time-duration");
var playButton = document.getElementById("play-pause");
var muteButton = document.getElementById("mute");
var volumeBar = document.getElementById("volume-bar");
var subtitles = document.getElementById("cc");
var SpeedContainer = document.getElementById("speed-container");
var buttonSpeed05x = document.getElementById("speed05");
var buttonSpeed10x = document.getElementById("speed10");
var buttonSpeed15x = document.getElementById("speed15");
var buttonSpeed20x = document.getElementById("speed20");
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



/***************
BUFFER BAR
***************/

// Event listener for the buffered bar
video.addEventListener("progress", function() {
  var duration = video.duration;
  var bufferedAmount = video.buffered.end(video.buffered.length - 1);
	  if (duration > 0) {
    bufferedBar.style.width = ((bufferedAmount / duration)*100) + "%";
  }
});



/***************
PROGRESS BAR
***************/

// Event listener for the current time bar
video.addEventListener("timeupdate", function() {
  progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});

// Function for update the progress bar width
function setPlayProgress(clickX) {
	var newPercent = Math.max(0, Math.min(1, (clickX - findPosX(progress)) / progress.offsetWidth));
	video.currentTime = newPercent * video.duration;
	progressBar.style.width = newPercent * (progress.offsetWidth - 2) + "px";
}

function blockTextSelection(){
	document.body.focus();
	document.onselectstart = function () { return false; };
}

function unblockTextSelection(){
	document.onselectstart = function () { return true; };
}

// Find the position X on the progress bar
function findPosX(obj) {
	var curleft = obj.offsetLeft;
	while(obj = obj.offsetParent) {
	curleft += obj.offsetLeft;
	}
	return curleft;
}

// Mouse event
progress.addEventListener("mousedown", function(){
	blockTextSelection();
		document.onmousemove = function(e) {
		setPlayProgress(e.pageX);
};

document.onmouseup = function() {
	unblockTextSelection();
	document.onmousemove = null;
	document.onmouseup = null;
};

}, true);
progress.addEventListener("mouseup", function(e){
setPlayProgress(e.pageX);
}, true);



/***************
TIME
***************/

// Event listener for the current time
video.addEventListener("timeupdate", timing, false);
// Function for the current time
function timing() {
	var currtime = video.currentTime;
  var minutes = Math.floor(currtime / 60);
  var seconds = Math.floor(currtime - minutes * 60);
	var x = minutes < 10 ? " " + minutes + ":": minutes;
  var y = seconds < 10 ? "0" + seconds : seconds;
  timeCurrent.innerHTML = ( x + y + " " + "/");
}


// Function for the current time
function timing2() {
	var totaltime = video.duration;
  var minutes = Math.floor(totaltime / 60);
  var seconds = Math.floor(totaltime - minutes * 60);
	var x = minutes < 10 ? " " + minutes + ":": minutes;
  var y = seconds < 10 ? "0" + seconds : seconds;
  timeDuration.innerHTML = ( x + y + " ");
}


// Event listener for the total time
video.addEventListener("timeupdate", timing2, false);



/***************
PLAY PAUSE
***************/

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



/***************
VOLUME
***************/

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


// Event listener for the volume bar
volumeBar.addEventListener('change', onVolumeBarChange);
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



/***************
VIDEO SPEED
***************/

function videoSpeed(speed){
	video.playbackRate = speed;
}

buttonSpeed20x.onclick = function() {
	videoSpeed(2.0);
};
buttonSpeed15x.onclick = function() {
	videoSpeed(1.5);
};
buttonSpeed10x.onclick = function() {
	videoSpeed(1.0);
};
buttonSpeed05x.onclick = function() {
	videoSpeed(0.5);
};


video.click(function() {
	if (this.paused === false) {
		video.pauseVideo();
	} else
	if (this.paused === true) {
		video.playVideo();
	}
});



/***************
CC
***************/

// Event listener for subtitles
 subtitles.addEventListener("click", function (event) {
  var currentMode = video.textTracks[0].mode;
  video.textTracks[0].mode = currentMode === 'showing' ? 'hidden' : 'showing';
});



/***************
FULL SCREEN
***************/

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



/***************
CAPTIONS HIGHLIGHTS
***************/
			
video.addEventListener('timeupdate', function() {
	var currTime = video.currentTime;
	if (currTime > 0 && currTime < 4 ) {
		ph01.style.color = "#ffa500";
	} else {
		ph01.style.color = "#99a0a3";
	}
	if (currTime > 4 && currTime < 7.5 ) {
		ph02.style.color = "#ffa500"; 
	} else {
		ph02.style.color = "#99a0a3";    
	}
	if (currTime > 7.5 && currTime < 11.2 ) {
		ph03.style.color = "#ffa500"; 
	} else {
		ph03.style.color = "#99a0a3";    
	}
	if (currTime > 11.2 && currTime < 14 ) {
		ph04.style.color = "#ffa500"; 
	} else {
		ph04.style.color = "#99a0a3";    
	}
	if (currTime > 14 && currTime < 18 ) {
		ph05.style.color = "#ffa500";
	} else {
		ph05.style.color = "#99a0a3";    
	}
	if (currTime > 18 && currTime < 22.4 ) {
		ph06.style.color = "#ffa500";  
	} else {
		ph06.style.color = "#99a0a3";    
	}
	if (currTime > 22.4 && currTime < 26.9 ) {
		ph07.style.color = "#ffa500";  
	} else {
		ph07.style.color = "#99a0a3";    
	}
	if (currTime > 26.9 && currTime < 31 ) {
		ph08.style.color = "#ffa500";
	} else {
		ph08.style.color = "#99a0a3";    
	}
	if (currTime > 32.1 && currTime < 34.7 ) {
		ph09.style.color = "#ffa500";   
	} else {
		ph09.style.color = "#99a0a3";    
	}
	if (currTime > 34.7 && currTime < 39.5 ) {
		ph10.style.color = "#ffa500";  
	} else {
		ph10.style.color = "#99a0a3";    
	}
	if (currTime > 39.5 && currTime < 41.2 ) {
		ph11.style.color = "#ffa500";  
	} else {
		ph11.style.color = "#99a0a3";    
	}
	if (currTime > 42.3 && currTime < 46.3 ) {
		ph12.style.color = "#ffa500";  
	} else {
		ph12.style.color = "#99a0a3";    
	}
	if (currTime > 46.3 && currTime < 49.3 ) {
		ph13.style.color = "#ffa500";  
	} else {
		ph13.style.color = "#99a0a3";    
	}
	if (currTime > 49.3 && currTime < 53.7 ) {
		ph14.style.color = "#ffa500";  
	} else {
		ph14.style.color = "#99a0a3";    
	}
	if (currTime > 53.8 && currTime < 57.8 ) {
		ph15.style.color = "#ffa500";  
	} else {
		ph15.style.color = "#99a0a3";    
	}
	if (currTime > 57.8 && currTime < 59 ) {
		ph16.style.color = "#ffa500"; 
	} else {
		ph16.style.color = "#99a0a3";    
	}
});



/***************
INTERACTIVE CAPTIONS
***************/

	ph01.onclick = function() {
		video.currentTime = 0;
		video.play();
	};
	ph02.onclick = function() {
		video.currentTime = 4;
		video.play();
	};
	ph03.onclick = function() {
		video.currentTime = 7.5;
		video.play();
	};
	ph04.onclick = function() {
		video.currentTime = 11.2;
		video.play();
	};
	ph05.onclick = function() {
		video.currentTime = 14;
		video.play();
	};
	ph06.onclick = function() {
		video.currentTime = 18;
		video.play();
	};
	ph07.onclick = function() {
		video.currentTime = 22.4;
		video.play();
	};
	ph08.onclick = function() {
		video.currentTime = 26.9;
		video.play();
	};
	ph09.onclick = function() {
		video.currentTime = 32.1;
		video.play();
	};
	ph10.onclick = function() {
		video.currentTime = 34.7;
		video.play();
	};
	ph11.onclick = function() {
		video.currentTime = 39.5;
		video.play();
	};
	ph12.onclick = function() {
		video.currentTime = 42.3;
		video.play();
	};
	ph13.onclick = function() {
		video.currentTime = 46.3;
		video.play();
	};
	ph14.onclick = function() {
		video.currentTime = 49.3;
		video.play();
	};
	ph15.onclick = function() {
		video.currentTime = 53.8;
		video.play();
	};
	ph16.onclick = function() {
		video.currentTime = 57.8;
		video.play();
	};


};


