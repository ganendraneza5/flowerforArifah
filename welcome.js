// welcome.js - JavaScript untuk Welcome Screen

let countdownInterval;
let timeLeft = 5;
const totalTime = 5;

// Function untuk masuk ke taman
function enterGarden() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    const welcomeScreen = document.getElementById('welcome-screen');
    if (!welcomeScreen) return;
    
    welcomeScreen.classList.add('hide');
    
    setTimeout(() => {
        // Redirect ke halaman flower.html
        window.location.href = 'flower.html';
    }, 1500);
}

// Function untuk update countdown bar
function updateCountdownBar(timeLeft, totalTime) {
    const bar = document.getElementById('countdown-bar');
    if (bar) {
        const percentage = (timeLeft / totalTime) * 100;
        bar.style.width = percentage + '%';
    }
}

// Initialize saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const countdownElement = document.getElementById('countdown');
    
    if (!welcomeScreen) {
        console.error('Welcome screen not found!');
        return;
    }
    
    // Pastikan welcome screen visible
    welcomeScreen.style.display = 'flex';
    
    // Initialize countdown bar
    updateCountdownBar(timeLeft, totalTime);

    // Start countdown timer
    countdownInterval = setInterval(() => {
        timeLeft -= 0.05;
        
        // Update countdown number
        if (countdownElement) {
            const displayTime = Math.ceil(timeLeft);
            if (countdownElement.textContent !== displayTime.toString() && displayTime >= 0) {
                countdownElement.textContent = displayTime;
            }
        }
        
        // Update countdown bar
        updateCountdownBar(timeLeft, totalTime);
        
        // Check if countdown finished
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            enterGarden();
        }
    }, 50);
});

// Keyboard shortcut: Press Enter or Space to skip countdown
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterGarden();
    }
});