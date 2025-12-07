// Функция для мгновенного входа (если используется YaAuthSuggest)
YaSendSuggestToken(
  'https://oauth-master-class-lilac.vercel.app/',
  { 
    flag: true,
    onSuccess: function() {
      console.log('Токен успешно отправлен на главную страницу');
    }
  }
);

// Обработка токена при загрузке страницы
window.onload = () => {
  console.log('Token page loaded');
  
  // Пытаемся получить токен из URL фрагмента (#access_token=...)
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  
  const statusEl = document.getElementById('status');
  
  if (accessToken) {
    console.log('Токен получен:', accessToken.substring(0, 20) + '...');
    
    // Сохраняем токен
    localStorage.setItem('yandex_token', accessToken);
    
    // Показываем информацию
    if (statusEl) {
      statusEl.innerHTML = `
        <h2 style="color: #4CAF50;">✅ Авторизация успешна!</h2>
        <p>Токен сохранён.</p>
        <p>Перенаправление на главную страницу...</p>
      `;
    }
    
    // Возвращаем на главную
    setTimeout(() => {
      window.location.href = 'https://oauth-master-class-lilac.vercel.app/';
    }, 1500);
  } else {
    // Если токена нет
    if (statusEl) {
      statusEl.innerHTML = `
        <h2 style="color: #ff9800;">⚠️ Ожидание токена...</h2>
        <p>Если авторизация не завершилась автоматически, вернитесь на главную.</p>
        <button onclick="window.location.href='https://oauth-master-class-lilac.vercel.app/'">
          Вернуться на главную
        </button>
      `;
    }
    console.log('Токен не найден в URL');
  }
};
