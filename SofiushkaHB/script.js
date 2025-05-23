document.addEventListener('DOMContentLoaded', () => {
    const gift = document.getElementById('gift');
    const birthdayText = document.getElementById('birthdayText');
    const textContainer = document.querySelector('.text-container');
    let isExploded = false;

    // Проверяем, что элементы найдены
    if (!gift || !birthdayText || !textContainer) {
        console.error('Не удалось найти необходимые элементы на странице');
        return;
    }

    // Обработчик клика по подарку
    gift.addEventListener('click', () => {
        console.log('Клик по подарку');
        if (!isExploded) {
            isExploded = true;
            gift.style.display = 'none';
            textContainer.style.display = 'block';
        }
    });
}); 