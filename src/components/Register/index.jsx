import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import clsx from "clsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "../../Common";
import { auth } from "../../firebase";
import styles from "../../page/Login/Login.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = () => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Helmet title="Đăng ký">
      <div className={clsx(styles.register)}>
        <div className={clsx(styles.register__name)}>Register</div>
        <form onSubmit={handleSubmit} className={clsx(styles.form)}>
          <div className={clsx(styles.form__group)}>
            <input
              type="text"
              placeholder="Email..."
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mật khẩu..."
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Xác nhận lại mật khẩu..."
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            htmlType="submit"
          >
            Register
          </Button>
        </form>
        {error && (
          <span className={`error ${clsx(styles.error)}`}>
            {error || "Có lỗi xảy ra!"}
          </span>
        )}
        <div className={clsx(styles.login__regis)}>
          <Link to="/login">Back to login page?</Link>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
