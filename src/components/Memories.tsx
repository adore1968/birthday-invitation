import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import "./Memories.css";

const memories = [
  {
    image: "/images/foto1.jpeg",
    caption: "Una sonrisa que ilumina todo ♡",
    rotation: -4,
  },
  {
    image: "/images/foto2.jpeg",
    caption: "Un rayito de sol",
    rotation: 3,
  },
  {
    image: "/images/foto3.jpeg",
    caption: "Así de especial sos",
    rotation: -2,
  },
  {
    image: "/images/foto4.jpeg",
    caption: "Así de linda, siempre ♡",
    rotation: 4,
  },
];

export default function Memories() {
  return (
    <section className="memories">
      <motion.div
        className="memories-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Sparkles size={20} />
        <span>PEQUEÑOS GRANDES MOMENTOS</span>
        <h2>
          Un poquito de <em>magia</em>
        </h2>
        <p>Cuatro fotos, infinitas razones para sonreír.</p>
      </motion.div>

      <div className="memories-grid">
        {memories.map((memory, index) => (
          <motion.div
            className="memory-card"
            key={memory.image}
            initial={{ opacity: 0, y: 45, rotate: 0 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: memory.rotation,
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.06,
              rotate: 0,
              y: -8,
            }}
          >
            <div className="memory-photo">
              <img src={memory.image} alt={`Foto de Luisina ${index + 1}`} />
            </div>
            <p>{memory.caption}</p>
            <Heart className="memory-heart" size={15} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="memories-footer">
        <span>HECHO DE RECUERDOS BONITOS</span>
        <Heart size={13} fill="currentColor" />
      </div>
    </section>
  );
}
