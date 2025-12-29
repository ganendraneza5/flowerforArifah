// main.js - JavaScript untuk Flower Garden dengan Welcome Screen 100% Berfungsi

let starsAdded = false;
let currentTheme = 0;
let countdownInterval;

const themes = [
  { 
    bg: '#000', 
    gradient: 'linear-gradient(90deg, rgb(0, 255, 250), rgb(240, 240, 240))' 
  },
  { 
    bg: '#0a1628', 
    gradient: 'linear-gradient(90deg, rgb(138, 43, 226), rgb(255, 20, 147))' 
  },
  { 
    bg: '#1a0033', 
    gradient: 'linear-gradient(90deg, rgb(255, 107, 107), rgb(255, 184, 77))' 
  }
];

// Function untuk masuk ke taman dengan animasi ultra smooth
function enterGarden() {
  // Clear countdown interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  const welcomeScreen = document.getElementById('welcome-screen');
  const body = document.body;
  
  if (!welcomeScreen) return;
  
  // Tambahkan class hide untuk trigger animasi smooth
  welcomeScreen.classList.add('hide');
  
  // Tunggu animasi selesai baru hapus dari DOM dan start flower animations
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    body.classList.remove("container");
    
    // Trigger animasi bunga
    triggerFlowerAnimations();
  }, 1200); // Match dengan durasi transition di CSS
}

// Function untuk trigger animasi bunga secara bertahap
function triggerFlowerAnimations() {
  const allAnimatedElements = document.querySelectorAll('.flower, .grow-ans, .growing-grass, .long-g');
  
  allAnimatedElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px) scale(0.9)';
      element.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      // Trigger reflow
      element.offsetHeight;
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
      }, 50);
    }, index * 80);
  });
}

// Function untuk update countdown bar
function updateCountdownBar(timeLeft, totalTime) {
  const bar = document.getElementById('countdown-bar');
  if (bar) {
    const percentage = (timeLeft / totalTime) * 100;
    bar.style.width = percentage + '%';
  }
}

// Jalankan saat DOM sudah siap
document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const countdownElement = document.getElementById('countdown');
  const body = document.body;
  
  // Pastikan welcome screen tampil
  if (!welcomeScreen) {
    console.error('Welcome screen not found!');
    return;
  }
  
  // Pastikan welcome screen visible
  welcomeScreen.style.display = 'flex';
  welcomeScreen.style.opacity = '1';
  welcomeScreen.style.visibility = 'visible';
  
  // Pastikan animasi bunga pause dulu
  body.classList.add('container');
  
  let timeLeft = 5;
  const totalTime = 5;
  
  // Initialize countdown bar
  updateCountdownBar(timeLeft, totalTime);

  // Countdown timer dengan smooth animation
  countdownInterval = setInterval(() => {
    timeLeft -= 0.05; // Update setiap 50ms
    
    // Update angka countdown
    if (countdownElement) {
      const displayTime = Math.ceil(timeLeft);
      if (countdownElement.textContent !== displayTime.toString() && displayTime >= 0) {
        countdownElement.textContent = displayTime;
        
        // Tambahkan bounce effect pada angka
        countdownElement.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        countdownElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
          countdownElement.style.transform = 'scale(1)';
        }, 200);
      }
    }
    
    // Update progress bar
    updateCountdownBar(timeLeft, totalTime);
    
    // Check if countdown finished
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      enterGarden();
    }
  }, 50); // Update every 50ms for smooth animation
});

// Toggle controls panel dengan smooth animation
function toggleControls() {
  const panel = document.getElementById('controlsPanel');
  if (panel) {
    panel.classList.toggle('active');
  }
}

// Change animation speed dengan smooth transition
function changeSpeed(value) {
  const speed = parseFloat(value);
  const elements = document.querySelectorAll('.flower, .flower__light, .flower__line, .flower__leafs, .grow-ans, .growing-grass, .long-g .leaf');
  
  elements.forEach(el => {
    const animations = el.getAnimations();
    animations.forEach(anim => {
      if (anim.playbackRate !== undefined) {
        anim.playbackRate = speed;
      }
    });
  });
  
  showNotification(`âš¡ Kecepatan: ${(speed * 100).toFixed(0)}%`);
}

// Change scale dengan smooth transition
function changeScale(value) {
  const flowers = document.querySelector('.flowers');
  if (flowers) {
    flowers.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    flowers.style.transform = `scale(${value})`;
    
    showNotification(`ðŸ” Ukuran: ${(value * 100).toFixed(0)}%`);
  }
}

// Add stars to the sky dengan animasi muncul bertahap
function addStars() {
  if (starsAdded) {
    showNotification('âœ¨ Bintang sudah ditambahkan sebelumnya!');
    return;
  }
  
  const night = document.querySelector('.night');
  if (!night) return;
  
  showNotification('âœ¨ Menambahkan bintang...');
  
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.opacity = '0';
      star.style.transform = 'scale(0)';
      star.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      night.appendChild(star);
      
      setTimeout(() => {
        star.style.opacity = '1';
        star.style.transform = 'scale(1)';
      }, 50);
    }, i * 15);
  }
  
  starsAdded = true;
  
  setTimeout(() => {
    showNotification('âœ¨ Bintang berhasil ditambahkan!');
  }, 1600);
}

// Change theme dengan smooth transition
function changeTheme() {
  currentTheme = (currentTheme + 1) % themes.length;
  const theme = themes[currentTheme];
  
  // Smooth color transition
  document.documentElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  document.documentElement.style.setProperty('--dark-color', theme.bg);
  document.body.style.backgroundColor = theme.bg;
  
  const night = document.querySelector('.night');
  if (night) {
    night.style.transition = 'background-image 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    night.style.backgroundImage = `
      radial-gradient(ellipse at top, transparent 0%, ${theme.bg}),
      radial-gradient(ellipse at bottom, ${theme.bg}, rgba(145, 233, 255, 0.2)),
      repeating-linear-gradient(220deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 19px, transparent 19px, transparent 22px),
      repeating-linear-gradient(189deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 19px, transparent 19px, transparent 22px),
      repeating-linear-gradient(148deg, rgb(0, 0, 0) 0px, rgb(0, 0, 0) 19px, transparent 19px, transparent 22px),
      ${theme.gradient}
    `;
  }
  
  const themeNames = ['ðŸŒ™ Tema Default', 'ðŸŒ™ Tema Ungu', 'ðŸŒ™ Tema Merah'];
  showNotification(`${themeNames[currentTheme]} aktif!`);
}

// Show notification dengan smooth animation
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector('.custom-notification');
  if (existing) {
    existing.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => existing.remove(), 300);
  }
  
  // Create new notification after delay
  setTimeout(() => {
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, rgba(78, 205, 196, 0.95), rgba(69, 183, 209, 0.95));
      color: white;
      padding: 15px 25px;
      border-radius: 15px;
      font-weight: 600;
      z-index: 1000;
      animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 2.5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => notification.remove(), 400);
    }, 2500);
  }, existing ? 350 : 0);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    0% {
      transform: translateX(400px);
      opacity: 0;
    }
    60% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent animation interruption on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const flowers = document.querySelector('.flowers');
    if (flowers) {
      flowers.style.transition = 'transform 0.3s ease';
    }
  }, 100);
});

// Prevent page reload on Enter key in controls
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
  }
});