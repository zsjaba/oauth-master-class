// Функция для получения данных пользователя Яндекс по токену
async function fetchYandexData(accessToken) {
  try {
    console.log('Получаем данные пользователя...');
    
    // Запрос к API Яндекс ID для получения информации о пользователе
    const response = await fetch('https://login.yandex.ru/info', {
      headers: {
        'Authorization': `OAuth ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    console.log('Данные пользователя получены:', userData);
    
    return userData;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error;
  }
}

// Функция для авторизации на сайте
function authorize(userData) {
  console.log('Авторизуем пользователя:', userData);
  
  // Сохраняем данные пользователя в localStorage
  localStorage.setItem('yandex_user_data', JSON.stringify(userData));
  
  // Обновляем интерфейс
  const logsElement = document.getElementById('logs');
  if (logsElement) {
    logsElement.innerHTML = `
      <div style="background: #e8f5e8; padding: 15px; border-radius: 5px;">
        <h3>👋 Добро пожаловать, ${userData.real_name || userData.login || 'Пользователь'}!</h3>
        <p>Email: ${userData.default_email || 'Не указан'}</p>
        <p>Логин: ${userData.login}</p>
        <p>ID: ${userData.id}</p>
        <button onclick="logout()" style="padding: 8px 16px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">
          Выйти
        </button>
      </div>
    `;
  }
  
  return userData;
}

// Функция для выхода
function logout() {
  localStorage.removeItem('yandex_token');
  localStorage.removeItem('yandex_user_data');
  window.location.reload();
}

// Экспортируем функции для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchYandexData, authorize, logout };
}
