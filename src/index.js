window.onload = () => {
  // Проверяем, есть ли уже сохранённый токен
  const savedToken = localStorage.getItem('yandex_token');
  if (savedToken) {
    console.log('Найден сохранённый токен:', savedToken.substring(0, 20) + '...');
    // Здесь можно авторизовать пользователя
  }
  
  document.getElementById("button").onclick = () => {
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
        // Токен уже будет обработан на token.html
      })
      .catch((error) => console.log("Ошибка:", error));
  };
};
