import React from 'react';
import { useFormik } from 'formik';
import styles from "./Sect3.module.scss";
import { useDispatch } from "react-redux";
import { postFeedbackThunk } from "../../../redux/reducers/feedbackReducer.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Ad çox qısadır')
        .max(10, 'Ad çox uzundur')
        .required('Ad tələb olunur'),

    surname: Yup.string()
        .min(2, 'Soyad çox qısadır')
        .max(12, 'Soyad çox uzundur')
        .required('Soyad tələb olunur'),

    email: Yup.string()
        .email('E-poçt düzgün deyil')
        .required('E-poçt tələb olunur'),

    phoneNumber: Yup.string()
        .matches(/^\+?\d{7,14}$/, 'Telefon nömrəsi düzgün deyil')
        .required('Telefon nömrəsi tələb olunur'),

    textMessage: Yup.string()
        .min(10, 'Mesaj çox qısadır')
        .required('Mesaj yazmaq vacibdir'),
});

const Sect3 = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            textMessage: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const  errors =await formik.validateForm();
            if (Object.keys(errors).length > 0) {
                Object.values(errors).forEach(errMsg => toast.error(errMsg));
               await formik.setTouched({
                    name:true,
                    surname: true,
                    email:true,
                    phoneNumber:true,
                    textMessage: true
                });
                return
            }
            try {
                dispatch(postFeedbackThunk(values));
                resetForm();
                toast.success("Mesaj uğurla göndərildi! 🎉");
            } catch (error) {
                console.log(error)
                toast.error("Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.");
            }
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.basliq}>
                    <h1>Dəyərləndirmə və təklifləriniz</h1>
                </div>
                <div className={styles.formdiv}>
                    <form onSubmit={formik.handleSubmit} className={styles.form}>
                        <div className={styles.ustinp}>
                            <input
                                placeholder="  Name"
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            <input
                                placeholder="  Surname"
                                id="surname"
                                name="surname"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.surname}
                            />
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="  Email Address"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder="  Phone Number"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                            />
                        </div>

                        <input
                            id="textMessage"
                            name="textMessage"
                            type="text"
                            style={{ width: "100%", height: "150px", verticalAlign: "top" }}
                            onChange={formik.handleChange}
                            value={formik.values.textMessage}
                            placeholder="   Text Message"
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sect3;
