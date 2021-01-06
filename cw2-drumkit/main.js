document.body.addEventListener('keypress', onKeyPress)
document.querySelector('#recordBtn').addEventListener('click', onRecordBtn)
document.querySelector('#playBtn').addEventListener('click', onPlayBtn)

let isRecording = false;
let recordedSound = [];
let recordStartTime = Date.now();


function onKeyPress(e){
    let soundId;
    switch(e.code){
        case "KeyA":
            soundId= 'boom';
            
            break;
        case "KeyS":
            soundId  = 'clap';
            break; 
        case "KeyD":
            soundId= 'hithat';
            break;
        case "KeyF":
            soundId = 'kick';
            break;
        case "KeyG":
            soundId = 'openhat';
            break;
        case "KeyH":
            soundId = 'ride';
            break; 
        case "KeyJ":
            soundId = 'snare';
            break;  
        case "KeyK":
            soundId = 'tink';
            break; 
        case "KeyL":
            soundId = 'tom';
            break;        
    }
    if(soundId){
        console.log(isRecording)
        document.querySelector('.'+soundId).classList.toggle('actuallSoundPlaying')
        setTimeout(function(){
            document.querySelector('.'+soundId).classList.remove('actuallSoundPlaying')

        }, 400)
        if(isRecording == true){
            const soundTime = Date.now() - recordStartTime;
            const soundObj = {
                soundId: soundId,
                time: soundTime
            };
            recordedSound.push(soundObj);
            console.log(recordedSound)
        }

        playSound(soundId);
    }
}

function playSound(soundId){
    const sound = document.querySelector('#' + soundId);
    sound.play();
}



function onRecordBtn(){
   // recordStartTime = Date.now();
   const btn = document.querySelector('#recordBtn');
   
   if(isRecording){
       btn.innerHTML = "Start recording";
       isRecording = false;
       btn.classList.remove("recording")
   }
   else{
        btn.innerHTML = "Stop recording";
        isRecording = true;
        btn.classList.add("recording")
        recordedSound = [];
        recordStartTime = Date.now();
   }
}
 
 function onPlayBtn(){
     for (let i = 0; i < recordedSound.length; i++) {
         const soundObj = recordedSound[i];
        if(i == 0) playSound(soundObj.soundId);
        else{
         setTimeout(() =>{
             playSound(soundObj.soundId);
         }, soundObj.time);
        }
    }
 }