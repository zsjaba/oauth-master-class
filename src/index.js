window.onload = () => {
  document.getElementById("button").onclick = () => {
    window.YaAuthSuggest.init(
      {
        client_id: "181bd7ef97344604a13647be61dfc071",
        response_type: "token",
        redirect_uri: "https://oauth-master-class-lilac.vercel.app/token.html",
      },
      "https://oauth-master-class-lilac.vercel.app",
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
      .then((data) => console.log("Сообщение с токеном", data))
      .catch((error) => console.log("Обработка ошибки", error));
  };
};
