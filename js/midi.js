const startMidiBtn = document.getElementById("startMidiBtn");

let ctx;
const oscillators = {};

startMidiBtn.addEventListener("click", ()=>{
    ctx = new AudioContext();
    console.log(ctx);
});

if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess){
    midiAccess.onstatechange = updateDevices;

    const inputs = midiAccess.inputs;
    inputs.forEach((input) => {
        input.onmidimessage = handleInput;
    });
}

function failure(){
    console.log('Could not connect MIDI');
}

function midiToNumber(number){
    const a = 440;

    return (a/32) * (2 ** ((number - 9) / 12));
}

 function handleInput(input){
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch(command){
        case 144:
            if(velocity > 0){
                noteOn(note,velocity);
            }
            else {
                noteOff(note);
            }
        break;
        case 128:
            noteOff(note);
        break;
    }
 }

 function noteOn(note,velocity){
    const osc = ctx.createOscillator();

    osc.type = "sine";
    osc.frequency.value = midiToNote(note);

    const oscGain = ctx.createGain();
    oscGain.gain.value = ((1/127)*velocity)/3;

    osc.connect(oscGain);
    
    oscGain.connect(ctx.destination);
    osc.gain = oscGain;
    oscillators[note.toString()] = osc;
    osc.start();
 }


function noteOff(note){
    const osc = oscillators[note.toString()];
    const oscGain = osc.gain;

    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

    setTimeout(() =>{
        osc.stop();
        osc.disconnect();

    },100)
}





function midiToNote(number){
    const a = 440;

    return (a/32) * (2 ** ((number - 9) / 12));
}


 function updateDevices(event){
    console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State, ${event.port.state}, Type: ${event.port.type}`);
}
