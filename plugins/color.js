export function color(window, undefined) {
  var b = document.querySelectorAll("body")[0];


  /*    b.addEventListener('ciick',function(e){
     fuQiang(e);
 }) */
  b.onclick = function (e) {
    fuQiang(e);
    console.log(b);
  };
  var fuArr = [];
  var arr = [
    "富强",
    "民主",
    "文明",
    "和谐",
    "自由",
    "平等",
    "公正",
    "法治",
    "爱国",
    "敬业",
    "诚信",
    "友善"
  ];
  function fuQiang(e) {
    var fontDiv = document.createElement("div");
    fontDiv.classList.add("content");
    var random = Math.floor(Math.random() * 12);
    // console.log(random);
    fontDiv.innerHTML = arr[random];
    b.appendChild(fontDiv);
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var bo = Math.floor(Math.random() * 255);
    console.log(e.offsetX, e.offsetY, e);

    fuArr.push({
      di: fontDiv,
      top: e.pageY - 20,
      left: e.pageX - 10,
      color: "rgb(" + r + "," + g + "," + bo + ")",
      opacity: 1,
      scale: 0.5
    });
    moveFont();
  }
  function moveFont() {
    for (var i = 0; i < fuArr.length; i++) {
      if (fuArr[i].opacity <= 0) {
        b.removeChild(fuArr[i].di);
        fuArr.splice(i, 1);
        return;
      }
      fuArr[i].top--;
      fuArr[i].opacity -= 0.02;
      fuArr[i].scale += 0.005;
      for (var key in fuArr[i]) {
        fuArr[i].di.style.top = fuArr[i].top + "px";
        fuArr[i].di.style.left = fuArr[i].left + "px";
        fuArr[i].di.style.color = fuArr[i].color;
        fuArr[i].di.style.opacity = fuArr[i].opacity;
        // console.log(fuArr[i].scale);
        fuArr[i].di.style.position = "absolute";
        fuArr[i].di.style.transform = "scale(" + fuArr[i].scale + ")";
        fuArr[i].di.style.zIndex = "999";
      }

      /*  console.log(fuArr[i].di.top);

   fuArr[i].di.style.top = fuArr[i].top + 'px';
    */
    }
    window.requestAnimationFrame(moveFont);
  }
}