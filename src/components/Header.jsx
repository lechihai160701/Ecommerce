import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import {
  DownOutlined,
  HeartOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import logo from "../logo.png";
import { setInfoUser } from "../redux/userSlice";
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/product",
  },
  {
    display: "Bài viết",
    path: "/blog",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const dispath = useDispatch();
  const { numberCart } = useSelector((state) => state.cart);
  const { numberHeart } = useSelector((state) => state.heart);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState("");
  const navActive = mainNav.findIndex((i) => i.path === pathname);
  const logOut = () => signOut(auth);
  const menuRef = useRef(null);
  const menuToggle = () => {
    menuRef.current.classList.toggle("active");
  };

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      dispath(setInfoUser(null));
      navigate("/login");
    } catch (error) {
      alert(error || "Có lỗi xảy ra!");
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          <UserOutlined /> Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogOut}>
          <LogoutOutlined /> Đăng xuất
        </div>
      ),
    },
  ];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      dispath(setInfoUser(currentuser?.email));
    });
    return () => {
      unsubscribe();
    };
  }, [dispath]);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <>
            <Link to="/">
              <img src={logo} alt="" className="logo__main" />
            </Link>
          </>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile--toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuRef}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === navActive ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>{item.display}</Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__right__item" title="Yêu thích">
              <Badge count={numberHeart} showZero>
                <HeartOutlined style={{ fontSize: 24 }} />
              </Badge>
            </div>
            <div className="header__menu__right__item" title="Giỏ hàng">
              <Badge count={numberCart} showZero>
                <Link to="/cart">
                  <ShoppingCartOutlined style={{ fontSize: 24 }} />
                </Link>
              </Badge>
            </div>
            <div className="header__user">
              {user ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                >
                  <div className="header__user__logged">
                    <Avatar
                      src={user.photoURL || undefined}
                      icon={!user.photoURL && <UserOutlined />}
                      size="default"
                    />
                    <span className="header__user__name">
                      Xin chào,{" "}
                      {user.displayName?.split(" ")[0] ||
                        user.email?.split("@")[0] ||
                        "Bạn"}
                    </span>
                    <DownOutlined className="header__user__arrow" />
                  </div>
                </Dropdown>
              ) : (
                <Link to="/login" className="header__menu__right__item">
                  <Button
                    type="text"
                    size="large"
                    className="header__login-btn"
                  >
                    <UserOutlined /> Đăng nhập
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
