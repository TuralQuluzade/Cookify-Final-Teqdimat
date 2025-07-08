import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from "./Sect4.module.scss"
import { getSupportThunk } from "../../../redux/reducers/supporterReducer.js";
import { motion, AnimatePresence } from "framer-motion";

const Sect4 = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.supporter.supporter);
    const loading = useSelector((state) => state.supporter.loading);
    const error = useSelector((state) => state.supporter.error);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        dispatch(getSupportThunk());
    }, [dispatch]);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (isMobile && data?.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % data.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isMobile, data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.basliq}>
                    <h1>Daimi dəstəkçilərimiz</h1>
                </div>

                <div className={styles.supporters}>
                    {!isMobile ? (
                        data?.map((item) => (
                            <div key={item._id} className={styles.card}>
                                <img src={item.image} alt="" style={{ width: "80%" }} />
                            </div>
                        ))
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                className={styles.card}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img
                                    src={data?.[currentIndex]?.image}
                                    alt=""
                                    style={{ width: "80%" }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sect4;
