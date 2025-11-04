import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Grid, Modal, Tooltip } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BasicModal, Rating, numberWithCommas } from "../Common";
import { auth } from "../firebase";
import { addCart } from "../redux/cartItemSlice";
import { addHeart, deleteHeart } from "../redux/heartSlice";

const { useBreakpoint } = Grid;
const ProductCard = (props) => {
  const { carts } = useSelector((state) => state.cart);
  const { hearts } = useSelector((state) => state.heart);
  const { data } = props;
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const screens = useBreakpoint();

  let modalWidth = "100%";
  if (screens.xl) modalWidth = "60%";
  else if (screens.lg) modalWidth = "70%";
  else if (screens.md) modalWidth = "80%";
  else modalWidth = "95%";

  const handleAdd = (e) => {
    e.preventDefault();
    if (user) {
      const newItems = {
        id: data.id,
        quantity: 1,
        title: data.title,
        image: data.image,
        price: data.price,
      };
      dispatch(addCart(newItems));
      toast.success("Thêm vào giỏ hàng thành công!");
      navigate("/cart");
    } else if (!user) {
      alert("Vui lòng đăng nhập trước!");
      navigate("/login");
    }
  };

  const handleToggleHeartSlice = (e) => {
    e.preventDefault();
    const newItems = {
      id: data.id,
    };
    let isCheck = hearts.find((item) => item.id === data.id);

    if (isCheck) {
      dispatch(deleteHeart(newItems));
      toast.success("Đã bỏ yêu thích");
    } else if (!isCheck) {
      dispatch(addHeart(newItems));
      toast.success("Đã thêm vào yêu thích");
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

  return (
    <div className="product__card__item">
      <div className="product__card__item__img">
        <img
          src={data.image}
          alt=""
          className="product__card__item__img__view"
        />
        <div className="product-image-inner">
          <span className="button add_to_cart_button" onClick={handleAdd}>
            <span>Add to cart</span>
          </span>

          <div className="product-additional-content">
            <div className="lines"></div>

            <div className="product-additional-content__view">
              <span className="product-additional-content__view-icon">
                <Tooltip title="Xem trước">
                  <Button icon={<EyeOutlined />} onClick={handleOpen} />
                </Tooltip>
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
                  width={modalWidth}
                >
                  <BasicModal item={props} />
                </Modal>
              )}
            </div>

            <div className="product-additional-content__heart">
              <p className="product-additional-content__view-icon">
                {(() => {
                  let isCheck = hearts.find((item) => item.id === data.id);
                  return (
                    <Button
                      icon={!isCheck ? <HeartOutlined /> : <HeartFilled />}
                      onClick={handleToggleHeartSlice}
                    />
                  );
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="product__card__item__info">
        <h1 className="product__card__item__info__name">
          <Link to={`/product/?nameProduct=${data.title}`}>{data.title}</Link>
        </h1>
        <div className="product__card__item__info__content">
          <p className="product__card__item__info__content__price">
            {numberWithCommas(data.price)}&nbsp;đ&nbsp;&nbsp;
          </p>
          <div className="product__card__item__info__content__rate">
            <Rating data={data.rating.rate} />
          </div>
        </div>
      </div>

      {(() => {
        const check = carts.find((item) => item.id === data.id);
        if (check) {
          return (
            <div className="product__card__item__isAdd">
              <span className="product__card__item__isAdd-add">
                <Tooltip title="Đã thêm vào giỏ hàng">
                  <CheckOutlined />
                </Tooltip>
              </span>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default ProductCard;
