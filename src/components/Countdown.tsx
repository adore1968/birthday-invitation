import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Clock, Heart } from "lucide-react";
import "./Countdown.css";

const BIRTHDAY = new Date(2026, 11, 20, 0, 0, 0);

type TimeLeft = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function calculateTimeLeft(): TimeLeft {
  const difference = Math.max(0, BIRTHDAY.getTime() - Date.now());

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / (1000 * 60)) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = [
    { label: "DÍAS", value: time.dias },
    { label: "HORAS", value: time.horas },
    { label: "MINUTOS", value: time.minutos },
    { label: "SEGUNDOS", value: time.segundos },
  ];

  const finished = Object.values(time).every((value) => value === 0);

  return (
    <section className="countdown">
      <img
        src="/images/stickers/sticker-countdown.png"
        alt=""
        className="scrapbook-sticker sticker-countdown"
      />

      <motion.div
        className="countdown-content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="countdown-icon"
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Clock size={23} />
        </motion.div>

        <span className="countdown-eyebrow">UN DÍA PARA RECORDAR</span>

        <h2>
          {finished ? (
            <>
              ¡Llegó tu <em>día!</em>
            </>
          ) : (
            <>
              Falta poquito para <em>tu día</em>
            </>
          )}
        </h2>

        <p>La cuenta regresiva para los 21 de Luisina ♡</p>

        <div className="countdown-grid">
          {items.map((item, index) => (
            <motion.div
              className="countdown-item"
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ y: -7, scale: 1.04 }}
            >
              <motion.strong
                key={item.value}
                initial={{ opacity: 0.5, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                {String(item.value).padStart(2, "0")}
              </motion.strong>

              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="countdown-date">
          <Heart size={13} fill="currentColor" />
          20 DE DICIEMBRE DE 2026
          <Heart size={13} fill="currentColor" />
        </div>
      </motion.div>
    </section>
  );
}
