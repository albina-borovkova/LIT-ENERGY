document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница политики конфиденциальности загружена');
    
    //Активная навигация при прокрутке
    const sections = document.querySelectorAll('.privacy-article');
    const navLinks = document.querySelectorAll('.nav-link');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        // Обновляем навигационные ссылки
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
        
        // Обновляем оглавление
        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Плавная прокрутка к разделам
    function smoothScroll(target, event) {
        if (event) {
            event.preventDefault();
        }
        
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Навигационные ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            smoothScroll(target, e);
        });
    });
    
    // Ссылки в оглавлении
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            smoothScroll(target, e);
        });
    });
    
    //Кнопка "Вернуться наверх"
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    //Скачивание PDF (демо)
    const pdfBtn = document.querySelector('.btn-download-pdf');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('PDF версия будет доступна в ближайшее время. Пока вы можете распечатать эту страницу.');
        });
    }
    
    //Печать страницы
    const printBtn = document.querySelector('.btn-download-print');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
    
    //Анимация при появлении элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Применяем к статьям
    document.querySelectorAll('.privacy-article').forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(article);
    });
    
    // Применяем к карточкам
    document.querySelectorAll('.usage-item, .right-card, .contact-card, .security-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    //Подсветка текущей секции в навигации при загрузке
    if (window.location.hash) {
        const target = window.location.hash;
        smoothScroll(target);
    }
    
    //Согласие с политикой
    const consentItems = document.querySelectorAll('.consent-item');
    consentItems.forEach((item, index) => {
        item.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        item.style.opacity = '0';
    });
    
    //стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// Динамическое обновление даты (для демо)
function updateLastUpdatedDate() {
    const dateElement = document.querySelector('.privacy-date span');
    if (dateElement) {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('ru-RU', options);
        dateElement.textContent = `Последнее обновление: ${formattedDate}`;
    }
}

 updateLastUpdatedDate();