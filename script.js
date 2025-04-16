/* scripts.js */
// Select elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle between play and pause
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

// Update the button icon depending on play state
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and playback rate sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub video when clicking or dragging on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
  range.addEventListener('change', handleRangeUpdate); // for better responsiveness
});

// Scrub interaction
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Optional error handling
video.addEventListener('error', () => {
  alert('Error loading video. Please make sure "download.mp4" exists in the correct location.');
});

