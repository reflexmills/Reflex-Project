import React, { useEffect, useState } from "react";

const SERVICES = [
  { id: "bot",  label: "Создать бота",  priceRUB: 5000 },
  { id: "site", label: "Создать сайт",  priceRUB: 3700 },
  { id: "mini", label: "Создать Mini app", priceRUB: 4200 },
];
const EXCHANGE_RATE = 90;

export default function App() {
  const [page, setPage]             = useState("loading");
  const [buttonsVisible, setVis]    = useState(false);
  const [service, setService]       = useState(null);
  const [topUpOpen, setTopUpOpen]   = useState(false);
  const [topMethod, setTopMethod]   = useState(null);
  const [topAmount, setTopAmount]   = useState(1000);

  /* ───────── загрузка 2.5 c ───────── */
  useEffect(() => {
    if (page === "loading") {
      const id = setTimeout(() => {
        setPage("landing");
        setTimeout(() => setVis(true), 600);
      }, 2500);
      return () => clearTimeout(id);
    }
  }, [page]);

  /* ───────── landing ───────── */
  if (page === "landing") {
    return (
      <div style={{position:"relative",height:"100vh",overflow:"hidden",
                   filter: buttonsVisible ? "blur(4px)" : "none",
                   transition:"filter .8s"}}>
        <video
          src="/reflex_anim.mp4"
          autoPlay loop muted playsInline
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",
                  objectFit:"cover",zIndex:-1}}
        />
        <div style={{position:"relative",padding:20,color:"#fff",
                     textShadow:"0 0 6px #000",textAlign:"center"}}>
          <h1 style={{opacity:buttonsVisible?1:0,transition:"1.5s"}}>Reflex is your personal creator</h1>
          <p  style={{opacity:buttonsVisible?1:0,transition:"1.5s .5s",fontSize:14}}>
            Это приложение помогает создавать ботов, сайты и mini-apps
          </p>
          <div style={{marginTop:50,display:"flex",justifyContent:"center",gap:20,
                       opacity:buttonsVisible?1:0,transition:"1.5s 1s"}}>
            <button onClick={()=>{setPage("create");setVis(false);}}>Создать</button>
            <button onClick={()=>{setPage("profile");setVis(false);}}>Профиль</button>
            <button onClick={()=>{setPage("help");   setVis(false);}}>Помощь</button>
          </div>
        </div>
      </div>
    );
  }

  /* ───────── create ───────── */
  if (page === "create") {
    return (
      <div style={{padding:20}}>
        <h2>Выберите услугу</h2>
        {SERVICES.map(s=>(
          <button key={s.id} style={{display:"block",width:"100%",margin:"8px 0",padding:10}}
                  onClick={()=>{setService(s);setPage("service");}}>
            {s.label} — {s.priceRUB}₽ (~${(s.priceRUB/EXCHANGE_RATE).toFixed(2)})
          </button>
        ))}
        <button style={{marginTop:20}} onClick={()=>{setPage("landing");setVis(true);}}>← Назад</button>
      </div>
    );
  }

  /* ───────── service ───────── */
  if (page === "service" && service) {
    return (
      <div style={{padding:20}}>
        <h2>{service.label}</h2>
        <p>Вы выбрали {service.label}. Опишите задачу:</p>
        <textarea rows={5} style={{width:"100%",marginBottom:10}}/>
        <p>Цена: {service.priceRUB}₽ (~${(service.priceRUB/EXCHANGE_RATE).toFixed(2)})</p>
        <button onClick={() => alert("Оплата скоро")}>Оплатить</button>
        <button style={{marginTop:20}} onClick={()=>setPage("create")}>← Назад</button>
      </div>
    );
  }

  /* ───────── profile ───────── */
  if (page === "profile") {
    return (
      <div style={{padding:20}}>
        <h2>Профиль</h2>
        <p>Баланс: 0₽</p>
        <button onClick={()=>setTopUpOpen(true)}>Пополнить</button>
        <button style={{marginTop:20}} onClick={()=>{setPage("landing");setVis(true);}}>← Назад</button>

        {/* modal top-up */}
        {topUpOpen && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",
                       display:"flex",justifyContent:"center",alignItems:"center"}}>
            {!topMethod && (
              <div style={{background:"#fff",padding:20,borderRadius:8,width:280,textAlign:"center"}}>
                <h3>Выберите способ оплаты</h3>
                <button onClick={()=>setTopMethod("card")} style={{margin:10}}>Картой</button>
                <button onClick={()=>setTopMethod("crypto")} style={{margin:10}}>Криптой</button>
                <button onClick={()=>setTopUpOpen(false)} style={{marginTop:15}}>Отмена</button>
              </div>
            )}
            {topMethod==="card" && (
              <div style={{background:"#fff",padding:20,borderRadius:8,width:280,textAlign:"center"}}>
                <p>Оплата картой в разработке.</p>
                <button onClick={()=>setTopMethod(null)}>← Назад</button>
              </div>
            )}
            {topMethod==="crypto" && (
              <div style={{background:"#fff",padding:20,borderRadius:8,width:280,textAlign:"center"}}>
                <input type="number" value={topAmount} min={1}
                       onChange={e=>setTopAmount(+e.target.value)}
                       style={{width:"100%",marginBottom:10}}/>
                <button onClick={()=>alert(`Оплатить ${topAmount}₽ через CryptoBot`)}>Оплатить</button>
                <button onClick={()=>setTopMethod(null)} style={{marginTop:10}}>← Назад</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ───────── help ───────── */
  if (page === "help") {
    return (
      <div style={{padding:20}}>
        <h2>Помощь</h2>
        <p>Пиши вопросы сюда: @yareflex</p>
        <button style={{marginTop:20}} onClick={()=>{setPage("landing");setVis(true);}}>← Назад</button>
      </div>
    );
  }

  /* ─── fallback ─── */
  return <div/>;
                         }
