// Слайдер
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideButtons = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        
        // Оновлюємо активну кнопку
        slideButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Обробники кліків для кнопок слайдера
    slideButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автоматичне перемикання слайдів
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideButtons.length;
        showSlide(currentSlide);
    }, 5000);
});