(function () {
  const canvas = document.querySelector('#draw');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  let isDrawing = false;
  let isMouseDown = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = 1;

  function draw(e) {
    if (!isDrawing || !isMouseDown) return;

    console.log(e);

    if (hue === 360) hue = 0;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    if (ctx.lineWidth <= 1 || ctx.lineWidth >= 50) direction = !direction;
    if (direction) ctx.lineWidth++;
    else ctx.lineWidth--;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo((lastX = e.offsetX), (lastY = e.offsetY));
    ctx.stroke();

    hue++;
  }

  function resize() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.putImageData(imgData, 0, 0); // 隨著視窗大小調整依舊保持原本畫的東西
  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    isMouseDown = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    isMouseDown = false;
  });
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseleave', () => (isDrawing = false)); // 當滑鼠出視窗時
  canvas.addEventListener('mouseenter', (e) => {
    console.log('mouseenter', e);
    if (isMouseDown) isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  window.onresize = resize;
})();
