import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginThunk } from '../../redux/reducers/authReducer';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required('Email və ya istifadəçi adı vacibdir'),
      password: Yup.string().required('Parol vacibdir'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const validationErrors = await formik.validateForm();
      if (Object.keys(validationErrors).length > 0) {
        Object.values(validationErrors).forEach((msg) =>
            toast.error(msg, { toastId: msg })
        );
        setSubmitting(false);
        return;
      }

      try {
        const resultAction = await dispatch(postLoginThunk(values));
        if (postLoginThunk.fulfilled.match(resultAction)) {
          toast.success('Giriş uğurla başa çatdı!');
          navigate('/');
        } else {
          const errorMessage =
              typeof resultAction.payload === 'string'
                  ? resultAction.payload
                  : resultAction.payload?.message || 'Giriş zamanı xəta baş verdi';
          toast.error(errorMessage);
        }
      } catch (error) {
        toast.error('Naməlum xəta baş verdi!');
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
          <h2 className="text-center mb-4">Zəhmət olmasa Daxil Olun</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  className={`form-control `}
                  placeholder="Email və ya İstifadəçi Adı"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.identifier}
              />
              {formik.touched.identifier && formik.errors.identifier && (
                  <div className="invalid-feedback">{formik.errors.identifier}</div>
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
            <div className="d-grid">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Göndərilir...' : 'Daxil Ol'}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p>
              Əgər hesabınız yoxdursa{' '}
              <Link to="/auth/signup" className="text-primary text-decoration-underline">
                Qeydiyyat
              </Link>{' '}
              hissəsinə keçid edə bilərsiniz
            </p>
            <p>
              <Link to="/" className="text-secondary text-decoration-underline">
                Ana Səhifəyə
              </Link>{' '}
              keçid et
            </p>
          </div>
        </div>
      </div>
  );
};

export default Login;
