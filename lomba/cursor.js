// Glowing cursor trail effect
function createCursorTrail() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    let mouseX = 0;
    let mouseY = 0;
    
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const particles = [];
    
    for (let i = 0; i < 15; i++) {
        particles.push({
            x: 0,
            y: 0,
            size: Math.random() * 3 + 1,
            color: `rgba(0, 255, 255, ${Math.random() * 0.4 + 0.1})`,
            speed: Math.random() * 0.5 + 0.1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            
            particle.x += dx * particle.speed;
            particle.y += dy * particle.speed;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

window.addEventListener('load', createCursorTrail);
