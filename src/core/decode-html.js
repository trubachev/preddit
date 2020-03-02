export const decodeHtml = htmlEncodedStr => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(htmlEncodedStr, "text/html")
  return dom.body.textContent
}