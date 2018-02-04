const getHashOfText = (text) =>
  text
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)

export const hexColorFromText = (text) =>
  `#${((getHashOfText(text) * 3000) % 0xffffff).toString(16).padStart(6, 0)}`

export const namedColorFromText = (text) => {
  const possibleColors = [
    'magenta', 'red', 'volcano', 'orange', 'gold', 'lime',
    'green', 'cyan', 'blue', 'geekblue', 'purple'
  ]
  return possibleColors[getHashOfText(text) % possibleColors.length]
}
