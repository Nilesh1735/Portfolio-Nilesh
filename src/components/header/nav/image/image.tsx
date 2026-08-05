import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import styles from "./style.module.scss";
import { opacity } from "../../anim";

interface IndexProps {
  src: string;
  isActive: boolean;
}

const Index: React.FC<IndexProps> = ({ src, isActive }) => {
  // Nav preview thumbnails are optional assets. If one is missing (404),
  // hide the image container instead of rendering a broken image box.
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) return null;

  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={styles.imageContainer}
    >
      {/* Plain img so a missing preview degrades gracefully via onError. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={400}
        height={400}
        className="my-32 w-full h-auto object-cover"
        alt="Section preview"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </motion.div>
  );
};

export default Index;
