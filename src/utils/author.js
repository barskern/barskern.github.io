
export const authorInitialsFromName = (authorName) =>
  authorName
    .match(/.*?(\b\w).+?(\b\w)/)
    .slice(1)
    .join('')
    .toUpperCase()
