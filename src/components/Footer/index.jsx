import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  QqOutlined,
  TwitterSquareFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Index = () => {
  const supportLinks = [
    { title: "Trung tâm trợ giúp", path: "/help" },
    { title: "Hướng dẫn mua hàng", path: "/guide" },
    { title: "Chính sách vận chuyển", path: "/shipping" },
    { title: "Chính sách đổi trả", path: "/return" },
    { title: "Hỏi đáp", path: "/faq" },
  ];

  const aboutLinks = [
    { title: "Giới thiệu", path: "/about" },
    { title: "Tuyển dụng", path: "/career" },
    { title: "Tin tức", path: "/news" },
    { title: "Blog", path: "/blog" },
    { title: "Hợp tác kinh doanh", path: "/partner" },
  ];

  const customerLinks = [
    { title: "Điều khoản sử dụng", path: "/terms" },
    { title: "Chính sách bảo mật", path: "/privacy" },
    { title: "Chính sách cookie", path: "/cookie" },
    { title: "Cài đặt quyền riêng tư", path: "/privacy-settings" },
  ];

  const paymentMethods = [
    "/images/payments/visa.png",
    "/images/payments/mastercard.png",
    "/images/payments/momo.png",
    "/images/payments/zalo.png",
    "/images/payments/shopeepay.png",
    "/images/payments/cod.png",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Cột 1: Hỗ trợ khách hàng */}
          <div className={styles.column}>
            <h3 className={styles.title}>Hỗ trợ khách hàng</h3>
            <ul className={styles.list}>
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: Về chúng tôi */}
          <div className={styles.column}>
            <h3 className={styles.title}>Về chúng tôi</h3>
            <ul className={styles.list}>
              {aboutLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Chăm sóc khách hàng */}
          <div className={styles.column}>
            <h3 className={styles.title}>Chính sách & Điều khoản</h3>
            <ul className={styles.list}>
              {customerLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Thanh toán */}
          <div className={styles.column}>
            <h3 className={styles.title}>Phương thức thanh toán</h3>
            <div className={styles.paymentGrid}>
              {paymentMethods.map((src, i) => (
                <div key={i} className={styles.paymentItem}>
                  <img src={src} alt="payment method" />
                </div>
              ))}
            </div>
          </div>

          {/* Cột 5: Kết nối & Tải app */}
          <div className={styles.column}>
            <h3 className={styles.title}>Kết nối với chúng tôi</h3>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>
                <FacebookFilled />
              </a>
              <a href="#" className={styles.socialLink}>
                <InstagramFilled />
              </a>
              <a href="#" className={styles.socialLink}>
                <TwitterSquareFilled />
              </a>
              <a href="#" className={styles.socialLink}>
                <GithubFilled />
              </a>
            </div>

            <div className={styles.downloadApp}>
              <p className={styles.downloadText}>Tải ứng dụng ngay!</p>
              <div className={styles.qrWrapper}>
                <div className={styles.qrCode}>
                  <QqOutlined style={{ fontSize: 80, color: "#ddd" }} />
                </div>
                <div className={styles.storeButtons}>
                  <a href="#">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                      alt="App Store"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                      alt="Google Play"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>
            © 2025 <strong>YourShop</strong>. All rights reserved. Made with
            love in Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Index;
