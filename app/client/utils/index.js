export function calculateWPM (text, time) {
  return ((text.length / 5) / (time / 6000)).toFixed(1)
}

export function calculateAccuracy (text, chars) {
  return `${((text.length / chars) * 100).toFixed(2)}%`
}
