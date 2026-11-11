import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, CheckCircle2 } from "lucide-react";
import "./RSVP.css";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxxC8gGWEuo1FtdLc1Vn8l3reeCIKxA-f0VKkIj_O9zNSveYZLZla045VEjsvTpSIU/exec";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");

    const data = new URLSearchParams({
      nombre: name.trim(),
      asistencia: attendance === "yes" ? "Sí" : "No",
      personas: attendance === "yes" ? guests : "0",
      mensaje: message.trim(),
    });

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      setSubmitted(true);
    } catch {
      setError(
        "No pudimos enviar tu respuesta. Revisá tu conexión e intentá nuevamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rsvp-section" id="confirmacion">
      {/* STICKER DECORATIVO */}
      <motion.img
        src="/images/stickers/sticker-rsvp.png"
        alt=""
        className="scrapbook-sticker sticker-rsvp"
        animate={{
          y: [0, -12, 0],
          rotate: [7, 12, 7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="rsvp-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Sparkles size={20} />
        <span>¡QUEREMOS CONTAR CON VOS!</span>

        <h2>
          ¿Nos <em>acompañás?</em>
        </h2>

        <p>
          Tu presencia hará que este día sea todavía más especial. ¡Confirmá tu
          asistencia!
        </p>
      </motion.div>

      <motion.div
        className="rsvp-card"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {submitted ? (
          <motion.div
            className="rsvp-success"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <CheckCircle2 size={48} />
            </motion.div>

            <h3>¡Gracias por responder!</h3>
            <p>Tu respuesta fue enviada. ¡Nos vemos en el cumple! 💗</p>
            <span>Con cariño, Luisina ♡</span>
          </motion.div>
        ) : (
          <>
            <div className="rsvp-decoration">♡</div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="guest-name">Tu nombre</label>
              <input
                id="guest-name"
                type="text"
                placeholder="¿Cómo te llamás?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
              />

              <span className="rsvp-label">¿Vas a poder venir?</span>

              <div className="attendance-options">
                <label className={attendance === "yes" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === "yes"}
                    onChange={(e) => setAttendance(e.target.value)}
                  />
                  <span>¡Sí, ahí estaré! ♡</span>
                </label>

                <label className={attendance === "no" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={attendance === "no"}
                    onChange={(e) => setAttendance(e.target.value)}
                  />
                  <span>No voy a poder asistir</span>
                </label>
              </div>

              {attendance === "yes" && (
                <>
                  <label htmlFor="guest-count">
                    ¿Cuántas personas asistirán?
                  </label>

                  <select
                    id="guest-count"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6 personas</option>
                  </select>
                </>
              )}

              <label htmlFor="guest-message">
                ¿Querés dejarle un mensajito? <span>(opcional)</span>
              </label>

              <textarea
                id="guest-message"
                placeholder="Escribí algo lindo..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
              />

              {error && <p className="rsvp-error">{error}</p>}

              <motion.button
                type="submit"
                className="rsvp-button"
                disabled={submitting}
                whileHover={{
                  scale: submitting ? 1 : 1.04,
                  y: submitting ? 0 : -3,
                }}
                whileTap={{ scale: submitting ? 1 : 0.96 }}
              >
                <Heart size={18} />
                {submitting ? "Enviando..." : "Enviar confirmación"}
                <Heart size={15} fill="currentColor" />
              </motion.button>

              <p className="rsvp-footnote">
                Tu respuesta quedará registrada para que Luisina pueda organizar
                su celebración. ♡
              </p>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}
