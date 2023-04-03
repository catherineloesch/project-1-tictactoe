//.mp3 sound files are located in the audio folder
// all files are open source sound effects from pixabay (https://pixabay.com/sound-effects/)
// Howler.js library used (https://howlerjs.com/ | https://cdnjs.com/libraries/howler)

const soundWin = new Howl({
    src: ['./audio/success.mp3', './audio/success.wav', './audio/success.webm'],
    volume: 0.5
})

const soundDraw = new Howl({
    src: ['./audio/draw.mp3', './audio/draw.wav', './audio/draw.webm'],
    volume: 0.4
})

const soundMakeMoveX = new Howl({
    src: ['./audio/clicks.mp3', './audio/clicks.wav', './audio/clicks.webm'],
    volume: 0.5
})

const soundMakeMoveO = new Howl({
    src: ['./audio/mouseClick2.mp3', './audio/mouseClick2.wav', './audio/mouseClick2.webm'],
    volume: 0.3
})

const soundClick = new Howl({
    src: ['./audio/mouseClick.mp3', './audio/mouseClick.wav', './audio/mouseClick.webm'],
    volume: 0.5
})

const soundResetScores = new Howl({
    src: ['./audio/game_button.mp3', './audio/game_button.wav', './audio/game_button.webm'],
    volume: 0.5
})

const soundResetGame = new Howl({
    src: ['./audio/processing.mp3', './audio/processing.wav', './audio/processing.webm'],
    volume: 1
})

const soundOn = new Howl({
    src: ['./audio/notification.mp3', './audio/notification.wav', './audio/notification.webm'],
    volume: 0.5
})

const soundSave = new Howl({
    src: ['./audio/save.mp3', './audio/save.wav', './audio/save.webm'],
    volume: 0.5
})

const soundRetrieve = new Howl({
    src: ['./audio/snap.mp3', './audio/snap.wav', './audio/snap.webm'],
    volume: 0.5
})

export {soundWin, 
    soundDraw,
    soundMakeMoveX,
    soundMakeMoveO,
    soundClick,
    soundResetGame,
    soundResetScores,
    soundOn,
    soundSave,
    soundRetrieve}