function easeBoth(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return c / 2 * t * t + b
  }
  return -c / 2 * ((--t) * (t - 2) - 1) + b
}

// 兼容性写法
const requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

// 获取当前值
export function currentTo(obj, objfath) {
  return objfath.scrollTop || obj.scrollTop
}

function move(obj, objfath, amount) {
  objfath.scrollTop = amount
  objfath.scrollTop = amount
  obj.scrollTop = amount
}

/**
 * @param {number} to  --> 目标值
 * @param {number} duration --> 持续时间
 * @param {Function} callback --> 回调函数
 */

export function scrollTo(obj, objfath, to, duration = 500, callback) {
  const start = currentTo(obj, objfath)
  const change = to - start
  console.log('触发');
  // 增加时间量
  const increment = 20
  // 累计时间量
  let currentTime = 0
  const animateScroll = function () {
    currentTime += increment
    const val = easeBoth(currentTime, start, change, duration)
    move(obj, objfath, val)
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else if (callback && typeof (callback) === 'function') {
      // 动画完成执行回调
      callback()
    }
  }
  animateScroll()
}