// effects.js - Tambahkan fireflies dan butterflies

// Tambahkan fireflies (kunang-kunang)
function addFireflies() {
    const container = document.querySelector('.night') || document.body;
    const fireflyCount = 20;
    
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.bottom = Math.random() * 50 + 20 + '%';
        firefly.style.animationDelay = Math.random() * 8 + 's';
        firefly.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(firefly);
    }
}

// Tambahkan butterflies (kupu-kupu)
function addButterflies() {
    const container = document.querySelector('.flowers') || document.body;
    const butterflyEmojis = ['🦋', '🦋', '🦋'];
    const butterflyCount = 5;
    
    for (let i = 0; i < butterflyCount; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.textContent = butterflyEmojis[Math.floor(Math.random() * butterflyEmojis.length)];
        butterfly.style.left = Math.random() * 30 + '%';
        butterfly.style.bottom = Math.random() * 40 + 30 + '%';
        butterfly.style.animationDelay = Math.random() * 12 + 's';
        butterfly.style.animationDuration = (12 + Math.random() * 6) + 's';
        container.appendChild(butterfly);
    }
}

// Tambahkan interaksi hover pada bunga
function addFlowerInteractions() {
    const flowers = document.querySelectorAll('.flower');
    
    flowers.forEach((flower, index) => {
        flower.addEventListener('mouseenter', function() {
            this.style.transform = `scale(1.15) translateY(-10px) rotate(${index * 5}deg)`;
            
            // Tambahkan particle explosion
            createParticleExplosion(this);
        });
        
        flower.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        flower.addEventListener('click', function() {
            // Animasi klik
            this.style.transform = 'scale(1.2) translateY(-15px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Tambahkan banyak particles
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createParticleExplosion(this);
                }, i * 50);
            }
        });
    });
}

// Buat particle explosion saat hover
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        particle.style.boxShadow = `0 0 10px currentColor`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 50 + Math.random() * 50;
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
            duration: 1000,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Tambahkan bintang jatuh secara random
function addShootingStars() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const star = document.createElement('div');
            star.style.position = 'fixed';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.boxShadow = '0 0 6px 2px white';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 30 + '%';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '1';
            
            document.body.appendChild(star);
            
            star.animate([
                { 
                    transform: 'translate(0, 0)', 
                    opacity: 1 
                },
                { 
                    transform: 'translate(-200px, 200px)', 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'ease-in'
            }).onfinish = () => star.remove();
        }
    }, 3000);
}

// Inisialisasi semua efek setelah DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu sedikit agar halaman ter-render sempurna
    setTimeout(() => {
        addFireflies();
        addButterflies();
        addFlowerInteractions();
        addShootingStars();
        
        console.log('✨ Enhanced effects loaded!');
    }, 1000);
});