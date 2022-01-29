const input = document.getElementById('input')
const button = document.getElementById('button')
const result = document.getElementById('result')

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-512', new TextEncoder('utf-8').encode(str))
  return Array.prototype.map.call(new Uint8Array(buf), (x, i) => {
    if (x === 255) {
      x -= i
    }
    if (x > 126) {
      x = Math.floor(x / 2) - i;
    }
    if (x < 32) {
      x += (32 + i)
    }
    if (!(x >= 32 && x <= 126)) {
      console.assert(false)
    }
    return String.fromCharCode(x)
  }).join('')
}

button.addEventListener('click', async () => {
  const val = input.value
  if (button.val !== val || button.len === 8) {
    button.len = 64
  } else {
    button.len /= 2;
  }
  button.val = val
  const p = await sha256(val)
  await navigator.clipboard.writeText(p.substr(0, button.len))
  button.style.color = 'green'
})