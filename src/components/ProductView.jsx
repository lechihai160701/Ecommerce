import {
  LoadingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Select, Spin } from "antd";
import clsx from "clsx";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  colors,
  Comment,
  Helmet,
  options,
  Rating,
  Refer,
  Section,
  SectionBody,
} from "../Common/index";
import { auth } from "../firebase";
import { addCart } from "../redux/cartItemSlice";
const ProductView = ({ product }) => {
  const [user, setUser] = useState("");
  const [selectPlace, setSelectPlace] = useState("Tp.HCM");
  const [color, setColor] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const check = () => {
    if (quantity < 0) {
      return false;
    }
    return true;
  };
  const handleColor = (props) => {
    setActive(props);
    setColor(colors.find((item) => item.id === props).name);
  };
  const handleQuantity = (type) => {
    if (type === "PLUS") {
      setQuantity((prev) => prev + 1);
    } else if (type === "MINUS") {
      setQuantity((prev) => prev - 1);
      if (quantity === 1) {
        alert("Tổi thiểu là một sản phẩm");
        setQuantity(1);
      }
    }
  };
  const goToCart = () => {
    if (user && check) {
      toast.success(
        "Cảm ơn bạn đã mua hàng. Vui lòng kiểm tra mail sau 3 ngày ^^"
      );
    } else if (!user) {
      alert("Please login account");
      navigate("/login");
    }
  };
  const addToCart = () => {
    if (user) {
      const newProduct = {
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: quantity,
      };
      dispatch(addCart(newProduct));
      toast.success("Đã thêm thành công sản phẩm");
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {}, [selectPlace]);
  useEffect(() => {}, [color]);

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  return (
    <Helmet title={product ? product?.title : ""}>
      <div className="product">
        <div className="product__view">
          <div className="product__view__refer">
            <div className="product__view__refer__left">
              <div className="product__view__refer__left__img">
                <img
                  src={product?.image}
                  alt=""
                  className="product__view__refer__left__img--avt"
                />
              </div>
            </div>
            <div className="product__view__refer__right">
              <h1 className="product__view__refer__right__name">
                {product?.title}
              </h1>
              <div className="product__view__refer__right__rating">
                <i style={{ marginRight: 5 }}>
                  <u>{product?.rating.rate}</u>
                </i>
                <Rating data={product?.rating.rate} />
                <span className="line__straight"></span>
                <Refer data={product?.rating.count} />
              </div>
              <div className="product__view__refer__right__price">
                <span>{product?.price}$</span>
              </div>
              <div className="product__view__refer__right__tranpost">
                <div className="product__view__refer__right__tranpost__content">
                  <span className="product__view__refer__right__tranpost__content__title">
                    Vận chuyển
                  </span>
                  <div className="product__view__refer__right__tranpost__content__arrive">
                    <span>Vận chuyển đi</span>
                    <Select
                      onChange={(e) => setSelectPlace(e.target.value)}
                      value={selectPlace}
                    >
                      {options.map((option, i) => (
                        <Select.Option value={option.name} key={i}>
                          {option.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="product__view__refer__right__color">
                <span className="product__view__refer__right__color__title">
                  Màu sắc
                </span>
                {colors.map((color, i) => (
                  <button
                    className={clsx(
                      `product__view__refer__right__color__btn`,
                      `${
                        active === color.id
                          ? "product__view__refer__right__color__btn--active"
                          : ""
                      } `
                    )}
                    onClick={() => handleColor(color.id)}
                    key={i}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
              <div className="product__view__refer__right__count">
                <span className="product__view__refer__right__count__title">
                  Số lượng
                </span>
                <div className="product-right-inner">
                  <div className="product-right-inner-props">
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleQuantity("PLUS")}
                      shape="default"
                    />
                    <div className="product-right-inner-quantity">
                      <span>{quantity}</span>
                    </div>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => handleQuantity("MINUS")}
                      shape="default"
                    />
                  </div>
                </div>
              </div>
              <div className="product__view__refer__right__item">
                <div className="product__view__refer__right__item__add">
                  <Button onClick={() => goToCart()} size="large">
                    Mua ngay
                  </Button>
                  <Button onClick={() => addToCart()} size="large">
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
