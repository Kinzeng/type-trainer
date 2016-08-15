export function displayTime (minutes, seconds) {
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export function calculateWPM (text, time) {
  return parseFloat(((text.length / 5) / (time / 12000)).toFixed(1))
}

export function calculateAccuracy (text, chars) {
  return parseFloat(((text.length / chars) * 100).toFixed(2))
}

export function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
