// butterfly-3d.js - Simple Glowing Butterfly System

const BUTTERFLY_COLORS = ['pink', 'blue', 'purple', 'gold', 'cyan'];
const BUTTERFLY_COUNT = 8;
let butterflies3D = [];
let trailEnabled = true;

class Butterfly3D {
    constructor(index) {
        this.index = index;
        this.element = this.createButterfly();
        
        // Random starting position
        this.x = Math.random() * (window.innerWidth - 100);
        this.y = Math.random() * (window.innerHeight - 100);
        
        // Velocity
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        
        // Rotation
        this.rotation = Math.random() * 360;
        
        // Scale
        this.scale = 0.85 + Math.random() * 0.3;
        
        // Target position
        this.targetX = Math.random() * window.innerWidth;
        this.targetY = Math.random() * window.innerHeight;
        this.targetTimer = 0;
        
        // Wave motion
        this.wavePhase = Math.random() * Math.PI * 2;
        this.waveSpeed = 0.015 + Math.random() * 0.015;
        
        // Trail counter
        this.trailCounter = 0;
        
        // Add to DOM
        document.body.appendChild(this.element);
        this.addEventListeners();
        
        // Show with animation
        setTimeout(() => {
            this.element.style.opacity = '1';
            this.element.style.transform = `scale(${this.scale}) rotate(${this.rotation}deg)`;
        }, 50);
        
        this.updatePosition();
    }

    createButterfly() {
        const butterfly = document.createElement('div');
        butterfly.className = `butterfly-3d ${BUTTERFLY_COLORS[this.index % BUTTERFLY_COLORS.length]}`;
        butterfly.style.opacity = '0';
        butterfly.style.transform = 'scale(0)';
        butterfly.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        butterfly.innerHTML = `
            <div class="antenna antenna-left"></div>
            <div class="antenna antenna-right"></div>
            <div class="wing-container">
                <div class="wing wing-left">
                    <div class="wing-top"></div>
                    <div class="wing-bottom"></div>
                </div>
                <div class="wing wing-right">
                    <div class="wing-top"></div>
                    <div class="wing-bottom"></div>
                </div>
            </div>
            <div class="butterfly-body"></div>
        `;
        
        return butterfly;
    }

    addEventListeners() {
        // Click to explode
        this.element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.explode();
        });

        // Hover to fly away
        this.element.addEventListener('mouseenter', () => {
            const rect = this.element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(centerY - event.clientY, centerX - event.clientX);
            const distance = 200 + Math.random() * 100;
            
            this.targetX = this.x + Math.cos(angle) * distance;
            this.targetY = this.y + Math.sin(angle) * distance;
            this.vx += Math.cos(angle) * 3;
            this.vy += Math.sin(angle) * 3;
        });
    }

    createTrail() {
        if (this.trailCounter % 4 === 0 && trailEnabled) {
            const trail = document.createElement('div');
            trail.className = 'butterfly-trail';
            trail.style.left = (this.x + 30) + 'px';
            trail.style.top = (this.y + 25) + 'px';
            
            // Match trail color to butterfly
            const colorMap = {
                pink: 'rgba(255, 120, 180, 0.9)',
                blue: 'rgba(100, 180, 255, 0.9)',
                purple: 'rgba(200, 120, 255, 0.9)',
                gold: 'rgba(255, 220, 100, 0.9)',
                cyan: 'rgba(100, 240, 240, 0.9)'
            };
            
            const color = BUTTERFLY_COLORS[this.index % BUTTERFLY_COLORS.length];
            const trailColor = colorMap[color];
            
            trail.style.background = `radial-gradient(circle, ${trailColor}, transparent)`;
            trail.style.boxShadow = `0 0 15px ${trailColor}`;
            
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 1000);
        }
        this.trailCounter++;
    }

    explode() {
        const particles = 25;
        const centerX = this.x + 30;
        const centerY = this.y + 25;

        // Color map for particles
        const colorMap = {
            pink: [340, 330, 320],
            blue: [210, 200, 220],
            purple: [280, 270, 290],
            gold: [45, 40, 50],
            cyan: [180, 190, 170]
        };
        
        const color = BUTTERFLY_COLORS[this.index % BUTTERFLY_COLORS.length];
        const hues = colorMap[color];

        // Create particles
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            const size = 3 + Math.random() * 5;
            
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.borderRadius = '50%';
            
            const hue = hues[i % hues.length];
            const lightness = 60 + Math.random() * 20;
            particle.style.background = `hsl(${hue}, 100%, ${lightness}%)`;
            particle.style.boxShadow = `0 0 15px hsl(${hue}, 100%, ${lightness}%)`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            
            document.body.appendChild(particle);
            
            // Particle animation
            const angle = (Math.PI * 2 * i) / particles;
            const velocity = 60 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 800 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }

        // Butterfly bounce effect
        this.element.animate([
            { 
                transform: `scale(${this.scale}) rotate(${this.rotation}deg)`,
                filter: 'brightness(1)'
            },
            { 
                transform: `scale(${this.scale * 1.8}) rotate(${this.rotation + 360}deg)`,
                filter: 'brightness(2)',
                offset: 0.5
            },
            { 
                transform: `scale(${this.scale}) rotate(${this.rotation + 720}deg)`,
                filter: 'brightness(1)'
            }
        ], {
            duration: 700,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
    }

    update() {
        // Wave motion for natural flight
        const time = Date.now() * 0.001;
        const waveX = Math.sin(time * this.waveSpeed + this.wavePhase) * 1.5;
        const waveY = Math.cos(time * this.waveSpeed * 1.3 + this.wavePhase) * 1;
        
        // Change target periodically (every 3 seconds)
        this.targetTimer++;
        if (this.targetTimer > 180) {
            this.targetX = Math.random() * window.innerWidth;
            this.targetY = Math.random() * window.innerHeight;
            this.targetTimer = 0;
        }
        
        // Move towards target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 10) {
            this.vx += (dx / dist) * 0.015;
            this.vy += (dy / dist) * 0.015;
        }
        
        // Add wave motion
        this.vx += waveX * 0.04;
        this.vy += waveY * 0.04;
        
        // Apply damping
        this.vx *= 0.98;
        this.vy *= 0.98;
        
        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 3) {
            this.vx = (this.vx / speed) * 3;
            this.vy = (this.vy / speed) * 3;
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce from edges with margin
        const margin = 50;
        if (this.x < -margin) {
            this.x = -margin;
            this.vx = Math.abs(this.vx) * 0.7;
            this.targetX = Math.random() * window.innerWidth * 0.8;
        }
        if (this.x > window.innerWidth - 60 + margin) {
            this.x = window.innerWidth - 60 + margin;
            this.vx = -Math.abs(this.vx) * 0.7;
            this.targetX = Math.random() * window.innerWidth * 0.8;
        }
        if (this.y < -margin) {
            this.y = -margin;
            this.vy = Math.abs(this.vy) * 0.7;
            this.targetY = Math.random() * window.innerHeight * 0.8;
        }
        if (this.y > window.innerHeight - 50 + margin) {
            this.y = window.innerHeight - 50 + margin;
            this.vy = -Math.abs(this.vy) * 0.7;
            this.targetY = Math.random() * window.innerHeight * 0.8;
        }
        
        // Smooth rotation based on velocity
        const targetRot = Math.atan2(this.vy, this.vx) * (180 / Math.PI);
        let rotDiff = targetRot - this.rotation;
        
        // Handle 360 degree wrapping
        while (rotDiff > 180) rotDiff -= 360;
        while (rotDiff < -180) rotDiff += 360;
        
        this.rotation += rotDiff * 0.1;
        
        // Create trail
        this.createTrail();
        
        // Update DOM
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.transform = `scale(${this.scale}) rotate(${this.rotation}deg)`;
    }

    destroy() {
        this.element.animate([
            { opacity: 1, transform: `scale(${this.scale})` },
            { opacity: 0, transform: 'scale(0) rotate(360deg)' }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => this.element.remove();
    }
}

// Initialize butterflies
function initButterflies3D() {
    console.log('🦋 Creating glowing butterflies...');
    
    // Clear existing
    butterflies3D.forEach(b => {
        if (b && b.element && b.element.parentNode) {
            b.element.remove();
        }
    });
    butterflies3D = [];
    
    // Create new butterflies with delay
    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
        setTimeout(() => {
            const butterfly = new Butterfly3D(i);
            butterflies3D.push(butterfly);
            console.log(`🦋 Butterfly ${i + 1}/${BUTTERFLY_COUNT} created (${BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length]})`);
        }, i * 250);
    }
}

// Animation loop
function animateButterflies3D() {
    butterflies3D.forEach(b => {
        if (b && b.update) {
            b.update();
        }
    });
    requestAnimationFrame(animateButterflies3D);
}

// Start animation loop
animateButterflies3D();

// Initialize when ready
function startButterflies() {
    console.log('✨ Starting butterfly system...');
    setTimeout(initButterflies3D, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startButterflies);
} else {
    startButterflies();
}

// Resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        butterflies3D.forEach(b => {
            if (b) {
                b.x = Math.min(Math.max(b.x, 0), window.innerWidth - 60);
                b.y = Math.min(Math.max(b.y, 0), window.innerHeight - 50);
            }
        });
    }, 200);
});

// Global controls
window.butterflies3D = {
    toggleTrail: () => {
        trailEnabled = !trailEnabled;
        console.log(`🦋 Trail: ${trailEnabled ? 'ON ✨' : 'OFF'}`);
    },
    addButterfly: () => {
        if (butterflies3D.length < 12) {
            const b = new Butterfly3D(butterflies3D.length);
            butterflies3D.push(b);
            console.log(`🦋 Added! Total: ${butterflies3D.length}`);
        } else {
            console.log('🦋 Maximum butterflies (12)');
        }
    },
    removeButterfly: () => {
        if (butterflies3D.length > 0) {
            const b = butterflies3D.pop();
            if (b) b.destroy();
            console.log(`🦋 Removed! Total: ${butterflies3D.length}`);
        }
    },
    restart: () => {
        console.log('🦋 Restarting butterfly system...');
        initButterflies3D();
    },
    getCount: () => butterflies3D.length
};

console.log('✨ Glowing Butterfly System Loaded! 🦋');