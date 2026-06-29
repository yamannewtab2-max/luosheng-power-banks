// ═══════════════════════════════════════════
//  LUOSHENG POWER BANKS — Premium Interactions
// ═══════════════════════════════════════════

// ═══ HERO PARALLAX ═══
const heroBg = document.querySelector('.hero__bg')
addEventListener('scroll', () => {
  if (heroBg) {
    const scrolled = window.scrollY
    const maxScroll = window.innerHeight
    const scale = 1.05 + (scrolled / maxScroll) * 0.12
    heroBg.style.transform = `scale(${Math.min(scale, 1.35)})`
    // Subtle opacity shift for overlay
    const overlay = document.querySelector('.hero__vignette')
    if (overlay) {
      overlay.style.opacity = 1 - (scrolled / maxScroll) * 0.3
    }
  }
})

// ═══ SCROLL REVEAL ═══
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ═══ COUNTER ANIMATION ═══
function animateCounter(el, target, duration = 2000) {
  const start = performance.now()
  const suffix = el.dataset.suffix || ''
  
  function formatNum(n) {
    return n.toLocaleString('en-US')
  }
  
  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target)
    
    el.textContent = formatNum(current) + suffix
    
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      el.textContent = formatNum(target) + suffix
    }
  }
  requestAnimationFrame(update)
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target
      const target = parseInt(el.dataset.target)
      if (!isNaN(target)) {
        animateCounter(el, target)
      }
      statObserver.unobserve(el)
    }
  })
}, { threshold: 0.5 })

document.querySelectorAll('.about__stat-num:not([data-no-count])').forEach(el => {
  const text = el.textContent.trim()
  const cleaned = text.replace(/[^0-9.]/g, '')
  const target = parseFloat(cleaned)
  if (!isNaN(target)) {
    const suffix = text.replace(/[0-9.,]/g, '')
    el.dataset.target = target
    el.dataset.suffix = suffix
    el.textContent = '0' + suffix
    statObserver.observe(el)
  }
})

// ═══ COMING SOON MODAL ═══
function openComingSoon() {
  const modal = document.getElementById('comingSoonModal')
  if (modal) {
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '15px' // prevent layout shift
  }
}
function closeComingSoon(e) {
  if (e && e.target !== e.currentTarget) return
  const modal = document.getElementById('comingSoonModal')
  if (modal) {
    modal.classList.remove('active')
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('comingSoonModal')
    if (modal && modal.classList.contains('active')) {
      modal.classList.remove('active')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }
})
