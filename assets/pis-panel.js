// Hovering the banner's PIs cell drops a small panel: each PI's page (Tian maintains this site).
(() => {
  const header = document.querySelector('.site-header')
  const cell = [...document.querySelectorAll('.banner a')].find((a) => a.querySelector('.label') && a.querySelector('.label').textContent.trim() === 'PIs')
  if (!header || !cell || !matchMedia('(hover: hover)').matches) return

  const panel = document.createElement('div')
  panel.className = 'pis-panel'
  panel.id = 'pis-panel'
  panel.hidden = true
  panel.innerHTML = [
    '<p class="pis-note">page maintainer</p>',
    '<p><span class="pis-name">PI Tian</span><span class="links quiet"><a href="https://jti.one/">page</a><a href="https://mercury-hpg.github.io/">lab</a></span></p>',
    '<p><span class="pis-name">PI Di</span><span class="links quiet"><a href="https://www.mcs.anl.gov/~shdi/">page</a></span></p>',
    '<p><span class="pis-name">PI Zhang</span><span class="links quiet"><a href="https://chengmingzh8.github.io/">page</a></span></p>',
  ].join('')
  header.append(panel)
  cell.setAttribute('aria-controls', panel.id)
  cell.setAttribute('aria-expanded', 'false')

  const place = () => {
    const r = cell.getBoundingClientRect()
    const w = panel.offsetWidth
    panel.style.left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)) + 'px'
  }
  let timer = 0
  const open = () => {
    clearTimeout(timer)
    panel.hidden = false
    place()
    cell.setAttribute('aria-expanded', 'true')
  }
  const close = () => {
    clearTimeout(timer)
    panel.hidden = true
    cell.setAttribute('aria-expanded', 'false')
  }
  const later = () => { clearTimeout(timer); timer = setTimeout(close, 160) }

  for (const el of [cell.parentElement, panel]) {
    el.addEventListener('mouseenter', open)
    el.addEventListener('mouseleave', later)
  }
  cell.addEventListener('focus', open)
  panel.addEventListener('focusout', (e) => { if (!panel.contains(e.relatedTarget) && e.relatedTarget !== cell) later() })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
})()
