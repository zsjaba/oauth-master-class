// Функция для мгновенного входа
YaSendSuggestToken(
  'https://oauth-master-class-lilac.vercel.app/',
  { flag: true }
);

// Обработка токена при загрузке страницы
window.onload = () => {
  // Получаем токен из URL фрагмента (#access_token=...)
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  
  if (accessToken) {
    console.log('Токен получен:', accessToken);
    
    // Сохраняем токен
    localStorage.setItem('yandex_token', accessToken);
    
    // Показываем информацию
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h2>Авторизация успешна!</h2>
        <p>Токен сохранён. Перенаправление на главную...</p>
      </div>
    `;
    
    // Возвращаем на главную
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  } else {
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h2>Ожидание токена...</h2>
        <p>Если авторизация не завершилась автоматически, вернитесь на главную.</p>
        <button onclick="window.location.href='/'">Вернуться на главную</button>
      </div>
    `;
  }
};
