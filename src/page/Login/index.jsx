import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "../../Common";
import { auth } from "../../firebase";
import styles from "./Login.module.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
      } catch (err) {
        setError("Email hoặc mật khẩu không đúng!");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignIn = () => {
    // TODO: Google sign in
  };

  return (
    <Helmet title="Đăng nhập">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Left - Form */}
          <div className={styles.formSide}>
            <div className={styles.formWrapper}>
              <h1 className={styles.title}>Chào mừng quay lại!</h1>
              <p className={styles.subtitle}>Đăng nhập để tiếp tục mua sắm</p>

              <Form onFinish={formik.handleSubmit} layout="vertical">
                <Form.Item
                  validateStatus={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                  help={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null
                  }
                >
                  <Input
                    prefix={<UserOutlined className={styles.icon} />}
                    placeholder="Email của bạn"
                    size="large"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.antInput}
                  />
                </Form.Item>

                <Form.Item
                  validateStatus={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                  help={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null
                  }
                >
                  <Input.Password
                    prefix={<UserOutlined className={styles.icon} />}
                    placeholder="Mật khẩu"
                    size="large"
                    name="password"
                    autoComplete="off"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.antInput}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  block
                  className={styles.loginBtn}
                >
                  Đăng nhập ngay
                </Button>
              </Form>

              <div className={styles.divider}>
                <span>hoặc</span>
              </div>

              <div className={styles.googleBtnWrapper}>
                <GoogleButton type="dark" onClick={handleGoogleSignIn} />
              </div>

              {error && <div className={styles.errorBox}>{error}</div>}

              <p className={styles.registerLink}>
                Chưa có tài khoản?{" "}
                <Link to="/register" className={styles.link}>
                  Đăng ký miễn phí
                </Link>
              </p>
            </div>
          </div>

          {/* Right - Visual */}
          <div className={styles.visualSide}>
            <div className={styles.overlay} />
            <div className={styles.visualContent}>
              <h2>Xin chào bạn!</h2>
              <p>Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất</p>
              <div className={styles.decorativeCircles}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default React.memo(Login);
