import { useEffect, useState } from "react";
import "./App.css";
import styles from "./App.module.css";

function App() {
  useEffect(() => {
    // if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) return;
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

    const button = document.querySelector(`.${styles.button}`);
    if (!button) return;

    const handleResizeForIos = (event: Event) => {
      const viewport = event.target as VisualViewport;
      const keyboardHeight = window.innerHeight - viewport.height;
      const bottomValue = keyboardHeight === 0 ? "" : `${keyboardHeight}px`;
      (button as HTMLElement).style.bottom = bottomValue;
    };
    const handleResizeForAndroid = (event: Event) => {
      const viewport = event.target as VisualViewport;
      const viewportHeight = viewport.height;
      const keyboardHeight = window.innerHeight - viewportHeight;
      const bottomValue = keyboardHeight === 0 ? "" : `${keyboardHeight}px`;
      (button as HTMLElement).style.bottom = bottomValue;
      document.body.style.minHeight = `${viewportHeight}`;
    };

    const handleResize = isIOS ? handleResizeForIos : handleResizeForAndroid;

    visualViewport?.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const [vh, setVh] = useState(0);
  return (
    <div>
      <input
        type="text"
        style={{ fontSize: "1rem" }}
        onClick={(event) => {
          const viewport = event.target as VisualViewport;
          const viewportHeight = viewport.height;
          setVh(viewportHeight);
        }}
      />
      <p>viewport height: ${vh}</p>
      <button className={styles.button}>sample button</button>
    </div>
  );
}

export default App;
