export const keyBy = (array, propName) =>
  array.reduce((acc, curr) => {
    const key = curr[propName]
    acc[key] = curr
    return acc
  }, {})
