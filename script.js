document.addEventListener('DOMContentLoaded', () => {
    const gift = document.querySelector('.gift');
    const textContainer = document.querySelector('.text-container');
    const arrow = document.getElementById('arrow');
    const congratulationCard = document.getElementById('congratulationCard');
    let isExploded = false;
    let isCardOpen = false;
    const arrowPath = document.getElementById('arrow-path');

    // Оптимизированная функция для создания частиц
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);

        // Используем requestAnimationFrame для плавной анимации
        let opacity = 1;
        let scale = 1;
        const animate = () => {
            if (opacity <= 0) {
                particle.remove();
                return;
            }
            opacity -= 0.02;
            scale -= 0.02;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    // Обработчик клика по подарку
    if (gift) {
        gift.addEventListener('click', () => {
            if (!isExploded) {
                isExploded = true;
                gift.style.display = 'none';
                if (textContainer) textContainer.style.display = 'block';
                if (arrow) arrow.style.display = 'block';
            }
        });
    }

    // Обработчик клика по стрелке
    if (arrow) {
        arrow.addEventListener('click', () => {
            toggleCard();
        });
    }

    function toggleCard() {
        if (!isCardOpen) {
            congratulationCard.style.display = 'block';
            arrowPath.setAttribute('d', 'M10 24L20 14L30 24');
        } else {
            congratulationCard.style.display = 'none';
            arrowPath.setAttribute('d', 'M10 16L20 26L30 16');
        }
        isCardOpen = !isCardOpen;
    }
}); 
