const input = document.getElementById('input')
const button = document.getElementById('button')

try {
  const a = navigator.clipboard + crypto.subtle;
  Object(a)
} catch (err) {
  alert('当前环境不支持')
}

window.onerror = () => {
  alert('页面出错')
}

window.addEventListener('unhandledrejection', () => {
  alert('页面出错')
})
async function en(str) {
  const buf = await crypto.subtle.digest('SHA-512', new TextEncoder('utf-8').encode(str))
  return Array.prototype.map.call(new Uint8Array(buf), (x, i) => {
    if (x > 126) {
      x = Math.floor(x / 2) - i - 1;
    }
    if (x < 32) {
      x += (32 + i)
    }
    return String.fromCharCode(x)
  }).join('')
}

button.addEventListener('click', async (evt) => {
  const val = input.value
  if (!val || !evt.isTrusted) return
  if (button.val !== val || button.len === 8) {
    button.len = 64
    button.value = 'Start'
  } else {
    button.len /= 2;
    button.value = 'start'
  }
  button.val = val
  const p = await en(val)
  await navigator.clipboard.writeText(p.substr(0, button.len))
  button.style.color = 'green'
  document.getElementById('result').textContent = p
})
