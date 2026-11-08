(() => {
  'use strict';

  const canvas = document.querySelector('#fireworks');
  const button = document.querySelector('.replay');
  const context = canvas?.getContext('2d');
  if (!canvas || !context || !button) return;

  const colors = ['#ffd264', '#ff8462', '#f64e6b', '#f7e8a4', '#bd69e4'];
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const particles = [];
  const maxParticles = 240;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let frameId = 0;
  let burstTimers = [];
  let lastFrame = 0;

  function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function burst(x, y, count = 42) {
    for (let i = 0; i < count && particles.length < maxParticles; i += 1) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.18;
      const speed = 1.1 + Math.random() * 2.7;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.011 + Math.random() * 0.014,
        size: 1 + Math.random() * 1.55,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function scheduleCelebration() {
    burstTimers.forEach(window.clearTimeout);
    burstTimers = [];
    particles.length = 0;
    burst(width * 0.2, height * 0.26, 36);
    burstTimers.push(window.setTimeout(() => burst(width * 0.79, height * 0.21, 42), 280));
    burstTimers.push(window.setTimeout(() => burst(width * 0.5, height * 0.38, 47), 650));
  }

  function draw(timestamp) {
    frameId = 0;
    if (document.hidden || motionQuery.matches) return;
    if (timestamp - lastFrame < 30 && particles.length) {
      frameId = window.requestAnimationFrame(draw);
      return;
    }
    lastFrame = timestamp;
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';

    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const particle = particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.035;
      particle.vx *= 0.992;
      particle.life -= particle.decay;
      if (particle.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      context.globalAlpha = particle.life;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size * particle.life + 0.35, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'source-over';

    if (particles.length) frameId = window.requestAnimationFrame(draw);
  }

  function startIfNeeded() {
    if (!frameId && particles.length && !document.hidden && !motionQuery.matches) {
      frameId = window.requestAnimationFrame(draw);
    }
  }

  function stop() {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    burstTimers.forEach(window.clearTimeout);
    burstTimers = [];
    particles.length = 0;
    context.clearRect(0, 0, width, height);
  }

  function onMotionPreferenceChange() {
    if (motionQuery.matches) {
      stop();
      button.hidden = true;
    } else {
      button.hidden = false;
      scheduleCelebration();
      startIfNeeded();
    }
  }

  resize();
  if (motionQuery.matches) {
    button.hidden = true;
  } else {
    scheduleCelebration();
    startIfNeeded();
    button.addEventListener('click', () => {
      scheduleCelebration();
      startIfNeeded();
    });
  }

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    } else {
      startIfNeeded();
    }
  });
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionPreferenceChange);
  else motionQuery.addListener(onMotionPreferenceChange);
})();
