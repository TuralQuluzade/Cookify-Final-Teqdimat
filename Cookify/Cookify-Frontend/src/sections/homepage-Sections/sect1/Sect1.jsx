import React from 'react';
import  styles from "./Sect1.module.scss"
import burger from "/burger.svg"
const Sect1 = () => {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.ust}>
                <h1>Cookify.az</h1>
                <h2>israf etmə, bişir!</h2>
            </div>
            <div className={styles.alt}>
                <div className={styles.image}>
                    <img src={burger} alt="Burger" />
                </div>
                <div className={styles.about}>
                    <h1>Cookify.az nədir?</h1>
                    <span>Cookify.az — mətbəxinizdəki ərzaqlardan maksimum istifadə etməyə kömək edən ağıllı resept platformasıdır. Evdə olan ərzaqları seçirsiniz, Cookify isə sizə onları israf etmədən, tez və dadlı yeməklərə çevirməyin yollarını göstərir. Artıq "nə bişirim?" sualına saatlarla cavab axtarmağa ehtiyac yoxdur. Kartof, yumurta, pendir və ya pomidor... Sizdə nə varsa, Cookify onu ləzzətə çevirir. </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Sect1;