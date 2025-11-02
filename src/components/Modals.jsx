import Box from "@mui/material/Box";
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
      setQuantity((prev) => prev + 1);
    } else if (type === "MINUS") {
      setQuantity((prev) => prev - 1);
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
              <img src={item.data.image} alt={`${item.data.title}`} />
            </figure>
          </div>
          <div className="product-right">
            <h1 className="product-right-title">{item.data.title}</h1>
            <p className="product-right-price">{item.data.price}đ</p>
            <p className="product-right-desc">{item.data.description}</p>

            <div className="product-right-inner">
              <div className="product-right-inner-quantity">
                <span>{quantity}</span>
                <div className="product-right-inner-quantity-btn">
                  <button onClick={() => handleQuantity("PLUS")}>+</button>
                  <button onClick={() => handleQuantity("MINUS")}>-</button>
                </div>
              </div>
              <button
                className="btn btn-add-to-cart btn-modal"
                onClick={handleAdd}
              >
                Add to cart
              </button>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};
export default BasicModal;
