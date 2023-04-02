
// <svg> elements: open source icons from Iconify (https://iconify.design/)

//svg for sad face icon displaying on message when there's a draw
const sadFace = `<span class="draw-sad-face"> Draw! &nbsp;<svg class="icon sad-face" xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" viewBox="0 0 20 20"><g transform="translate(20 0) scale(-1 1)"><path id="no-sound-path" fill="currentColor" d="M7.5 9.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm6-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm.062 4.89a.5.5 0 0 1-.7-.075l-.003-.003a1.91 1.91 0 0 0-.137-.137a3.069 3.069 0 0 0-.507-.37c-.461-.27-1.187-.555-2.213-.555s-1.753.284-2.216.556a3.088 3.088 0 0 0-.508.37a1.92 1.92 0 0 0-.138.137l-.003.003a.5.5 0 0 1-.777-.63l.39.314l-.39-.313v-.001l.002-.001l.002-.002l.005-.006l.014-.018l.049-.054c.04-.043.098-.102.174-.17c.152-.138.375-.316.674-.491c.6-.353 1.5-.694 2.722-.694c1.221 0 2.12.34 2.72.694c.3.176.522.353.673.49a2.907 2.907 0 0 1 .222.226l.015.017l.005.006l.002.003s.001.002-.389.314l.39-.312a.5.5 0 0 1-.078.702ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></g></svg></span>`

//sound icons
//icon displaying in settings when sound is off
const noSound = '<svg class="svg icon" id="no-sound-icon" xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 24 24"><g fill="none" stroke-width="1.5"><g stroke="currentColor" clip-path="url(#iconoirSoundOff0)"><path id="no-sound-path" stroke-linecap="round" stroke-linejoin="round" d="m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2"/><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z"/></g><defs><clipPath id="iconoirSoundOff0"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>'

//icon displaying in settings when sound is on
const playSound = '<svg class="icon svg" id="play-sound-icon"  xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path id="play-sound-path "d="M1 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H3a2 2 0 0 1-2-2Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M17.5 7.5S19 9 19 11.5s-1.5 4-1.5 4m3-11S23 7 23 11.5s-2.5 7-2.5 7"/></g></svg>'


export { sadFace, noSound, playSound }
