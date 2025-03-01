// js/app.js

// Load an audio file
const audioFile = document.getElementById("audioFile");
audioFile.addEventListener("change", ()=>{
    const uploadedAudioFile = document.getElementById("audioFile").files[0];
    wavesurfer.load(URL.createObjectURL(uploadedAudioFile)); 
    clickedTime = 0;
    document.getElementById("controls").classList.remove("hidden");
    document.getElementById("waveform-container").classList.remove("hidden");
});
