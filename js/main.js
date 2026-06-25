// ===== Header scroll state =====
const header = document.getElementById('header');
const logo = document.querySelector('[data-logo]');
const navLinks = document.querySelectorAll('[data-navlink]');
const bars = document.querySelectorAll('[data-bar]');

const scrolledClasses = ['bg-white/90', 'backdrop-blur-md', 'shadow-soft', 'py-2.5'];
const onScroll = () => {
  const s = window.scrollY > 30;
  header.classList.toggle('py-4', !s);
  scrolledClasses.forEach((c) => header.classList.toggle(c, s));
  logo.classList.toggle('text-white', !s);
  logo.classList.toggle('text-navy', s);
  navLinks.forEach((a) => {
    a.classList.toggle('text-white/90', !s);
    a.classList.toggle('text-muted', s);
    a.classList.toggle('hover:text-navy', s);
  });
  bars.forEach((b) => {
    b.classList.toggle('bg-white', !s);
    b.classList.toggle('bg-navy', s);
  });
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile nav drawer =====
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const setDrawer = (open) => {
  mobileNav.classList.toggle('translate-x-full', !open);
  mobileNav.classList.toggle('translate-x-0', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
};
navToggle.addEventListener('click', () =>
  setDrawer(mobileNav.classList.contains('translate-x-full'))
);
document.querySelectorAll('[data-mlink]').forEach((a) =>
  a.addEventListener('click', () => setDrawer(false))
);

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
  io.observe(el);
});

// ===== Animated counters =====
const counters = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('ko-KR');
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('ko-KR');
  };
  requestAnimationFrame(step);
};
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => counterIO.observe(c));

// ===== Quote form (front-end demo) =====
const form = document.getElementById('quoteForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').trim();
  const phone = (data.get('phone') || '').trim();
  const email = (data.get('email') || '').trim();

  const setNote = (msg, ok) => {
    note.textContent = msg;
    note.classList.remove('text-[#0a8f5b]', 'text-[#d14343]');
    note.classList.add(ok ? 'text-[#0a8f5b]' : 'text-[#d14343]');
  };

  if (!name || !phone || !email) {
    setNote('이름, 연락처, 이메일은 필수 항목입니다.', false);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setNote('올바른 이메일 주소를 입력해주세요.', false);
    return;
  }

  setNote(`${name}님, 견적 요청이 접수되었습니다. 영업일 기준 24시간 이내에 연락드리겠습니다.`, true);
  form.reset();
});
