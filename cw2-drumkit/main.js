document.body.addEventListener('keypress', onKeyPress)
document.querySelector('#recordBtn').addEventListener('click', onRecordBtn)
document.querySelector('#playBtn').addEventListener('click', onPlayBtn)

let recordedSound = [];
let recordStartTime;

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
    }
    if(soundId){
        const soundTime = Date.now() - recordStartTime;
        const soundObj = {
            soundId: soundId,
            time: soundTime
        };

        playSound(soundId);
        recordedSound.push(soundObj);
    }
}

function onRecordBtn(){
   recordStartTime = Date.now();
}

function onPlayBtn(){
    for (let i = 0; i < recordedSound.length; i++) {
        const soundObj = recordedSound[i];
        setTimeout(() =>{
            playSound(soundObj.soundId);
        }, soundObj.time);

    }
}

function playSound(soundId){
    const sound = document.querySelector('#' + soundId);
    sound.play();

}