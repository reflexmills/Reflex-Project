<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Reflex Mini App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* Добавим базовые стили, чтобы кнопки выглядели нормально */
    button {
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 4px;
      border: none;
      background: #007bff;
      color: white;
      font-size: 14px;
      transition: background 0.3s ease;
    }
    button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- React и ReactDOM из CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <!-- Babel для поддержки JSX прямо в браузере -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <!-- Твой код на React с JSX -->
  <script type="text/babel">
    const { useState, useEffect } = React;

    const SERVICES = [
      { id: "bot", label: "Создать бота", priceRUB: 5000 },
      { id: "site", label: "Создать сайт", priceRUB: 3700 },
      { id: "mini", label: "Создать Mini app", priceRUB: 4200 },
    ];

    const EXCHANGE_RATE = 90;

    function ReflexMiniApp() {
      const [page, setPage] = useState("loading");
      const [loadingProgress, setLoadingProgress] = useState(0);
      const [buttonsVisible, setButtonsVisible] = useState(false);
      const [serviceSelected, setServiceSelected] = useState(null);
      const [topUpOpen, setTopUpOpen] = useState(false);
      const [topUpMethod, setTopUpMethod] = useState(null);
      const [topUpAmount, setTopUpAmount] = useState(1000);
      const [isAdmin, setIsAdmin] = useState(false);

      useEffect(() => {
        if (page === "loading") {
          const interval = setInterval(() => {
            setLoadingProgress((p) => {
              if (p >= 100) {
                clearInterval(interval);
                setPage("landing");
                setTimeout(() => setButtonsVisible(true), 500);
                return 100;
              }
              return p + 5;
            });
          }, 125);
          return () => clearInterval(interval);
        }
      }, [page]);

      if (page === "loading") {
        return (
          <div style={{
            height: "100vh",
            backgroundColor: "#111",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#eee"
          }}>
            <div>Подождите пожалуйста...</div>
            <div style={{
              marginTop: 20,
              border: "4px solid #444",
              borderTop: "4px solid #fff",
              borderRadius: "50%",
              width: 40,
              height: 40,
              animation: "spin 1s linear infinite"
            }} />
            <style>{`
              @keyframes spin {
                0% {transform: rotate(0deg);}
                100% {transform: rotate(360deg);}
              }
            `}</style>
          </div>
        );
      }

      if (page === "landing") {
        return (
          <div
            style={{
              height: "100vh",
              backgroundColor: "#222",
              backgroundImage: "url('https://via.placeholder.com/800x600')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: buttonsVisible ? "blur(4px)" : "none",
              transition: "filter 0.8s ease"
            }}
          >
            <div style={{
              padding: 20,
              color: "#fff",
              textShadow: "0 0 6px black",
              textAlign: "center",
              userSelect: "none"
            }}>
              <h1 style={{opacity: buttonsVisible ? 1 : 0, transition: "opacity 1.5s ease"}}>Reflex is your personal creator</h1>
              <p style={{opacity: buttonsVisible ? 1 : 0, transition: "opacity 1.5s ease 0.5s", fontSize: 14}}>
                Это приложение создано для помощи в создании ботов, сайтов, мини апс приложений
              </p>

              <div style={{
                marginTop: 50,
                display: "flex",
                justifyContent: "center",
                gap: 20,
                opacity: buttonsVisible ? 1 : 0,
                transition: "opacity 1.5s ease 1s"
              }}>
                <button onClick={() => { setPage("create"); setButtonsVisible(false); }}>Создать</button>
                <button onClick={() => { setPage("profile"); setButtonsVisible(false); }}>Профиль</button>
                <button onClick={() => { setPage("help"); setButtonsVisible(false); }}>Помощь</button>
              </div>
            </div>
          </div>
        );
      }

      if (page === "create") {
        return (
          <div style={{ padding: 20 }}>
            <h2>Выберите услугу</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {SERVICES.map((s) => (
                <li key={s.id} style={{ margin: "10px 0" }}>
                  <button
                    onClick={() => {
                      setServiceSelected(s);
                      setPage("service");
                    }}
                    style={{ width: "100%", padding: "10px" }}
                  >
                    {s.label} — {s.priceRUB}₽ (~$
                    {(s.priceRUB / EXCHANGE_RATE).toFixed(2)})
                  </button>
                </li>
              ))}
            </ul>
            <button
              style={{ marginTop: 20 }}
              onClick={() => {
                setPage("landing");
                setButtonsVisible(true);
              }}
            >
              ← Назад
            </button>
          </div>
        );
      }

      if (page === "service" && serviceSelected) {
        return (
          <div style={{ padding: 20 }}>
            <h2>{serviceSelected.label}</h2>
            <p>
              Вы выбрали <b>{serviceSelected.label}</b>. Опишите задачу ниже:
            </p>
            <textarea
              rows={5}
              placeholder="Введите описание..."
              style={{ width: "100%", marginBottom: 15 }}
            />
            <p>
              Цена: {serviceSelected.priceRUB}₽ (~$
              {(serviceSelected.priceRUB / EXCHANGE_RATE).toFixed(2)})
            </p>
            <button
              onClick={() => alert("Оплата и передача данных администратору (заглушка)")}
            >
              Оплатить
            </button>
            <br />
            <button
              style={{ marginTop: 20 }}
              onClick={() => setPage("create")}
            >
              ← Назад
            </button>
          </div>
        );
      }

      if (page === "profile") {
        return (
          <div style={{ padding: 20 }}>
            <h2>Профиль</h2>
            <p>Баланс: 10000₽</p>
            <p>Активные заказы: 2</p>

            <button onClick={() => setTopUpOpen(true)}>Пополнить</button>

            {isAdmin && (
              <>
                <button
                  onClick={() => alert("Админ раздел: блокировать/разблокировать пользователя")}
                  style={{ marginTop: 10 }}
                >
                  Админ раздел
                </button>
              </>
            )}

            <button
              onClick={() => {
                setPage("landing");
                setButtonsVisible(true);
              }}
              style={{ marginTop: 20 }}
            >
              ← Назад
            </button>

            {topUpOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!topUpMethod ? (
                  <div
                    style={{
                      background: "#fff",
                      padding: 20,
                      borderRadius: 8,
                      width: 300,
                      textAlign: "center",
                    }}
                  >
                    <h3>Выберите способ оплаты</h3>
                    <button onClick={() => setTopUpMethod("card")} style={{ margin: "10px 0" }}>
                      Картой
                    </button>
                    <button onClick={() => setTopUpMethod("crypto")} style={{ margin: "10px 0" }}>
                      Криптой
                    </button>
                    <br />
                    <button onClick={() => setTopUpOpen(false)}>Отмена</button>
                  </div>
                ) : topUpMethod === "card" ? (
                  <div
                    style={{
                      background: "#fff",
                      padding: 20,
                      borderRadius: 8,
                      width: 300,
                      textAlign: "center",
                    }}
                  >
                    <h3>Оплата картой</h3>
                    <p>Функция оплаты картой находится в разработке.</p>
                    <button onClick={() => setTopUpMethod(null)}>← Назад</button>
                  </div>
                ) : (
                  <div
                    style={{
                      background: "#fff",
