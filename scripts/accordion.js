// Акордеон
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentNode;
            item.classList.toggle('active');
        });
    });
});