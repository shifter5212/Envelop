// Create Ultra Sparkles
for (var i = 0; i < 80; i++) {
  var sparkle = document.createElement('div');
  sparkle.classList.add('ultra-sparkle');
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.animationDelay = Math.random() * 3 + 's';
  sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
  document.body.appendChild(sparkle);
}

// Create Floating Particles
for (var i = 0; i < 30; i++) {
  var particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (15 + Math.random() * 10) + 's';
  particle.style.animationDelay = Math.random() * 5 + 's';
  document.body.appendChild(particle);
}

var envelopeWrapper = document.getElementById('envelopeWrapper');
var envelopeScreen = document.getElementById('envelopeScreen');
var mainContent = document.getElementById('mainContent');
var bgMusic = document.getElementById('bgMusic');

envelopeWrapper.addEventListener('click', function() {
  envelopeWrapper.classList.add('opening');
  setTimeout(function() {
    envelopeScreen.classList.add('hidden');
    mainContent.classList.add('visible');
    bgMusic.play().catch(function(e) { console.log('Music autoplay prevented:', e); });
    startHearts();
  }, 1200);
});

var musicControl = document.getElementById('musicControl');
var isPlaying = false;

musicControl.addEventListener('click', function() {
  if (isPlaying) {
    bgMusic.pause();
    musicControl.textContent = '🎵';
  } else {
    bgMusic.play();
    musicControl.textContent = '🔊';
  }
  isPlaying = !isPlaying;
});

bgMusic.addEventListener('play', function() { isPlaying = true; musicControl.textContent = '🔊'; });
bgMusic.addEventListener('pause', function() { isPlaying = false; musicControl.textContent = '🎵'; });

function startHearts() {
  var container = document.getElementById('heartsContainer');
  var colors = ['#2196f3','#1976d2','#1565c0','#42a5f5','#64b5f6','#90caf9'];

  function createHeart() {
    var h = document.createElement('div');
    h.classList.add('heart-float');
    h.innerHTML = '&#10084;';
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = (18 + Math.random() * 25) + 'px';
    h.style.animationDuration = (12 + Math.random() * 18) + 's';
    h.style.animationDelay = Math.random() * 4 + 's';
    h.style.color = colors[Math.floor(Math.random() * 6)];
    container.appendChild(h);
    setTimeout(function() { h.remove(); }, 30000);
  }

  for (var i = 0; i < 25; i++) setTimeout(createHeart, i * 500);
  setInterval(createHeart, 2500);
}

var lightbox = document.getElementById('lightbox');
var lightboxContent = document.getElementById('lightboxContent');
var lightboxClose = document.getElementById('lightboxClose');
var galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(function(item) {
  item.addEventListener('click', function() {
    var type = item.getAttribute('data-type');
    var src = item.getAttribute('data-src');
    if (src) {
      lightboxContent.innerHTML = '';
      if (type === 'video') {
        var video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        lightboxContent.appendChild(video);
      } else {
        var img = document.createElement('img');
        img.src = src;
        lightboxContent.appendChild(img);
      }
      lightbox.classList.add('active');
    }
  });
});

lightboxClose.addEventListener('click', function() {
  lightbox.classList.remove('active');
  lightboxContent.innerHTML = '';
});

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxContent.innerHTML = '';
  }
});

var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reason-card').forEach(function(c, index) {
  c.style.opacity = '0';
  c.style.transform = 'translateY(40px)';
  c.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ' + (index * 0.1) + 's';
  obs.observe(c);
});
