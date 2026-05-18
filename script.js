document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Развертывание текста "О банке"
    const detailsBtn = document.getElementById('about-details-btn');
    const expandedText = document.getElementById('about-expanded-text');

    if (detailsBtn) {
        detailsBtn.addEventListener('click', function() {
            const isActive = expandedText.classList.toggle('active');
            this.innerHTML = isActive 
                ? 'Свернуть <span class="arrow">↑</span>' 
                : 'Подробнее <span class="arrow">↓</span>';
        });
    }

    // 2. FAQ Аккордеон (разворачивание колонок)
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // 3. Табы (Достижения / Работа)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // 4. Dropdown Menu (если не было добавлено раньше)
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        function setupDropdownBehavior() {
            if (window.innerWidth <= 992) { // Порог для мобильных
                dropdownToggle.removeEventListener('click', handleDesktopDropdown); // Удаляем старый, если был
                dropdownToggle.addEventListener('click', handleMobileDropdown);
                document.addEventListener('click', handleClickOutsideDropdown);
            } else {
                dropdownToggle.removeEventListener('click', handleMobileDropdown); // Удаляем мобильный
                dropdown.classList.remove('active'); // Скрываем при переходе на десктоп
                document.removeEventListener('click', handleClickOutsideDropdown);
            }
        }

        function handleMobileDropdown(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }

        function handleDesktopDropdown(e) { /* заглушка */ }

        function handleClickOutsideDropdown(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        }

        setupDropdownBehavior();
        window.addEventListener('resize', setupDropdownBehavior);
    }
});
