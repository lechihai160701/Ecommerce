import {
  DeleteOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Button, Card, Empty, Space } from "antd";
import axios from "axios";
import clsx from "clsx";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { addCart } from "../../redux/cartItemSlice";
import { addHeart, deleteHeart } from "../../redux/heartSlice";
import styles from "./Profile.module.scss";
import { setInfoUser } from "../../redux/userSlice";

const cn = (...inputs) => clsx(inputs);

const Index = () => {
  const { info } = useSelector((state) => state.user);
  let { hearts } = useSelector((state) => state.heart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { modal } = App.useApp();

  const logOut = () => signOut(auth);

  const [activeTab, setActiveTab] = useState("info");
  const [data, setData] = useState([]);
  const [listHeart, setListHeart] = useState([]);

  // Giả lập data user (sau này lấy từ context/auth API)
  const currentUser = {
    name: "Người đại diện",
    email: info || "",
    phone: "0987 654 321",
    avatar:
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    joinDate: "15/03/2023",
    totalOrders: 68,
    totalSpent: 48750000,
  };

  const menuItems = [
    { key: "info", icon: <UserOutlined />, label: "Thông tin cá nhân" },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Đơn hàng của tôi",
    },
    { key: "history", icon: <HistoryOutlined />, label: "Lịch sử mua hàng" },
    { key: "addresses", icon: <HomeOutlined />, label: "Sổ địa chỉ" },
    { key: "wishlist", icon: <HeartOutlined />, label: "Sản phẩm yêu thích" },
    { key: "password", icon: <LockOutlined />, label: "Đổi mật khẩu" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const handleRemoveFromWishlist = (id) => {
    modal.confirm({
      title: "Thông báo",
      content: <div>Xác nhận xóa yêu thích này</div>,
      okText: "Xác nhận",
      cancelText: "Hủy",
      maskClosable: true,
      onCancel() {},
      onOk() {
        const newItems = {
          id,
        };
        let isCheck = hearts.find((item) => item.id === id);
        if (isCheck) {
          dispatch(deleteHeart(newItems));
          toast.success("Đã bỏ yêu thích");
        } else if (!isCheck) {
          dispatch(addHeart(newItems));
          toast.success("Đã thêm vào yêu thích");
        }
      },
    });
  };

  const handleAddToCart = (product) => {
    const newItems = {
      id: product.id,
      quantity: 1,
      title: product.title,
      image: product.image,
      price: product.price,
    };
    dispatch(addCart(newItems));
    toast.success("Đã thêm vào giỏ hàng!");
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      dispatch(setInfoUser(null));
      navigate("/login");
    } catch (error) {
      alert(error || "Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    const check = [...new Set(hearts.map((item) => item.id))];
    const result = data.filter((item) => check.includes(item.id));
    console.log("result", result);
    setListHeart(result);
  }, [data, hearts]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (res.status === 200) {
          setData(res.data);
        } else if (res.status !== 200) {
          alert("Có lỗi!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.userCard}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={styles.avatar}
            />
            <h3 className={styles.userName}>{currentUser.name}</h3>
            <p className={styles.userEmail}>
              <MailOutlined /> {currentUser.email}
            </p>
          </div>

          <nav className={styles.menu}>
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={cn(
                  styles.menuItem,
                  activeTab === item.key && styles.active,
                  item.danger && styles.danger
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          <div className={styles.contentHeader}>
            <h2>{menuItems.find((i) => i.key === activeTab)?.label}</h2>
          </div>

          {/* Tab: Thông tin cá nhân */}
          {activeTab === "info" && (
            <div className={styles.infoTab}>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Thành viên từ</span>
                  <strong>{currentUser.joinDate}</strong>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Tổng đơn hàng</span>
                  <strong>{currentUser.totalOrders} đơn</strong>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Tổng chi tiêu</span>
                  <strong>
                    {currentUser.totalSpent.toLocaleString("vi-VN")} ₫
                  </strong>
                </div>
              </div>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <label>Họ tên</label>
                  <p>{currentUser.name}</p>
                </div>
                <div className={styles.infoRow}>
                  <label>
                    <MailOutlined /> Email
                  </label>
                  <p>{currentUser.email}</p>
                </div>
                <div className={styles.infoRow}>
                  <label>
                    <PhoneOutlined /> Số điện thoại
                  </label>
                  <p>{currentUser.phone}</p>
                </div>
              </div>

              <button className={styles.editBtn}>Chỉnh sửa thông tin</button>
            </div>
          )}

          {/* Các tab khác chỉ cần thêm nội dung tương tự */}
          {activeTab === "orders" && (
            <div className={styles.emptyTab}>
              <ShoppingCartOutlined className={styles.emptyIcon} />
              <p>Chưa có đơn hàng nào đang xử lý</p>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className={styles.wishlistTab}>
              {listHeart.length === 0 ? (
                <Empty
                  image={
                    <HeartOutlined style={{ fontSize: 80, color: "#e0e0e0" }} />
                  }
                  description={
                    <span style={{ fontSize: "1.1rem", color: "#999" }}>
                      Chưa có sản phẩm nào trong danh sách yêu thích
                    </span>
                  }
                >
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginTop: 16 }}
                    onClick={() => navigate("/")}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Empty>
              ) : (
                <div className={styles.productGrid}>
                  {listHeart.map((product) => (
                    <Card
                      key={product.id}
                      hoverable
                      className={styles.productCard}
                      cover={
                        <div className={styles.imageWrapper}>
                          <img
                            alt={product.title}
                            src={product.image}
                            className={styles.productImage}
                          />
                          <div className={styles.heartIcon}>
                            <HeartOutlined />
                          </div>
                        </div>
                      }
                    >
                      <div className={styles.productContent}>
                        <h3 className={styles.productTitle}>
                          {product.title.length > 60
                            ? `${product.title.substring(0, 60)}...`
                            : product.title}
                        </h3>

                        <div className={styles.productPrice}>
                          {product.price.toLocaleString("vi-VN")}₫
                        </div>

                        <div className={styles.productActions}>
                          <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            size="large"
                            block
                            className={styles.addToCartBtn}
                            onClick={() => handleAddToCart(product)}
                          >
                            Thêm vào giỏ hàng
                          </Button>

                          <div>
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              size="large"
                              className={styles.removeBtn}
                              onClick={() =>
                                handleRemoveFromWishlist(product.id)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {["history", "addresses", "password"].includes(activeTab) && (
            <div className={styles.comingSoon}>
              <p>Tính năng đang được phát triển</p>
            </div>
          )}

          {activeTab === "logout" && (
            <>
              <div className={styles.logoutConfirm}>
                Bạn có chắc muốn đăng xuất?
              </div>
              <Space style={{ margin: "15px 0" }}>
                <Button onClick={handleLogOut} type="primary">
                  Có
                </Button>
                <Button danger>Không</Button>
              </Space>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
