import { useRef, MouseEvent, TouchEvent, Dispatch } from "react";
import styles from "./page.module.css"
import { SetStateAction } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min = 10, max = 100, step = 1, value, setValue } ) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;    
    let newValue = min + (offsetX / rect.width) * (max - min);
    newValue = Math.round(newValue / step) * step;
    newValue = Math.min(max, Math.max(min, newValue));
    setValue(newValue);
  };

  return (
    <div className={styles.slider}>
      <div ref={sliderRef} className={styles.bar}></div>
      <div className={styles.btn}
        onMouseDown={(e) => {
          handleMove(e);
          document.addEventListener("mousemove", handleMove as any);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", handleMove as any), { once: true });
        }}
        onTouchStart={(e) => {
          handleMove(e);
          document.addEventListener("touchmove", handleMove as any);
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", handleMove as any), { once: true });
        }}
        style={{ left: `${((value - min) / (max - min)) * 95}%` }}
      ></div>
    </div>
  );
};

export default RangeSlider;