"use client";

import { useRouter } from "next/navigation";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const router = useRouter();

  const goToProductPage = () => {
    router.push("/product");
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.overlay}>
        <button onClick={goToProductPage} className={styles.enterButton}>
          Enter Shop
        </button>
      </div>
    </div>
  );
};

export default Welcome;
