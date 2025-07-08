import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postSignupThunk } from '../../redux/reducers/authReducer.js';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (!location.state) return;
    const toastData = location.state.toast;
    if (toastData) {
      toast[toastData.type || "info"](toastData.msg);
    }
  }, [location.state]);

  const formik = useFormik({
    initialValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('İstifadəçi adı vacibdir'),
      fullName: Yup.string().required('Tam ad vacibdir'),
      email: Yup.string().email('Yanlış email formatı').required('Email vacibdir'),
      password: Yup.string().min(6, 'Parol ən az 6 simvol olmalıdır').required('Parol vacibdir'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const validationErrors = await formik.validateForm();
      if (Object.keys(validationErrors).length > 0) {
        Object.values(validationErrors).forEach((msg) => toast.error(msg));
        setSubmitting(false);
        return;
      }

      try {
        const resultAction = await dispatch(postSignupThunk(values));
        if (postSignupThunk.fulfilled.match(resultAction)) {
          toast.success("Qeydiyyat uğurla tamamlandı!");
          navigate('/');
        } else {
          const errorMessage =
              resultAction.payload?.message ||
              resultAction.payload ||
              "Qeydiyyat zamanı xəta baş verdi";
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error("Naməlum xəta baş verdi!");
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
          <h2 className="text-center mb-4">Xoş Gəlmisiniz</h2>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <input
                  id="username"
                  name="username"
                  type="text"
                  className={`form-control`}
                  placeholder="İstifadəçi Adı"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                  <div className="invalid-feedback">{formik.errors.username}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`form-control `}
                  placeholder="Tam Ad"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                  <div className="invalid-feedback">{formik.errors.fullName}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control `}
                  placeholder="Email Ünvanı"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-control `}
                  placeholder="Şifrə"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
            >
              {loading ? 'Göndərilir...' : 'Qeydiyyat'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p>
              Əgər hesabınız varsa{' '}
              <Link to="/auth/login" className="text-primary text-decoration-underline">
                Login
              </Link>{' '}
              hissəsinə keçid edə bilərsiniz
            </p>
            <p>
              <Link to="/" className="text-secondary text-decoration-underline">
                Ana Səhifəyə keçid et
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Signup;



