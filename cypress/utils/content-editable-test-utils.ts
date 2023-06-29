export const convertHTMLtoString = (htmlStr: string) => {
  return htmlStr.replace(/<[^>]*>/g, '')
}
