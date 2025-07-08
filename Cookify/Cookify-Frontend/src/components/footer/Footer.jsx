import React from 'react';
import styles from "./Footer.module.scss"
import About from "../../pages/About.jsx";
import {Link} from "react-router";
const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.bolmeler}>
                <h1>Bölmələr</h1>
                <Link to="mailto:turalindustryn1@gmail.com">Əlaqə</Link>
                <Link to="/receipts">Reseptlər</Link>
                <Link to="/">Ana Səhifə</Link>
                <Link to="/favorites">Favoritlər</Link>
                <Link to="/about">Haqqımızda</Link>
            </div>
            <div className={styles.bolmeler}>
                <h1>Yardım</h1>
                <Link to="">Tez-tez verilən suallar(FAQ)</Link>
                <Link to="">Gizlilik siyasəti</Link>
                <Link to="">İstifadə sərtləri</Link>
                <Link to="/feedback">Geri bildirim göndər</Link>
            </div>
            <div className={styles.bolmeler}>
                <h1>Sosial Media Linkləri</h1>
                <Link to="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                    Instagram
                </Link>
                <Link to="https://tiktok.com/" target="_blank" rel="noopener noreferrer">
                    TikTok
                </Link>
                <Link to="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                    Facebook
                </Link>
                <Link to="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                    Youtube
                </Link>
            </div>

        </div>
        <div className={styles.huquq}>
            <span>© 2025 Cookify.az – Bütün hüquqlar qorunur</span>
        </div>
    </div>
  );
};

export default Footer;