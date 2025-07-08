import React, {useEffect, useState} from 'react';
import  styles from "./Header.module.scss"
import axios from "axios";
import {Link} from "react-router";
import { FaUserAlt } from "react-icons/fa";
import {CiBurger, CiMenuBurger, CiSearch} from "react-icons/ci";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";


const Header = () => {

    const user = useSelector((state) => state.user.user);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const  location=useLocation()


    const isHomepage=location.pathname==="/"

    useEffect(() => {

        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim()) {
                axios
                    .get(`http://localhost:3000/recepts/search?query=${searchTerm}`)
                    .then((res) => setSearchResults(res.data))
                    .catch((err) => console.error(err));
            } else {
                setSearchResults([]);
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);
    if (user === undefined) {
        return null;
    }
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                {isHomepage && (
                    <div className={styles.search}>
                        <input
                            type="text"
                            placeholder="   Axtar... "
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.input}
                        />
                        {searchResults.length > 0 && (
                            <ul className={styles.table}>
                                <ul className={styles.axtaris}

                                >
                                    {searchResults.map((item) => (
                                        <li
                                            key={item._id}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                padding: "8px",
                                                cursor: "pointer",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div
                                                className={styles.icsec}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    padding: "8px",
                                                    cursor: "pointer",
                                                    justifyContent: "space-between",
                                                    color: "#063B14",
                                                }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        objectFit: "cover",
                                                        borderRadius: "4px",
                                                    }}
                                                />
                                                <span>{item.name}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </ul>
                        )}
                    </div>
                )}
                {!isHomepage && (
                    <div className={styles.logo}>
                        <Link to="/" style={{
                            fontWeight:"400"
                        }}>Cookify.az</Link>
                    </div>
                )}

                <div
                    className={`${styles.infos} ${menuOpen ? styles.showMenu : ""}`}
                >
                    <Link to="/receipts">Reseptlər</Link>
                    <Link to="/blogs">Bloglar</Link>
                    <Link to="/favorites">Favoritlər</Link>
                    <Link to="/soyuducum">Soyuducum</Link>
                    <div
                        className={`${styles.giris} ${menuOpen ? styles.showMenu : ""}`}
                    >
                        {
                            user === null ? (
                                <Link to="/auth/signup" style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                                    Giriş/Qeydiyyat <FaUserAlt style={{ fontSize: "40px" }} />
                                </Link>
                            ) : (
                                <Link onClick={window.location.reload} to="/profile" style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                                    {user?.username || user?.user?.username} <FaUserAlt />
                                </Link>
                            )
                        }
                    </div>
                </div>



                <CiMenuBurger
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>
        </div>
    );
};

export default Header;
