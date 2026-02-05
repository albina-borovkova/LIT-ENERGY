// faq.js - Функциональность страницы FAQ

document.addEventListener('DOMContentLoaded', function() {
    // Данные FAQ
    const faqData = [
        {
            id: 1,
            category: 'installation',
            question: 'Как установить игру?',
            answer: `
                <p>Для установки Dungeon Reckoning выполните следующие шаги:</p>
                <ol>
                    <li>Нажмите кнопку "Скачать" на главной странице</li>
                    <li>Выберите платформу (Steam, Epic Games или прямая загрузка)</li>
                    <li>Следуйте инструкциям установщика</li>
                    <li>Запустите игру через ярлык на рабочем столе или из библиотеки игр</li>
                </ol>
                <div class="faq-note">
                    <p><strong>Важно:</strong> Убедитесь, что ваша система соответствует минимальным требованиям.</p>
                </div>
            `
        },
        {
            id: 2,
            category: 'technical',
            question: 'Игра вылетает при запуске. Что делать?',
            answer: `
                <p>Если игра не запускается, попробуйте следующие решения:</p>
                <ul>
                    <li>Обновите драйверы видеокарты</li>
                    <li>Установите последние обновления Windows</li>
                    <li>Проверьте, установлены ли все необходимые компоненты (DirectX, Visual C++)</li>
                    <li>Запустите игру от имени администратора</li>
                    <li>Отключите антивирус на время запуска (добавьте игру в исключения)</li>
                </ul>
                <p>Если проблема не решена, обратитесь в нашу техподдержку.</p>
            `
        },
        {
            id: 3,
            category: 'gameplay',
            question: 'Как сохранить прогресс в игре?',
            answer: `
                <p>Dungeon Reckoning использует систему автоматического сохранения. Игра сохраняется:</p>
                <ul>
                    <li>При завершении каждого уровня</li>
                    <li>При получении новых артефактов</li>
                    <li>При достижении контрольных точек</li>
                    <li>При выходе из игры (прогресс сохраняется автоматически)</li>
                </ul>
                <div class="faq-note">
                    <p><strong>Важно:</strong> Игра не имеет ручного сохранения, так как это часть механики roguelike.</p>
                </div>
            `
        },
        {
            id: 4,
            category: 'gameplay',
            question: 'Как работает процедурная генерация?',
            answer: `
                <p>Процедурная генерация в Dungeon Reckoning работает по следующим принципам:</p>
                <ul>
                    <li>Каждое подземелье генерируется случайным образом при начале нового забега</li>
                    <li>Расположение комнат, врагов и сокровищ уникально для каждого прохождения</li>
                    <li>Система гарантирует, что каждый уровень будет проходимым</li>
                    <li>Сложность адаптируется в зависимости от прогресса игрока</li>
                </ul>
                <p>Это обеспечивает бесконечную реиграбельность и уникальный опыт каждый раз.</p>
            `
        },
        {
            id: 5,
            category: 'account',
            question: 'Нужно ли создавать аккаунт для игры?',
            answer: `
                <p>Для одиночной игры аккаунт не требуется. Однако для доступа к некоторым функциям рекомендуется создать аккаунт:</p>
                <ul>
                    <li>Синхронизация прогресса между устройствами</li>
                    <li>Участие в онлайн-лидербордах</li>
                    <li>Доступ к облачным сохранениям</li>
                    <li>Участие в бета-тестировании новых функций</li>
                </ul>
                <p>Создание аккаунта полностью бесплатно и занимает менее минуты.</p>
            `
        },
        {
            id: 6,
            category: 'technical',
            question: 'Игра тормозит. Как улучшить производительность?',
            answer: `
                <p>Для улучшения производительности попробуйте следующие настройки:</p>
                <ul>
                    <li>Уменьшите разрешение экрана в настройках игры</li>
                    <li>Понизьте качество текстур и эффектов</li>
                    <li>Отключите вертикальную синхронизацию (VSync)</li>
                    <li>Убедитесь, что другие программы не используют ресурсы ЦП и GPU</li>
                    <li>Закройте фоновые приложения, особенно браузеры</li>
                </ul>
                <div class="faq-note">
                    <p><strong>Совет:</strong> Обновите драйверы видеокарты для лучшей оптимизации.</p>
                </div>
            `
        },
        {
            id: 7,
            category: 'gameplay',
            question: 'Есть ли в игре мультиплеер?',
            answer: `
                <p>На данный момент Dungeon Reckoning является полностью одиночной игрой. Однако:</p>
                <ul>
                    <li>Мы работаем над кооперативным режимом на 2-4 игроков</li>
                    <li>Планируем добавить режим "Призрак", где можно видеть тени других игроков</li>
                    <li>Уже есть онлайн-лидерборды для сравнения результатов</li>
                </ul>
                <p>Информацию о выходе мультиплеера можно найти в наших новостях и социальных сетях.</p>
            `
        },
        {
            id: 8,
            category: 'installation',
            question: 'Сколько места нужно для установки игры?',
            answer: `
                <p>Требования к дисковому пространству:</p>
                <ul>
                    <li><strong>Минимально:</strong> 2 ГБ свободного места</li>
                    <li><strong>Рекомендуется:</strong> 4 ГБ свободного места</li>
                    <li><strong>Для будущих обновлений:</strong> 6 ГБ (рекомендуется оставить запас)</li>
                </ul>
                <p>Игра будет периодически обновляться с добавлением нового контента, поэтому рекомендуется иметь дополнительное свободное место.</p>
            `
        },
        {
            id: 9,
            category: 'account',
            question: 'Как восстановить доступ к аккаунту?',
            answer: `
                <p>Если вы потеряли доступ к аккаунту:</p>
                <ol>
                    <li>На странице входа нажмите "Забыли пароль?"</li>
                    <li>Введите email, привязанный к аккаунту</li>
                    <li>Проверьте почту и следуйте инструкциям в письме</li>
                    <li>Если у вас нет доступа к email, обратитесь в поддержку через форму на сайте</li>
                </ol>
                <div class="faq-note">
                    <p><strong>Важно:</strong> Храните данные от аккаунта в безопасном месте.</p>
                </div>
            `
        },
        {
            id: 10,
            category: 'technical',
            question: 'Игра поддерживает геймпады?',
            answer: `
                <p>Да, Dungeon Reckoning поддерживает большинство популярных геймпадов:</p>
                <ul>
                    <li>Xbox One/Xbox Series X|S контроллеры</li>
                    <li>PlayStation 4/5 контроллеры (через Steam Input)</li>
                    <li>Nintendo Switch Pro Controller</li>
                    <li>Большинство PC-совместимых геймпадов</li>
                </ul>
                <p>Вы можете переключаться между управлением с клавиатуры и геймпада в любое время в настройках игры.</p>
            `
        }
    ];

    // Элементы DOM
    const faqContainer = document.querySelector('.faq-container');
    const searchInput = document.getElementById('faqSearch');
    const categoryButtons = document.querySelectorAll('.category-btn');
    let activeCategory = 'all';

    // Инициализация FAQ
    function initFAQ() {
        renderFAQ(faqData);
        setupEventListeners();
    }

    // Рендер FAQ вопросов
    function renderFAQ(data) {
        faqContainer.innerHTML = '';
        
        if (data.length === 0) {
            faqContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-question-circle"></i>
                    <h3>Вопросы не найдены</h3>
                    <p>Попробуйте изменить поисковый запрос или выбрать другую категорию</p>
                </div>
            `;
            return;
        }

        data.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.dataset.id = item.id;
            faqItem.dataset.category = item.category;
            
            faqItem.innerHTML = `
                <div class="faq-question">
                    <h3>${item.question} <span class="faq-category">${getCategoryName(item.category)}</span></h3>
                    <div class="faq-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div class="faq-answer">
                    ${item.answer}
                </div>
            `;
            
            faqContainer.appendChild(faqItem);
        });

        // Добавляем обработчики клика на вопросы
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
            });
        });

        // Добавляем контактную информацию в конец
        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';
        contactInfo.innerHTML = `
            <h3>Не нашли ответ на свой вопрос?</h3>
            <p>Свяжитесь с нашей службой поддержки, и мы поможем вам в ближайшее время</p>
            <div class="contact-methods">
                <div class="contact-method">
                    <i class="fas fa-envelope"></i>
                    <h4>Email</h4>
                    <a href="mailto:support@dungeonreckoning.com">support@dungeonreckoning.com</a>
                </div>
                <div class="contact-method">
                    <i class="fab fa-discord"></i>
                    <h4>Discord</h4>
                    <a href="#">Присоединиться к серверу</a>
                </div>
                <div class="contact-method">
                    <i class="fas fa-comments"></i>
                    <h4>Форум</h4>
                    <a href="#">Посетить форум поддержки</a>
                </div>
            </div>
        `;
        
        faqContainer.appendChild(contactInfo);
    }

    // Получение названия категории
    function getCategoryName(category) {
        const categories = {
            'installation': 'Установка',
            'gameplay': 'Геймплей',
            'technical': 'Технические',
            'account': 'Аккаунт',
            'all': 'Все'
        };
        return categories[category] || category;
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        searchInput.addEventListener('input', function() {
            filterFAQ();
        });

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                activeCategory = this.dataset.category;
                
                filterFAQ();
            });
        });
    }

    // Фильтрация FAQ
    function filterFAQ() {
        const searchTerm = searchInput.value.toLowerCase();
        
        let filteredData = faqData;
        
        // Фильтр по категории
        if (activeCategory !== 'all') {
            filteredData = filteredData.filter(item => item.category === activeCategory);
        }
        
        // Фильтр по поиску
        if (searchTerm) {
            filteredData = filteredData.filter(item => 
                item.question.toLowerCase().includes(searchTerm) || 
                item.answer.toLowerCase().includes(searchTerm)
            );
        }
        
        renderFAQ(filteredData);
    }

    initFAQ();
});