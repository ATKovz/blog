/**
 * @description 创建坦克实例
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string} url 
 * @param {number} w 
 * @param {number} h 
 * @param {number} frameWidth 每帧w
 * @param {number} frameHeight 每帧h
 */
const createFrames = (ctx, url, w, h, frameWidth, frameHeight) => {
  const asset = new Image()

  asset.src = url
  asset.width = w
  asset.height = h
  const DIR = {
    UP: 0,
    DOWN: 2,
    RIGHT: 1,
    LEFT: 3,
  }
  let idx = 0;
  let rowCount = 8
  let colCount = 4;
  let _dir = DIR.UP;
  let tanker_x = 0;
  let tanker_y = 0;
  const size_x = frameWidth
  const size_y = frameHeight
  const _step = 5;

  ctx.strokeStyle = 'green'
  ctx.strokeRect(0, 0, canvas_width, canvas_height)

  const checkCrashAndMove = (x, y, dir) => {

    const boundFn = {
      [DIR.UP]: () => {
        if ((tanker_y - _step) > 0) {
          tanker_y -= _step
        }
      },
      [DIR.DOWN]: () => {
        if ((tanker_y + size_y + _step) < canvas_height) {
          tanker_y += _step
        }
      },
      [DIR.RIGHT]: () => {
        if ((tanker_x + size_x + _step) < canvas_width) {
          tanker_x += _step
        }
      },
      [DIR.LEFT]: () => {
        if ((tanker_x - _step) > 0) {
          tanker_x -= _step
        }
      },
    }

    console.log('check', tanker_x, size_x, w);
    boundFn[_dir]()
  }


  const drawNext = () => {
    const _idx = idx++ % 8 || 1;
    const _y = Math.floor(_idx / rowCount % colCount)
    const _x = Math.floor(_idx % rowCount)

    ctx.save()
    ctx.resetTransform();

    // 移动就是整个图层一起移动(x, y)，旋转需要再移动到中心点(w/2, h/2)，然后绘图的时候从移动后的坦克左上角开始绘就可以(-fw/2, -fh/2)
    // 这里比较绕，就是旋转的核心

    ctx.translate(tanker_x + size_x / 2, tanker_y + size_y / 2);
    ctx.rotate(_dir * 90 * Math.PI / 180);
    const sourceX = frameWidth * _x
    const sourceY = frameHeight * _y

    checkCrashAndMove()

    ctx.drawImage(asset, sourceX, sourceY, frameWidth, frameHeight, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight)
    ctx.restore()
  }

  /** @param {DIR} dir */
  const createRotate = (dir) => () => {
    console.log('set dir');
    _dir = dir
  }

  return {
    DIR,
    drawNext,
    move: {
      left: createRotate(DIR.LEFT),
      down: createRotate(DIR.DOWN),
      up: createRotate(DIR.UP),
      right: createRotate(DIR.RIGHT),
    }
  }
}