import { useEffect, useState } from "react";
import "./App.css";
import styles from "./App.module.css";

function App() {
  const [_, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const button = document.querySelector(`.${styles.button}`);
    if (!button) return;

    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (currentHeight < initialHeight) {
        // キーボードが表示されている
        setIsKeyboardVisible(true);
        (button as HTMLElement).style.bottom = `${
          initialHeight - currentHeight
        }px`;
      } else {
        // キーボードが非表示
        setIsKeyboardVisible(false);
        (button as HTMLElement).style.bottom = "";
      }
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <input type="text" />
      <button className={styles.button}>sample button</button>
    </div>
  );
}

export default App;
