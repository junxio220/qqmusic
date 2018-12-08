~function () {
  let computed = () => {
    let winW = document.documentElement.clientWidth;
    let value = winW < 640 ? (winW / 640) * 100 : winW;
    document.documentElement.style.fontSize = value + 'px';
  };
  computed();
  window.addEventListener('resize', computed);
}();