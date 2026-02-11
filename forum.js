// forum.js - Функциональность форума (День 4)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Форум инициализирован');
    
    // 1. Обработка кликов по категориям
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const categoryName = this.querySelector('h3').textContent;
            showCategoryModal(categoryName);
        });
    });
    
    // 2. Обработка кликов по темам
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach(topic => {
        topic.addEventListener('click', function() {
            const topicId = this.dataset.topicId;
            const topicTitle = this.querySelector('.topic-title').textContent;
            showTopicModal(topicId, topicTitle);
        });
    });
    
    // 3. Обработка популярных тем
    const popularTopics = document.querySelectorAll('.topic-link');
    popularTopics.forEach(topic => {
        topic.addEventListener('click', function(e) {
            e.preventDefault();
            const topicTitle = this.textContent;
            alert(`Популярная тема: "${topicTitle}"\n\nВ будущем здесь будет открыта соответствующая тема.`);
        });
    });
    
    // 4. Обработка кнопок входа и регистрации
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showRegisterModal();
        });
    }
    
    // 5. Обработка кнопки "Показать все"
    const viewAllBtn = document.querySelector('.view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAllTopicsModal();
        });
    }
    
    // Функция для модального окна категории
    function showCategoryModal(categoryName) {
        const modalHTML = `
            <div class="forum-modal" id="categoryModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${categoryName}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-info">
                            <p>Это демонстрационная страница категории <strong>"${categoryName}"</strong>.</p>
                            <p>В полноценной версии здесь будут отображаться:</p>
                            <ul>
                                <li>Список всех тем этой категории</li>
                                <li>Возможность создать новую тему</li>
                                <li>Фильтрация и сортировка тем</li>
                                <li>Поиск по темам категории</li>
                            </ul>
                        </div>
                        <div class="modal-actions">
                            <button class="btn-modal btn-primary" onclick="createNewTopic('${categoryName}')">Создать тему</button>
                            <button class="btn-modal btn-secondary" onclick="browseTopics('${categoryName}')">Просмотреть темы</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        setupModalClose();
    }
    
    // Функция для модального окна темы
    function showTopicModal(topicId, topicTitle) {
        const authors = ['Алексей "Shadow"', 'Мария "Valkyrie"', 'Дмитрий "Warlock"', 'Разработчики'];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        
        const modalHTML = `
            <div class="forum-modal" id="topicModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${topicTitle}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="topic-author-info">
                            <div class="author-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="author-details">
                                <h4>${randomAuthor}</h4>
                                <span class="post-date">Опубликовано сегодня</span>
                            </div>
                        </div>
                        
                        <div class="topic-content">
                            <p>Это демонстрационное содержимое темы. В реальной версии форума здесь будет:</p>
                            <ul>
                                <li>Полный текст первого сообщения</li>
                                <li>Развернутое обсуждение вопроса</li>
                                <li>Ответы других пользователей</li>
                                <li>Код, скриншоты, видео (если прикреплены)</li>
                            </ul>
                            <p>Тема ID: <strong>${topicId}</strong></p>
                        </div>
                        
                        <div class="topic-replies">
                            <h4>Ответы (3)</h4>
                            <div class="reply">
                                <div class="reply-author">
                                    <i class="fas fa-user"></i> Игрок_1
                                </div>
                                <div class="reply-content">
                                    Отличный вопрос! Я тоже искал ответ на это.
                                </div>
                            </div>
                            <div class="reply">
                                <div class="reply-author">
                                    <i class="fas fa-user"></i> Игрок_2
                                </div>
                                <div class="reply-content">
                                    Попробуйте использовать комбинацию артефактов X и Y.
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button class="btn-modal btn-primary" onclick="replyToTopic(${topicId})">Ответить</button>
                            <button class="btn-modal btn-secondary" onclick="subscribeToTopic(${topicId})">Подписаться</button>
                            <button class="btn-modal" onclick="shareTopic(${topicId})">Поделиться</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        setupModalClose();
    }
    
    // Функция для модального окна входа
    function showLoginModal() {
        const modalHTML = `
            <div class="forum-modal" id="loginModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Вход на форум</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm" class="auth-form">
                            <div class="form-group">
                                <label for="loginEmail">Email или логин</label>
                                <input type="text" id="loginEmail" placeholder="Введите email или логин" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword">Пароль</label>
                                <input type="password" id="loginPassword" placeholder="Введите пароль" required>
                            </div>
                            <div class="form-options">
                                <label>
                                    <input type="checkbox" id="rememberMe">
                                    Запомнить меня
                                </label>
                                <a href="#" class="forgot-link">Забыли пароль?</a>
                            </div>
                            <button type="submit" class="btn-submit">Войти</button>
                            <p class="auth-switch">
                                Нет аккаунта? <a href="#" class="switch-link">Зарегистрироваться</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        setupModalClose();
        
        // Обработка формы
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Вход выполнен! (демо)');
                closeModal();
            });
        }
        
        // Переключение на регистрацию
        const switchLink = document.querySelector('.switch-link');
        if (switchLink) {
            switchLink.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
                showRegisterModal();
            });
        }
    }
    
    // Функция для модального окна регистрации
    function showRegisterModal() {
        const modalHTML = `
            <div class="forum-modal" id="registerModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Регистрация на форуме</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm" class="auth-form">
                            <div class="form-group">
                                <label for="regUsername">Имя пользователя</label>
                                <input type="text" id="regUsername" placeholder="Придумайте имя" required>
                            </div>
                            <div class="form-group">
                                <label for="regEmail">Email</label>
                                <input type="email" id="regEmail" placeholder="Введите email" required>
                            </div>
                            <div class="form-group">
                                <label for="regPassword">Пароль</label>
                                <input type="password" id="regPassword" placeholder="Придумайте пароль" required>
                            </div>
                            <div class="form-group">
                                <label for="regPassword2">Подтверждение пароля</label>
                                <input type="password" id="regPassword2" placeholder="Повторите пароль" required>
                            </div>
                            <div class="form-agreement">
                                <label>
                                    <input type="checkbox" id="agreeTerms" required>
                                    Я согласен с <a href="#" class="terms-link">правилами форума</a>
                                </label>
                            </div>
                            <button type="submit" class="btn-submit">Зарегистрироваться</button>
                            <p class="auth-switch">
                                Уже есть аккаунт? <a href="#" class="switch-link">Войти</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        setupModalClose();
        
        // Обработка формы
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Регистрация прошла успешно! Проверьте email. (демо)');
                closeModal();
            });
        }
        
        // Переключение на вход
        const switchLink = document.querySelector('.switch-link');
        if (switchLink) {
            switchLink.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal();
                showLoginModal();
            });
        }
    }
    
    // Функция для модального окна всех тем
    function showAllTopicsModal() {
        const modalHTML = `
            <div class="forum-modal" id="allTopicsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Все темы форума</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="topics-filter">
                            <input type="text" placeholder="Поиск тем..." class="search-input">
                            <select class="category-select">
                                <option value="all">Все категории</option>
                                <option value="gameplay">Геймплей</option>
                                <option value="bugs">Баги</option>
                                <option value="community">Сообщество</option>
                                <option value="creative">Творчество</option>
                            </select>
                        </div>
                        
                        <div class="topics-list-modal">
                            <p>Здесь будет список всех тем форума с пагинацией.</p>
                            <p>Всего тем: <strong>5,892</strong></p>
                            <p>Используйте поиск и фильтры для навигации.</p>
                        </div>
                        
                        <div class="modal-actions">
                            <button class="btn-modal btn-primary" onclick="createNewTopic()">Создать новую тему</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modals-container').innerHTML = modalHTML;
        setupModalClose();
    }
    
    // Вспомогательные функции
    function setupModalClose() {
        const closeBtn = document.querySelector('.modal-close');
        const modal = document.querySelector('.forum-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        }
        
        // Добавляем стили для модального окна, если их еще нет
        addModalStyles();
    }
    
    function closeModal() {
        const modal = document.querySelector('.forum-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    // Глобальные функции для кнопок (для демонстрации)
    window.createNewTopic = function(category) {
        alert(`Создание новой темы${category ? ` в категории "${category}"` : ''}`);
    };
    
    window.browseTopics = function(category) {
        alert(`Просмотр тем в категории "${category}"`);
    };
    
    window.replyToTopic = function(topicId) {
        alert(`Ответ на тему #${topicId}`);
    };
    
    window.subscribeToTopic = function(topicId) {
        alert(`Подписка на тему #${topicId}`);
    };
    
    window.shareTopic = function(topicId) {
        alert(`Поделиться темой #${topicId}`);
    };
    
    // Добавление стилей для модальных окон
    function addModalStyles() {
        if (document.getElementById('forum-modal-styles')) return;
        
        const styles = `
            <style id="forum-modal-styles">
                .forum-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 11, 26, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 20px;
                }
                
                .modal-content {
                    background: #1c122d;
                    border: 2px solid #6a0dad;
                    border-radius: 15px;
                    max-width: 700px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 25px 30px;
                    border-bottom: 1px solid rgba(106, 13, 173, 0.3);
                }
                
                .modal-header h3 {
                    color: white;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    margin: 0;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: #b8b8d1;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: color 0.3s ease;
                }
                
                .modal-close:hover {
                    color: #00a8cc;
                }
                
                .modal-body {
                    padding: 30px;
                }
                
                .modal-info {
                    color: #b8b8d1;
                    line-height: 1.6;
                    margin-bottom: 25px;
                }
                
                .modal-info ul {
                    padding-left: 20px;
                    margin: 10px 0;
                }
                
                .modal-info li {
                    margin-bottom: 5px;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 15px;
                    margin-top: 25px;
                }
                
                .btn-modal {
                    padding: 12px 25px;
                    border-radius: 25px;
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.9rem;
                }
                
                .btn-modal.btn-primary {
                    background: linear-gradient(135deg, #6a0dad 0%, #00a8cc 100%);
                    color: white;
                }
                
                .btn-modal.btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(106, 13, 173, 0.4);
                }
                
                .btn-modal.btn-secondary {
                    background: transparent;
                    color: #00a8cc;
                    border: 2px solid #00a8cc;
                }
                
                .btn-modal.btn-secondary:hover {
                    background: rgba(0, 168, 204, 0.1);
                }
                
                .btn-modal:not(.btn-primary):not(.btn-secondary) {
                    background: transparent;
                    color: #b8b8d1;
                    border: 2px solid #b8b8d1;
                }
                
                /* Стили для темы */
                .topic-author-info {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid rgba(106, 13, 173, 0.3);
                }
                
                .author-avatar {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #6a0dad 0%, #00a8cc 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .author-avatar i {
                    color: white;
                    font-size: 1.5rem;
                }
                
                .author-details h4 {
                    color: white;
                    margin: 0 0 5px 0;
                    font-family: 'Orbitron', sans-serif;
                }
                
                .post-date {
                    color: #888;
                    font-size: 0.9rem;
                }
                
                .topic-content {
                    color: #b8b8d1;
                    line-height: 1.6;
                    margin-bottom: 25px;
                }
                
                .topic-replies {
                    margin: 25px 0;
                }
                
                .topic-replies h4 {
                    color: white;
                    font-family: 'Orbitron', sans-serif;
                    margin-bottom: 15px;
                }
                
                .reply {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 10px;
                }
                
                .reply-author {
                    color: #00a8cc;
                    font-weight: 500;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .reply-content {
                    color: #b8b8d1;
                    line-height: 1.5;
                }
                
                /* Стили для форм */
                .auth-form {
                    margin-top: 10px;
                }
                
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-group label {
                    display: block;
                    color: white;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                
                .form-group input {
                    width: 100%;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(106, 13, 173, 0.3);
                    border-radius: 8px;
                    color: white;
                    font-size: 1rem;
                    font-family: 'Roboto', sans-serif;
                }
                
                .form-group input:focus {
                    outline: none;
                    border-color: #6a0dad;
                    background: rgba(255, 255, 255, 0.12);
                }
                
                .form-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    font-size: 0.95rem;
                }
                
                .form-options label {
                    color: #b8b8d1;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                
                .forgot-link {
                    color: #00a8cc;
                    text-decoration: none;
                }
                
                .forgot-link:hover {
                    text-decoration: underline;
                }
                
                .form-agreement {
                    margin-bottom: 25px;
                    font-size: 0.95rem;
                }
                
                .form-agreement label {
                    color: #b8b8d1;
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    cursor: pointer;
                }
                
                .terms-link {
                    color: #00a8cc;
                    text-decoration: none;
                }
                
                .terms-link:hover {
                    text-decoration: underline;
                }
                
                .btn-submit {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #6a0dad 0%, #00a8cc 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .btn-submit:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(106, 13, 173, 0.4);
                }
                
                .auth-switch {
                    text-align: center;
                    color: #b8b8d1;
                    margin-top: 20px;
                }
                
                .auth-switch a {
                    color: #00a8cc;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .auth-switch a:hover {
                    text-decoration: underline;
                }
                
                /* Фильтры */
                .topics-filter {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 25px;
                }
                
                .search-input, .category-select {
                    padding: 12px 15px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(106, 13, 173, 0.3);
                    border-radius: 8px;
                    color: white;
                    font-family: 'Roboto', sans-serif;
                }
                
                .search-input {
                    flex: 1;
                }
                
                .search-input:focus {
                    outline: none;
                    border-color: #6a0dad;
                }
                
                .category-select {
                    min-width: 150px;
                }
                
                .topics-list-modal {
                    color: #b8b8d1;
                    line-height: 1.6;
                    text-align: center;
                    padding: 30px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        max-height: 95vh;
                    }
                    
                    .modal-header {
                        padding: 20px;
                    }
                    
                    .modal-body {
                        padding: 20px;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                    }
                    
                    .topics-filter {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    

    if (!document.getElementById('modals-container')) {
        const modalsContainer = document.createElement('div');
        modalsContainer.id = 'modals-container';
        document.body.appendChild(modalsContainer);
    }
});