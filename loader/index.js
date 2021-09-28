export default function imgLoader ({ src, width, quality }){
  return `https://img.haoolee.com/${src}?x-oss-process=image/resize,w_${width}/quality,q_${quality || 75}`
}
