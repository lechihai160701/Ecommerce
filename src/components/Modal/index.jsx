import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid } from "../../Common";
import { auth } from "../../firebase";
import { addCart } from "../../redux/cartItemSlice";
import clsx from "clsx";
import styles from "./Modal.module.scss";

const BasicModal = (props) => {
  const { item } = props;
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleQuantity = (type) => {
    if (type === "PLUS") {
      setQuantity((prev) => {
        return prev + 1;
      });
    } else if (type === "MINUS") {
      setQuantity((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (user) {
      const newItems = {
        id: item.data.id,
        title: item.data.title,
        image: item.data.image,
        price: item.data.price,
        quantity: quantity,
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
  return (
    <div>
      <div className={clsx(styles.product)}>
        <Grid col={2} mdCol={1} smCol={1}>
          <div className={clsx(styles.product_left)}>
            <figure className={clsx(styles.product_left_image)}>
              <Image src={item.data.image} alt={item.data.item} />
            </figure>
          </div>
          <div className={clsx(styles.product_right)}>
            <h1 className={clsx(styles.product_right_title)}>
              {item.data.title}
            </h1>
            <p className={clsx(styles.product_right_price)}>
              {item.data.price}đ
            </p>
            <p className={clsx(styles.product_right_desc)}>
              {item.data.description}
            </p>

            <div className={clsx(styles.product_right_inner)}>
              <div className={clsx(styles.product_right_inner_props)}>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handleQuantity("PLUS")}
                  shape="default"
                />
                <div className={clsx(styles.product_right_inner_quantity)}>
                  <span>{quantity}</span>
                </div>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => handleQuantity("MINUS")}
                  shape="default"
                />
              </div>
            </div>
            <div className={clsx(styles.product_right_inner_btn)}>
              <button
                className={`${clsx(
                  styles.btn,
                  styles.btn_add_to_cart,
                  styles.btn_modal
                )}`}
                onClick={handleAdd}
              >
                Add to cart
              </button>
              <button
                className={clsx(
                  styles.btn,
                  styles.btn_cart_details,
                  styles.btn_primary
                )}
                onClick={() => {
                  navigate(`/product/?nameProduct=${item.data.title}`);
                }}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default BasicModal;
