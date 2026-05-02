/* =============================================
   ARSLAN PORTFOLIO — script.js
   Full JS functionality
   ============================================= */

// ── 1. YEAR
document.getElementById('year').textContent = new Date().getFullYear();


// ── 2. HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    }
});


// ── 3. NAVBAR: shrink on scroll + active link highlight
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Shrink navbar
    if (window.scrollY > 60) {
        navbar.style.padding = window.innerWidth <= 768 ? '12px 20px' : '12px 40px';
    } else {
        navbar.style.padding = window.innerWidth <= 768 ? '14px 20px' : '20px 60px';
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.getAttribute('id');
        }
    });
    navAs.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });

    // Back-to-top button
    const btt = document.getElementById('back-to-top');
    if (btt) {
        btt.classList.toggle('show', window.scrollY > 400);
    }
});


// ── 4. SKILL BARS ANIMATION on scroll
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.width + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ── 5. SCROLL REVEAL for sections & cards
const revealEls = document.querySelectorAll(
    'section, .project-card, .skill-card, .stat, .contact-item, .about-text, .about-image-box'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger cards slightly
            const delay = entry.target.classList.contains('project-card') ||
                entry.target.classList.contains('skill-card') ? i * 60 : 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});


// ── 6. BACK TO TOP BUTTON (create dynamically)
const bttBtn = document.createElement('button');
bttBtn.id = 'back-to-top';
bttBtn.title = 'Back to top';
bttBtn.innerHTML = '↑';
document.body.appendChild(bttBtn);

bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── 7. SMOOTH SCROLL for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70; // navbar height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


// ── 8. PROJECT CARDS — subtle tilt effect on desktop
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
        card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});


// ── 9. SKILL CARDS — glow on hover
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 24px rgba(0,229,160,0.15)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});


// ── 10. CONTACT ITEMS — copy to clipboard on click
document.querySelectorAll('.contact-item').forEach(item => {
    const strong = item.querySelector('strong');
    if (!strong) return;
    const value = strong.textContent.trim();

    // Only copy for email (starts with letters and has @)
    if (!value.includes('@')) return;

    item.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(value).then(() => {
            showToast('Email copied! ✓');
        }).catch(() => {
            window.location.href = 'mailto:' + value;
        });
    });
});


// ── 11. TOAST NOTIFICATION
function showToast(msg) {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        toast.style.cssText = `
      position: fixed;
      bottom: 5rem;
      right: 1.5rem;
      background: #16161f;
      border: 1px solid var(--accent, #00e5a0);
      color: var(--accent, #00e5a0);
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      font-family: 'DM Sans', sans-serif;
      z-index: 9000;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      pointer-events: none;
    `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 2500);
}


// ── 12. TYPING EFFECT on hero .line2
const typingEl = document.querySelector('.hero h1 .line2');
if (typingEl) {
    const words = ['Front-End Developer', 'React Developer', 'UI Builder', 'Web Designer'];
    let wIndex = 0;
    let cIndex = 0;
    let deleting = false;

    // Add cursor
    const cursor = document.createElement('span');
    cursor.style.cssText = `
    display: inline-block;
    width: 3px;
    height: 0.85em;
    background: #00e5a0;
    margin-left: 4px;
    vertical-align: middle;
    animation: blink 0.9s step-end infinite;
  `;

    // Inject blink keyframe once
    if (!document.getElementById('blink-style')) {
        const s = document.createElement('style');
        s.id = 'blink-style';
        s.textContent = '@keyframes blink { 50% { opacity:0; } }';
        document.head.appendChild(s);
    }

    function type() {
        const word = words[wIndex];
        const speed = deleting ? 60 : 110;
        const pause = deleting && cIndex === 0 ? 500 : (!deleting && cIndex === word.length ? 1800 : speed);

        typingEl.textContent = word.substring(0, cIndex);
        typingEl.appendChild(cursor);

        if (!deleting && cIndex < word.length) {
            cIndex++;
        } else if (!deleting && cIndex === word.length) {
            deleting = true;
        } else if (deleting && cIndex > 0) {
            cIndex--;
        } else {
            deleting = false;
            wIndex = (wIndex + 1) % words.length;
            cIndex = 0;
        }

        setTimeout(type, pause);
    }

    // Start after 1s delay
    setTimeout(type, 1000);
}