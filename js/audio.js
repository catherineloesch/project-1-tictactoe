//open source sound effects from pixabay (https://pixabay.com/sound-effects/)
//Howler.js library used (https://howlerjs.com/ | https://cdnjs.com/libraries/howler)

const soundWin = new Howl({
    src: ['./../assets/audio/success.mp3', './../assets/audio/success.wav', './../assets/audio/success.webm'],
    volume: 0.5
})

const soundDraw = new Howl({
    src: ['./../assets/audio/draw.mp3', './../assets/audio/draw.wav', './../assets/audio/draw.webm'],
    volume: 0.4
})

const soundMakeMove = new Howl({
    src: ['./../assets/audio/clicks.mp3', './../assets/audio/clicks.wav', './../assets/audio/clicks.webm'],
    volume: 0.5
})

const soundClick = new Howl({
    src: ['../audio/mouseClick.mp3', './audio/mouseClick.wav', './audio/mouseClick.webm'],
    volume: 0.5
})

const soundResetScores = new Howl({
    src: ['./../assets/audio/game_button.mp3', './../assets/audio/game_button.wav', './../assets/audio/game_button.webm'],
    volume: 0.5
})

const soundResetGame = new Howl({
    src: ['./../assets/audio/processing.mp3', './../assets/audio/processing.wav', './../assets/audio/processing.webm'],
    volume: 1
})

const soundOn = new Howl({
    src: ['./../assets/audio/notification.mp3', './../assets/audio/notification.wav', './../assets/audio/notification.webm'],
    volume: 0.5
})

export {soundWin, soundDraw, soundMakeMove, soundClick, soundResetGame, soundResetScores, soundOn}