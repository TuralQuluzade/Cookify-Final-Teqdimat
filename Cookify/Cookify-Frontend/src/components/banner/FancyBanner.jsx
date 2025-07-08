import React from "react";
import styles from "./FancyBanner.module.scss";

const FancyBanner = () => {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.bannerText}>
                Cookify.az
            </div>
        </div>
    );
};

export default FancyBanner;
