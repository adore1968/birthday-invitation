import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkles,
  CalendarDays,
  MapPin,
  Clock,
  Gift,
  ArrowUp,
} from "lucide-react";

import "./App.css";

import Countdown from "./components/Countdown";
import Memories from "./components/Memories";
import RSVP from "./components/RSVP";

function App() {
  const [opened, setOpened] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const eventDetails = [
    {
      icon: CalendarDays,
      label: "DATE",
      value: "December 20th",
    },
    {
      icon: Clock,
      label: "TIME",
      value: "Coming soon",
    },
    {
      icon: MapPin,
      label: "LOCATION",
      value: "Coming soon",
    },
  ];

  const decorations = [
    { symbol: "✿", left: "12%", top: "15%", delay: 0 },
    { symbol: "♡", left: "83%", top: "25%", delay: 1 },
    { symbol: "✧", left: "18%", top: "75%", delay: 2 },
    { symbol: "✿", left: "85%", top: "80%", delay: 0.5 },
  ];

  const scrollToInvitation = () => {
    setOpened(true);

    document.getElementById("invitation")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* PRESENTACIÓN */}
      <section className="hero">
        {decorations.map((item, index) => (
          <motion.span
            key={index}
            className="floating-decoration"
            style={{
              left: item.left,
              top: item.top,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.symbol}
          </motion.span>
        ))}

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="eyebrow">UNA FECHA PARA RECORDAR</span>

          {/* SNOOPY PRINCIPAL */}
          <motion.div
            className="hero-sticker"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/images/snoopy.png"
              alt="Snoopy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span>♡</span>
          </motion.div>

          <p className="hero-small">Estás invitado a celebrar</p>

          <h1>
            Luisina <em>21</em>
          </h1>

          <p className="hero-subtitle">CHAPTER 21</p>

          <div className="hero-divider">
            <span>✿</span>
            <Heart size={13} />
            <span>✿</span>
          </div>

          <p className="hero-description">
            Un cumpleaños, muchas razones para celebrar
            <br />y personas especiales con quienes compartirlo.
          </p>

          <motion.button
            className="open-button"
            onClick={scrollToInvitation}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {opened ? "Ver invitación" : "Descubrir invitación"}
            <Heart size={15} />
          </motion.button>

          <span className="hero-bottom">20 · 12 · 2026</span>
        </motion.div>
      </section>

      {/* INVITACIÓN */}
      <motion.section
        className="invitation section-padding"
        id="invitation"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* DECORACIONES */}
        <motion.span
          className="invitation-decoration invitation-decoration-one"
          animate={{ rotate: [0, 12, 0], y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ✿
        </motion.span>

        <motion.span
          className="invitation-decoration invitation-decoration-two"
          animate={{ rotate: [0, -10, 0], y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          ✧
        </motion.span>

        {/* STICKER DECORATIVO */}
        <motion.img
          src="/images/stickers/sticker-invitation.png"
          alt=""
          className="scrapbook-sticker sticker-invitation"
          animate={{
            y: [0, -12, 0],
            rotate: [8, 13, 8],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="invitation-card"
          initial={{ opacity: 0, y: 35, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="section-label">YOU'RE INVITED</span>

          <h2>
            Let's <em>celebrate!</em>
          </h2>

          <p className="invitation-text">
            I'm turning 21! I'd love to celebrate this special day with you.
            Join me for an afternoon full of laughter, good moments and lovely
            memories.
          </p>

          <div className="event-details">
            {eventDetails.map((item, index) => (
              <motion.div
                className="detail"
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                }}
              >
                <item.icon />

                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </motion.div>
            ))}
          </div>

          <span className="card-flower">✿</span>
        </motion.div>
      </motion.section>

      {/* CUENTA REGRESIVA */}
      <Countdown />

      {/* SECCIÓN INTERMEDIA */}
      <Memories />

      {/* CONFIRMACIÓN DE ASISTENCIA */}
      <RSVP />

      {/* CIERRE */}
      <motion.section
        className="little-note"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* DECORACIONES */}
        <motion.span
          className="note-decoration note-decoration-one"
          animate={{ rotate: [0, 15, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          ♡
        </motion.span>

        <motion.span
          className="note-decoration note-decoration-two"
          animate={{ rotate: [0, -12, 0], y: [0, 7, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ✧
        </motion.span>

        {/* STICKER DECORATIVO */}
        <motion.img
          src="/images/stickers/sticker-footer.png"
          alt=""
          className="scrapbook-sticker sticker-footer"
          animate={{
            y: [0, -10, 0],
            rotate: [-7, 0, -7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Sparkles size={20} />

        <p>It wouldn't be the same without you.</p>

        <span>¡TE ESPERO! ♡</span>
      </motion.section>

      {/* PIE DE PÁGINA */}
      <footer>
        <Gift size={16} />

        <p>Celebrating 21 years of Luisina</p>

        <span>20 · 12 · 2026</span>
      </footer>

      {/* BOTÓN VOLVER ARRIBA */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            title="Volver arriba"
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            whileHover={{ scale: 1.12, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <Heart size={20} fill="currentColor" />
            <ArrowUp size={11} className="back-to-top-arrow" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
