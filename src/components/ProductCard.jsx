import {
  CloseCircleOutlined,
  CloseOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BasicModal, Rating, numberWithCommas } from "../Common";
import { auth } from "../firebase";
import { addCart } from "../redux/cartItemSlice";
import { Button, Modal } from "antd";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
const ProductCard = (props) => {
  const { data } = props;
  const [user, setUser] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (user) {
      const newItems = {
        id: data.id,
        title: data.title,
        image: data.image,
        price: data.price,
      };
      dispatch(addCart(newItems));
      toast.success("Thêm vào giỏ hàng thành công!!");
    } else if (!user) {
      alert("Vui lòng đăng nhập trước!");
      navigate("/login");
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // nếu mobile thì full
  return (
    <div className="product__card">
      <div className="product__card__item">
        <div className="product__card__item__img">
          <img
            src={data.image}
            alt=""
            className="product__card__item__img__view"
          />
        </div>
        <div className="product__card__item__info">
          <h1 className="product__card__item__info__name">{data.title}</h1>
          <div className="product__card__item__info__content">
            <p className="product__card__item__info__content__price">
              {numberWithCommas(data.price)}&nbsp;đ&nbsp;&nbsp;
            </p>
            <div className="product__card__item__info__content__rate">
              <Rating data={data.rating.rate} />
            </div>
          </div>
        </div>
        <div className="product-image-inner">
          <Link
            to={`/catelog/${props.data.id}`}
            className="button add_to_cart_button"
          >
            <span>Add to cart</span>
          </Link>
          <div className="product-additional-content">
            <div className="lines"></div>
            <div className="product-additional-content__view">
              <span className="product-additional-content__view-icon">
                <Button icon={<EyeOutlined />} onClick={handleOpen} />
              </span>
              {open && (
                <Modal
                  open={open}
                  onCancel={handleClose}
                  footer={null}
                  closeIcon={
                    <Button
                      style={{ outline: "none", border: "none" }}
                      icon={<CloseOutlined style={{ fontSize: 24 }} />}
                    />
                  }
                >
                  <BasicModal item={props} />
                </Modal>
              )}
            </div>
            <div className="product-additional-content__heart">
              <p
                className="product-additional-content__view-icon"
                onClick={handleAdd}
              >
                <Button icon={<HeartOutlined />} />
              </p>
            </div>
          </div>
        </div>
        <Link to={`/catelog/${data.id}`}></Link>
      </div>
    </div>
  );
};

export default ProductCard;
