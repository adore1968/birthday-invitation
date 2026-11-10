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
      {/* STICKER DECORATIVO */}
      <motion.img
        src="/images/stickers/sticker-countdown.png"
        alt=""
        className="scrapbook-sticker sticker-countdown"
        animate={{
          y: [0, -12, 0],
          rotate: [-7, 1, -7],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
          animate={{
            rotate: [-8, 8, -8],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
              whileHover={{
                y: -7,
                scale: 1.04,
                rotate: index % 2 === 0 ? -2 : 2,
              }}
            >
              <motion.strong
                key={item.value}
                initial={{ opacity: 0.4, scale: 0.8, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
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
