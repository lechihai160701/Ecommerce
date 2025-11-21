import { GoogleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "../../Common";
import { auth } from "../../firebase";
import styles from "./Register.module.scss";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email này đã được sử dụng!");
      } else if (err.code === "auth/weak-password") {
        setError("Mật khẩu phải có ít nhất 6 ký tự!");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Google Sign Up
  };

  return (
    <Helmet title="Đăng ký tài khoản">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Left Side - Form */}
          <div className={styles.formSide}>
            <div className={styles.formWrapper}>
              <h1 className={styles.title}>Tạo tài khoản mới</h1>
              <p className={styles.subtitle}>
                Đăng ký để nhận ưu đãi & mua sắm nhanh hơn
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className={styles.form}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input
                    prefix={<UserAddOutlined className={styles.icon} />}
                    placeholder="Email của bạn"
                    size="large"
                    className={styles.antInput}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                  ]}
                >
                  <Input.Password
                    prefix={<UserAddOutlined className={styles.icon} />}
                    placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                    size="large"
                    className={styles.antInput}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu xác nhận không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<UserAddOutlined className={styles.icon} />}
                    placeholder="Nhập lại mật khẩu"
                    size="large"
                    className={styles.antInput}
                  />
                </Form.Item>

                <Form.Item noStyle>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    block
                    className={styles.registerBtn}
                  >
                    Đăng ký ngay
                  </Button>
                </Form.Item>
              </Form>

              <div className={styles.divider}>
                <span>hoặc</span>
              </div>

              <div className={styles.googleBtnWrapper}>
                <GoogleButton
                  type="dark"
                  onClick={handleGoogleSignUp}
                  label="Đăng ký với Google"
                />
              </div>

              {error && <div className={styles.errorBox}>{error}</div>}

              <p className={styles.footerText}>
                Đã có tài khoản?{" "}
                <Link to="/login" className={styles.link}>
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className={styles.visualSide}>
            <div className={styles.overlay} />
            <div className={styles.visualContent}>
              <h2>Chào mừng bạn đến với chúng tôi!</h2>
              <p>Đăng ký hôm nay để nhận ngay ưu đãi đặc biệt</p>
              <div className={styles.decorativeCircles}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
