const main = () => {


  /** @type {HTMLCanvasElement} */
  const cvs = document.querySelector('#cvs')

  const ctx = cvs.getContext('2d')


  cvs.width = 500
  cvs.height = 500

  // drawActions(ctx, [
  //   () => fillStage(ctx, 'gray'),
  //   () => rotate(ctx, 500, 200, 100, 100),
  //   () => rotate(ctx, 500, 200, 280, 190),
  //   () => rotate(ctx, 500, 200, 280, 390),
  // ])

  const tankerFrames = createFrames(ctx, './tanker_frames.png', 84 * 8, 84 * 4, 84, 84)
  
  runRaF(() => tankerFrames.drawNext(20, 50),)

  window.addEventListener('keypress', (e) => {
    const fn = {
      a: tankerFrames.move.left,
      s: tankerFrames.move.down,
      d: tankerFrames.move.right,
      w: tankerFrames.move.up,
    }
    fn[e.key]()
  })
}

main();