window.onload = () => {
  console.log('Страница загружена');
  
  // Проверяем, есть ли уже сохранённый токен
  const savedToken = localStorage.getItem('yandex_token');
  
  if (savedToken) {
    console.log('Найден сохранённый токен:', savedToken.substring(0, 20) + '...');
    
    // Проверяем, есть ли данные пользователя
    const userDataStr = localStorage.getItem('yandex_user_data');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        // Если есть функция authorize, вызываем её
        if (typeof authorize === 'function') {
          authorize(userData);
        } else {
          // Иначе показываем простой текст
          document.getElementById('logs').innerHTML = 
            '<p>Вы авторизованы! Токен: ' + savedToken.substring(0, 20) + '...</p>';
        }
      } catch (e) {
        console.error('Ошибка парсинга данных пользователя:', e);
      }
    } else {
      // Если токен есть, но данных пользователя нет - получаем их
      if (typeof fetchYandexData === 'function') {
        fetchYandexData(savedToken)
          .then(userData => {
            if (typeof authorize === 'function') {
              authorize(userData);
            }
          })
          .catch(error => {
            console.error('Ошибка получения данных пользователя:', error);
            document.getElementById('logs').innerHTML = 
              '<p style="color: orange;">Токен есть, но не удалось получить данные пользователя</p>';
          });
      }
    }
  }
  
  // Обработчик кнопки "Тыкни меня"
  document.getElementById("button").onclick = () => {
    console.log('Кнопка нажата, инициализация YaAuthSuggest...');
    
    window.YaAuthSuggest.init(
      {
        client_id: "181bd7ef97344604a13647be61dfc071",
        response_type: "token",
        redirect_uri: "https://oauth-master-class-lilac.vercel.app/token.html",
      },
      "https://oauth-master-class-lilac.vercel.app/token.html",
      {
        view: "button",
        parentId: "buttonContainer",
        buttonSize: "m",
        buttonView: "main",
        buttonTheme: "light",
        buttonBorderRadius: "0",
        buttonIcon: "ya",
      }
    )
      .then(({ handler }) => handler())
      .then((data) => {
        console.log("Токен получен через SDK:", data);
        
        // Если токен получен здесь (не всегда срабатывает при redirect)
        if (data && data.access_token) {
          localStorage.setItem('yandex_token', data.access_token);
          document.getElementById('logs').innerHTML = 
            '<p>Токен получен через SDK!</p>';
          
          // Пробуем получить данные пользователя
          if (typeof fetchYandexData === 'function') {
            fetchYandexData(data.access_token)
              .then(userData => {
                if (typeof authorize === 'function') {
                  authorize(userData);
                }
              })
              .catch(err => console.error('Ошибка получения данных:', err));
          }
        }
      })
      .catch((error) => console.log("Ошибка:", error));
  };
};
