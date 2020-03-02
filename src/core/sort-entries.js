export const sortEntries = entries =>
  entries.sort((a, b) => {
    if (a.stickied && b.stickied) {
      return b.created - a.created
    }

    if (a.stickied) {
      return -1
    }

    if (b.stickied) {
      return 1
    }

    return b.created - a.created
  })
