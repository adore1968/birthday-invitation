import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import "./Memories.css";

const stickers = [
  {
    image: "/images/stickers/cake.jpg",
    caption: "Hoy se festeja 🎂",
    rotation: -4,
  },
  {
    image: "/images/stickers/celebrate.jpg",
    caption: "Un día especial",
    rotation: 3,
  },
  {
    image: "/images/stickers/show.jpg",
    caption: "Que empiece la fiesta 🎈",
    rotation: -2,
  },
  {
    image: "/images/stickers/cute.jpg",
    caption: "A disfrutar tu día ♡",
    rotation: 4,
  },
];

export default function Memories() {
  return (
    <section className="memories">
      <motion.img
        src="/images/stickers/sticker-memories.png"
        alt=""
        className="scrapbook-sticker sticker-memories"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, -3, -8],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="memories-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Sparkles size={20} />

        <span>HAPPY BIRTHDAY</span>

        <h2>
          ¡A <em>celebrar!</em>
        </h2>

        <p>Unos pequeños detalles para acompañar este día.</p>
      </motion.div>

      <div className="memories-grid">
        {stickers.map((sticker, index) => (
          <motion.div
            className={`memory-card memory-card-${index + 1}`}
            key={sticker.image}
            initial={{
              opacity: 0,
              y: 45,
              rotate: 0,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: sticker.rotation,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.06,
              rotate: 0,
              y: -9,
              zIndex: 5,
            }}
          >
            <span className="memory-tape" />

            <div className="memory-photo">
              <img
                src={sticker.image}
                alt={`Sticker de cumpleaños ${index + 1}`}
              />
            </div>

            <p>{sticker.caption}</p>

            <Heart className="memory-heart" size={15} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="memories-footer"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <span>LET'S CELEBRATE!</span>
        <Heart size={13} fill="currentColor" />
      </motion.div>
    </section>
  );
}
