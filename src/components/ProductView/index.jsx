import {
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Comment, Helmet, Rating, Section, SectionBody } from "../../Common";
import { addCart } from "../../redux/cartItemSlice";
import styles from "./ProductView.module.scss";

const ProductView = ({ product }) => {
  const { info } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("Đen");
  const [selectedImage, setSelectedImage] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colors = ["Đen", "Trắng", "Xanh Navy", "Đỏ", "Xám"];
  const thumbnails = product?.thumbnails || [
    product?.image,
    product?.image,
    product?.image,
  ];

  useEffect(() => {
    if (info) {
      setUser(info);
    } else {
      setUser(null);
    }
  }, [info]);

  const handleQuantity = (type) => {
    if (type === "plus") setQuantity((prev) => prev + 1);
    if (type === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    dispatch(
      addCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        color: selectedColor,
      })
    );
    message.success("Đã thêm vào giỏ hàng!");
  };

  const handleAddHeart = () => {};

  const buyNow = () => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để mua hàng!");
      navigate("/login");
      return;
    }
    addToCart();
    navigate("/cart");
  };

  if (!product) {
    return <div className={styles.loading}>Đang tải sản phẩm...</div>;
  }
  return (
    <Helmet title={product.title}>
      <div className={styles.container}>
        <div className={styles.productDetail}>
          {/* Ảnh sản phẩm */}
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img src={thumbnails[selectedImage]} alt={product.title} />
            </div>
            <div className={styles.thumbnailList}>
              {thumbnails.map((img, i) => (
                <div
                  key={i}
                  className={`${styles.thumbnail} ${
                    selectedImage === i ? styles.active : ""
                  }`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`thumbnail ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.rating}>
              <Rating value={product?.rating.rate || 4.5} />
              <span className={styles.ratingText}>
                {product.rating?.rate}{" "}
                <span className={styles.count}>
                  ({product.rating?.count} đánh giá)
                </span>
              </span>
            </div>

            <div className={styles.price}>
              <span className={styles.currentPrice}>
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>
                  {product.originalPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>

            <div className={styles.colorSection}>
              <h4>Màu sắc:</h4>
              <div className={styles.colorOptions}>
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`${styles.colorBtn} ${
                      selectedColor === color ? styles.active : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantitySection}>
              <h4>Số lượng:</h4>
              <div className={styles.quantityControl}>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => handleQuantity("minus")}
                />
                <span className={styles.quantity}>{quantity}</span>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handleQuantity("plus")}
                />
              </div>
            </div>

            <div className={styles.actionButtons}>
              <Button
                type="primary"
                size="large"
                className={styles.buyNowBtn}
                icon={<ShoppingCartOutlined />}
                onClick={buyNow}
              >
                Mua ngay
              </Button>
              <Button
                size="large"
                className={styles.addToCartBtn}
                onClick={addToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                icon={<HeartOutlined />}
                size="large"
                className={styles.wishlistBtn}
                onClick={handleAddHeart}
              >
                Yêu thích
              </Button>
            </div>

            <div className={styles.shippingInfo}>
              <p>Miễn phí vận chuyển toàn quốc</p>
              <p>Đổi trả trong 30 ngày</p>
              <p>Bảo hành chính hãng 12 tháng</p>
            </div>
          </div>
        </div>

        {/* Mô tả chi tiết */}
        <Section>
          <SectionBody>
            <div className={styles.description}>
              <h2>Mô tả sản phẩm</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    product.description ||
                    "Sản phẩm chất lượng cao, thiết kế hiện đại...",
                }}
              />
            </div>
          </SectionBody>
        </Section>

        <Section>
          <SectionBody>
            <div className="line"></div>
            <Comment data={product?.rating.rate} />
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default ProductView;
