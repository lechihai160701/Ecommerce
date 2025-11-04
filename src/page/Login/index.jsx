import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import clsx from "clsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet, InputField } from "../../Common";
import { auth } from "../../firebase";
import styles from "./Login.module.scss";

const Login = () => {
  const [error, setError] = useState("");
  const refInputEmail = useRef(null);
  const refInputPassword = useRef(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Vui lòng nhập địa chỉ email")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Địa chỉ email không hợp lệ"
        ),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (e) => {
      if (e.email === "" || e.password === "") {
        e.email === ""
          ? refInputEmail.current.focus()
          : refInputPassword.current.focus();
      } else {
        const signIn = () =>
          signInWithEmailAndPassword(auth, e.email, e.password);
        try {
          await signIn(auth, e.email, e.password);
          navigate("/");
        } catch (err) {
          setError(err.message);
        }
      }
    },
  });

  const handleGoogleSignIn = () => {};
  return (
    <Helmet title="Đăng nhập">
      <div className={clsx(styles.login)}>
        <div className={clsx(styles.login__name)}>Login</div>
        <form className={clsx(styles.form)} onSubmit={formik.handleSubmit}>
          <div className={clsx(styles.form__group)}>
            <InputField
              {...formik}
              label="email"
              refInputType={refInputEmail}
            />
            {formik.errors.email && (
              <p className="error">{formik.errors.email}</p>
            )}
          </div>
          <div className={clsx(styles.form__group)}>
            <InputField
              {...formik}
              label="password"
              refInputType={refInputPassword}
            />
            {formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
          </div>
          <Button icon={<UserOutlined />} size="large" htmlType="submit">
            Đăng nhập
          </Button>
          <div
            className={clsx(styles.google__btn)}
            onClick={handleGoogleSignIn}
          >
            <GoogleButton type="dark" />
          </div>
        </form>

        <div className={clsx(styles.login__regis)}>
          Do not have an account? <Link to="/register">Create account</Link>
        </div>

        {error && (
          <span className={`error ${clsx(styles.error)}`}>
            {error || "Có lỗi xảy ra!"}
          </span>
        )}
      </div>
    </Helmet>
  );
};
export default React.memo(Login);
