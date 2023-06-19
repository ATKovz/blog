const runRaF = (fn) => {
  requestAnimationFrame(async () => {
    await fn()
    runRaF(fn)
  })
}
/**
 * @param {CanvasRenderingContext2D} ctx 
 */
const reset = async (ctx) => {
  // await (sleep(3000))
  ctx.resetTransform()
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, cvs.width, cvs.height)
}
/**
 * @param {CanvasRenderingContext2D} ctx 
 */
const move = (ctx, dir, step, deg) => {
  const y = - dir * Math.tan(deg * (Math.PI / 180))
  ctx.translate(dir, y)
  const shouldBack = dir > 0 && step > 50
  const shouldForward = dir < 0 && step < 0
  if (shouldBack || shouldForward) {
    return - dir
  }
  return dir
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 */
const drawBezier = (ctx) => {

  // 需要使用 beginPath防止和之前的 clip 或者类似操作叠加导致 stroke 把之前的上下文一起填充了
  // beginPath 会清除之前的画线context，避免污染之前的，如果需要切换上下文，可以通过自行存储的形式执行
  ctx.beginPath();
  ctx.strokeStyle = 'yellow'
  ctx.lineWidth = 5
  ctx.strokeRect(0, 0, 100, 100)

  ctx.save()

  ctx.fillStyle = 'blue'
  ctx.strokeStyle = 'red'
  ctx.moveTo(0, 0)
  // ctx.bezierCurveTo(0, 125, 300, 125, 150, 300)
  ctx.quadraticCurveTo(120, 125, 200, 50)
  // stroke 画线，fill 填充起始点链接后的路径闭合
  ctx.stroke()

  ctx.restore()

  // ctx.fill()
  
  console.log('draw');
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 */
const rotate = (ctx, w, h, px = w, py = h) => {
  const img = new Image(w, h)
  img.width = w;
  img.height = h;
  img.src = 'http://192.168.3.139:8080/1.png'

  img.onload = () => {
    const halfWidth = px / 2
    const halfHeight = py / 2
    // const draw = () => ctx.drawImage(img, 0, 0, 500, 200, -halfWidth, -halfHeight, 500, 200)
    const draw = () => ctx.drawImage(img, -halfWidth, -halfHeight, w, h)
    
    ctx.translate(halfWidth, halfHeight)
    runRaF(() => {

      ctx.rotate(1 * Math.PI / 180)
      draw()
      console.log('dar');
    })
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx 
 */
const fillStage = (ctx, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 9999, 9999)

}
/**
 * @param {CanvasRenderingContext2D} ctx 
 */
const clip = (ctx, x, y, w, h) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h)
  ctx.clip()
  // ctx.restore()
}

const drawActions = (ctx, list) => {
  ctx.save()
  list.forEach(fn => fn()) 
  ctx.restore()
}