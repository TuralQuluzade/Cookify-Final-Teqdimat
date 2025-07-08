import React from 'react';
import styles from "./Sect2.module.scss";
import Receipt from  "/receipt.svg"
import Time from "/time.svg"
import Ring from "/ring.svg"


const Sect2 = () => {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.yazi}>
                <h3 style={{fontWeight:"400"}}>Cookify.az-da nələr var?</h3>
            </div>
            <div className={styles.sections}>
                <div className={styles.bir}>
                    <img src={Receipt} alt="receipt"/>
                    <span>Əlindəki ərzaqlara
                        uyğun reseptlər
                        və qaydalar</span>
                </div>
                <div className={styles.bir}>
                    <img src={Time} alt="time"  />
                    <span>Hazırlanma vaxtı,
çətinliklər və
əvəzedicilər</span>
                </div>
                <div className={styles.bir}>
                    <img src={Ring} alt="ring"/>
                    <span>Soyuducunda
nə olduğunu
onu açmadan gör</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Sect2;