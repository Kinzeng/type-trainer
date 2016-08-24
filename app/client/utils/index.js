// displays the time in a prettier format
export function displayTime (minutes, seconds) {
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

// calculate the WPM based on text length and time
// formula for WPM is (numChars / 5) / (minutes)
export function calculateWPM (text, time) {
  return parseFloat(((text.length / 5.0) / (time / 12000.0)).toFixed(1))
}

// calculate accuracy based on text length and number of characters typed by the user
export function calculateAccuracy (text, chars) {
  return parseFloat(((text.length / chars) * 100).toFixed(2))
}

// return a random int >= min and < max
export function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
