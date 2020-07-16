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
export function currentTo() {
  return document.documentElement.scrollTop || document.body.scrollTop
}

function move(amount) {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

/**
 * @param {number} to  --> 目标值
 * @param {number} duration --> 持续时间
 * @param {Function} callback --> 回调函数
 */

export function scrollTo(to, duration = 500, callback) {
  const start = currentTo()
  const change = to - start

  // 增加时间量
  const increment = 20
  // 累计时间量
  let currentTime = 0
  const animateScroll = function () {
    currentTime += increment
    const val = easeBoth(currentTime, start, change, duration)
    move(val)
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else if (callback && typeof (callback) === 'function') {
      // 动画完成执行回调
      callback()
    }
  }
  animateScroll()
}