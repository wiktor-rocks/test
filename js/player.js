// js/player.js

let zoomLevel = 50; // Default zoom level
let clickedTime = 0;

// Initialize Wavesurfer
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'gray',
    progressColor: 'rgb(227, 174, 0)',
    barWidth: 0,
    barGap: 0,
    height: 200,
    normalize: false,
    minPxPerSec: zoomLevel,
    dragToSeek:false,
    fillParent: true,
});


// Get elements
const waveformContainer = document.getElementById('waveform-container');
const cursorLine = document.getElementById('cursor-line');
const volumeSlider = document.getElementById('volume');
const tempoSlider = document.getElementById('tempo');

// Show vertical line on hover
waveformContainer.addEventListener('mouseenter', () => cursorLine.style.display = 'block');
waveformContainer.addEventListener('mouseleave', () => cursorLine.style.display = 'none');

// Update vertical line position
waveformContainer.addEventListener('mousemove', (event) => {
    const rect = waveformContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    cursorLine.style.left = `${x}px`;
});

waveformContainer.addEventListener('click',()=>{
    clickedTime = wavesurfer.getCurrentTime();
    wavesurfer.setTime(clickedTime);
});

// Play/Pause button
document.getElementById('playPause').addEventListener('click', () => {
    if(wavesurfer.isPlaying()){
        wavesurfer.pause();
    }
    else {
        wavesurfer.play();

        wavesurfer.setTime(clickedTime);
    }
});

// Zoom In
document.getElementById('zoomIn').addEventListener('click', () => {
    zoomLevel = Math.min(zoomLevel + 20, 500);
    wavesurfer.zoom(zoomLevel);
});

// Zoom Out
document.getElementById('zoomOut').addEventListener('click', () => {
    zoomLevel = Math.max(zoomLevel - 20, 10);
    wavesurfer.zoom(zoomLevel);
});

// Volume Control
volumeSlider.addEventListener('input', (event) => {
    const volume = parseFloat(event.target.value);
    wavesurfer.setVolume(volume);
});

// Tempo Control
tempoSlider.addEventListener('input', (event)=>{
    var tempo = parseFloat(event.target.value);
    console.log(tempo);
    if (tempo <= 0.29 && tempo > 0.21) {  
        tempo = 0.25;
    } else if (tempo <= 0.54 && tempo > 0.44) {  
        tempo = 0.5;
    } else if (tempo <= 0.78 && tempo > 0.71) {  
        tempo = 0.75;
    } else if (tempo <= 1.04 && tempo > 0.96) {  
        tempo = 1;
    } else if (tempo <= 1.29 && tempo > 1.21) {  
        tempo = 1.25;
    } else if (tempo <= 1.54 && tempo > 1.46) {  
        tempo = 1.5;
    } else if (tempo <= 1.79 && tempo > 1.71) {  
        tempo = 1.75;
    } else if (tempo > 1.96) {  
        tempo = 2;
    }
    

    wavesurfer.setPlaybackRate(tempo);
    document.getElementById("tempoLabel").innerHTML = "Tempo: "+(tempo*100).toFixed(0)+"%";
});


document.addEventListener("keydown", (event) =>{
    if(event.code === "Space"){
        event.preventDefault();
        if(wavesurfer.isPlaying()){
        wavesurfer.pause();
    }
    else {
        wavesurfer.play();

        wavesurfer.setTime(clickedTime);
    } 
    }
});


wavesurfer.on('finish', ()=> {
    wavesurfer.play();
    wavesurfer.setTime(clickedTime);

});


