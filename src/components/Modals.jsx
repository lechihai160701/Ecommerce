import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid } from "../Common";
import { auth } from "../firebase";
import { addCart } from "../redux/cartItemSlice";

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
      <div className="product">
        <Grid col={2} mdCol={1} smCol={1}>
          <div className="product-left">
            <figure className="product-left-image">
              <Image src={item.data.image} alt={item.data.item} />
            </figure>
          </div>
          <div className="product-right">
            <h1 className="product-right-title">{item.data.title}</h1>
            <p className="product-right-price">{item.data.price}đ</p>
            <p className="product-right-desc">{item.data.description}</p>

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
            <div className="product-right-inner-btn">
              <button
                className="btn btn-add-to-cart btn-modal"
                onClick={handleAdd}
              >
                Add to cart
              </button>
              <button
                className="btn btn-cart-details btn-primary"
                onClick={() => navigate("/catelog")}
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
