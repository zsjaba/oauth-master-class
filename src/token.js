window.onload = () => {
  // Получаем токен из URL фрагмента (#access_token=...)
  const hash = window.location.hash.substring(1); // Убираем #
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  
  if (accessToken) {
    console.log('Токен получен:', accessToken);
    
    // Показываем информацию на странице
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h2>Авторизация успешна!</h2>
        <p>Токен получен. Перенаправление на главную...</p>
        <p><small>Токен (первые 20 символов): ${accessToken.substring(0, 20)}...</small></p>
      </div>
    `;
    
    // Сохраняем токен (например, в localStorage)
    localStorage.setItem('yandex_token', accessToken);
    
    // Через 2 секунды возвращаем на главную
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  } else {
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h2>Ошибка</h2>
        <p>Токен не получен. Проверьте настройки OAuth.</p>
        <button onclick="window.location.href='/'">Вернуться на главную</button>
      </div>
    `;
  }
};
