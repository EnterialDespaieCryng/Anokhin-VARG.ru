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

    // 2. FAQ Аккордеон
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

    // 4. Мобильное меню (гамбургер) — полная замена старого dropdown кода
    
    // Создаём кнопку гамбургера, если её нет в HTML
    const headerContainer = document.querySelector('.header .container');
    let mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!mobileToggle && headerContainer) {
        mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        // Вставляем после utility-nav
        const utilityNav = document.querySelector('.utility-nav');
        if (utilityNav) {
            utilityNav.after(mobileToggle);
        } else {
            headerContainer.appendChild(mobileToggle);
        }
    }
    
    // Создаём оверлей, если его нет
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    const mainNav = document.querySelector('.main-nav');
    
    // Функция закрытия меню
    function closeMenu() {
        if (mainNav) mainNav.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = ''; // возвращаем скролл страницы
    }
    
    // Функция открытия меню
    function openMenu() {
        if (mainNav) mainNav.classList.add('active');
        if (mobileToggle) mobileToggle.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // блокируем скролл страницы при открытом меню
    }
    
    // Обработчик клика по гамбургеру
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    // Закрытие по клику на оверлей
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Обработка дропдауна в мобильном меню
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        // Убираем старую логику с resize, добавляем мобильную
        dropdownToggle.addEventListener('click', function(e) {
            // Работает только на мобильных устройствах (ширина <= 992)
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            }
        });
    }
    
    // Закрываем меню при клике на ссылку (опционально)
    const allNavLinks = document.querySelectorAll('.main-nav a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Не закрываем, если это ссылка с якорем или пустой href
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                if (window.innerWidth <= 992) {
                    closeMenu();
                }
            }
        });
    });
    
    // При изменении размера окна закрываем меню, если стали десктопом
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMenu();
            if (dropdown) dropdown.classList.remove('active');
        }
    });
});
