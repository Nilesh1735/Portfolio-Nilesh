import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./style.module.scss";
import { opacity } from "../../anim";

interface IndexProps {
  src: string;
  isActive: boolean;
}

const Index: React.FC<IndexProps> = ({ src, isActive }) => {
  // Nav preview thumbnails are optional assets. Preload each one and only
  // render the visible element once it has actually loaded — this prevents a
  // missing image from briefly mounting a large box that shifts the layout
  // (which moves links out from under the cursor and causes hover flicker).
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (!src) return;

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!loaded) return null;

  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={styles.imageContainer}
    >
      {/* Plain img (asset already preloaded above, so no layout thrash). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={400}
        height={400}
        className="my-32 w-full h-auto object-cover"
        alt="Section preview"
        loading="lazy"
      />
    </motion.div>
  );
};

export default Index;
