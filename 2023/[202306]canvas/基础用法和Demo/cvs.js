const main = () => {


  /** @type {HTMLCanvasElement} */
  const cvs = document.querySelector('#cvs')

  const ctx = cvs.getContext('2d')


  cvs.width = 500
  cvs.height = 500

  drawActions(ctx, [
    () => fillStage(ctx, 'gray'),
    () => rotate(ctx, 500, 200),
  ])
  // drawActions(ctx, [
  //   () => rotate(ctx, 500, 200, 80, 90),
  // ])



}

main();