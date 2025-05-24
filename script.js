document.addEventListener('DOMContentLoaded', () => {
    const gift = document.querySelector('.gift');
    const giftBubbleWrapper = document.querySelector('.gift-bubble-wrapper');
    const textContainer = document.getElementById('textContainer');
    const arrow = document.getElementById('arrow');
    const arrowPath = document.getElementById('arrowPath');
    const congratulationCard = document.getElementById('congratulationCard');
    let isExploded = false;
    let isCardOpen = false;

    function createFirework(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#ff69b4', '#00ffff', '#ffa500'];
        const particleCount = 80;

        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.top = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.color = color;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            container.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let life = 80;
            function animate() {
                if (life <= 0) {
                    particle.remove();
                    if (container.children.length === 0) {
                        container.remove();
                    }
                    return;
                }
                const currentX = parseFloat(particle.style.left);
                const currentY = parseFloat(particle.style.top);
                particle.style.left = (currentX + vx) + 'px';
                particle.style.top = (currentY + vy) + 'px';
                particle.style.opacity = life / 80;
                life--;
                requestAnimationFrame(animate);
            }
            animate();
        }
    }

    function showText() {
        if (isExploded) return;
        isExploded = true;
        
        giftBubbleWrapper.style.display = 'none';
        textContainer.style.display = 'block';
        arrow.classList.add('arrow--visible');

        // Создаем начальные фейерверки
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 300);
        }

        // Продолжаем создавать фейерверки
        setInterval(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, 2000);
    }

    function toggleCard() {
        if (!isCardOpen) {
            congratulationCard.style.display = 'block';
            congratulationCard.scrollIntoView({ behavior: 'smooth' });
            arrowPath.setAttribute('d', 'M10 24L20 14L30 24');
            document.querySelector('.birthday-photo').classList.add('blurred');
            document.querySelector('.name').classList.add('blurred');
            document.querySelector('.birthday-text').classList.add('blurred');
        } else {
            congratulationCard.style.display = 'none';
            arrowPath.setAttribute('d', 'M10 16L20 26L30 16');
            document.querySelector('.birthday-photo').classList.remove('blurred');
            document.querySelector('.name').classList.remove('blurred');
            document.querySelector('.birthday-text').classList.remove('blurred');
        }
        isCardOpen = !isCardOpen;
    }

    if (gift) {
        gift.addEventListener('click', showText);
    }

    if (arrow) {
        arrow.addEventListener('click', toggleCard);
    }
}); 
