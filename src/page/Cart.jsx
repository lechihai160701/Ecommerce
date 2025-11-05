import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Banner, Helmet } from "../Common";
import {
  decreaseQuantity,
  deleteCart,
  increaseQuantity,
} from "../redux/cartItemSlice";

const Cart = () => {
  const { carts, numberCart } = useSelector((state) => state.cart);
  const [localCarts, setLocalCarts] = useState(carts);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Đồng bộ Redux → Local State
  useEffect(() => {
    setLocalCarts(carts);
  }, [carts]);

  // Tính tổng tiền của các sản phẩm được chọn
  const totalPrice = useMemo(() => {
    return localCarts
      .filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [localCarts, selectedItems]);

  // Xử lý tăng/giảm số lượng
  const handleChangeQuantity = (type, id) => {
    setLocalCarts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (type === "PLUS") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (type === "MINUS" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else if (item.quantity === 1) {
          toast.warning("Số lượng tối thiểu là 1");
          return item;
        }
        return item;
      })
    );
  };

  // Xử lý chọn sản phẩm
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === localCarts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(localCarts.map((item) => item.id));
    }
  };

  // Xóa sản phẩm
  const removeCartItem = (id) => {
    const item = localCarts.find((x) => x.id === id);
    dispatch(deleteCart(item));
    setSelectedItems((prev) => prev.filter((x) => x !== id));
    toast.success("Đã xóa sản phẩm!");
  };

  const removeSelected = () => {
    if (selectedItems.length === 0) {
      toast.warning("Vui lòng chọn sản phẩm để xóa");
      return;
    }
    selectedItems.forEach((id) => {
      const item = localCarts.find((x) => x.id === id);
      dispatch(deleteCart(item));
    });
    setSelectedItems([]);
    toast.success("Đã xóa các sản phẩm đã chọn!");
  };

  // Đặt hàng
  const handleOrder = () => {
    if (selectedItems.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng!");
      return;
    }
    selectedItems.forEach((id) => {
      const item = localCarts.find((x) => x.id === id);
      dispatch(deleteCart(item));
    });
    toast.success("Đặt hàng thành công! Kiểm tra email sau 3 ngày ^_^");
    setTimeout(() => navigate("/"), 2000);
  };

  // Cập nhật Redux khi localCarts thay đổi
  useEffect(() => {
    if (
      localCarts.length !== carts.length ||
      JSON.stringify(localCarts) !== JSON.stringify(carts)
    ) {
      const increased = localCarts.filter((local) => {
        const reduxItem = carts.find((r) => r.id === local.id);
        return reduxItem && local.quantity > reduxItem.quantity;
      });
      const decreased = localCarts.filter((local) => {
        const reduxItem = carts.find((r) => r.id === local.id);
        return reduxItem && local.quantity < reduxItem.quantity;
      });

      if (increased.length > 0) dispatch(increaseQuantity(localCarts));
      if (decreased.length > 0) dispatch(decreaseQuantity(localCarts));
    }
  }, [localCarts, carts, dispatch]);

  return (
    <Fragment>
      <Helmet title="Giỏ hàng">
        <Banner
          img="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
          height={200}
          borderRadius={16}
          marginBottom={30}
        />

        <div className="cart">
          {/* Danh sách sản phẩm */}
          <div className="cart__list">
            {localCarts.length === 0 ? (
              <div className="empty-cart">
                <img
                  src="https://bizweb.dktcdn.net/100/368/179/themes/738982/assets/empty-cart.png?1609300798440"
                  alt="Giỏ hàng trống"
                />
                <p>Giỏ hàng của bạn đang trống</p>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginTop: 16 }}
                  onClick={() => navigate("/product")}
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            ) : (
              <>
                {/* Header chọn tất cả */}
                <div className="cart__header">
                  <Checkbox
                    checked={
                      selectedItems.length === localCarts.length &&
                      localCarts.length > 0
                    }
                    indeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < localCarts.length
                    }
                    onChange={handleSelectAll}
                  />
                  <span>Chọn tất cả ({localCarts.length})</span>
                  {selectedItems.length > 0 && (
                    <Button
                      danger
                      size="small"
                      onClick={removeSelected}
                      icon={<DeleteOutlined />}
                    >
                      Xóa đã chọn
                    </Button>
                  )}
                </div>

                {/* Danh sách sản phẩm */}
                {localCarts.map((cart) => (
                  <div className="cart__item" key={cart.id}>
                    <div className="cart__item__select">
                      <Checkbox
                        checked={selectedItems.includes(cart.id)}
                        onChange={() => handleSelectItem(cart.id)}
                      />
                    </div>

                    <div className="cart__item__img">
                      <img src={cart.image} alt={cart.title} />
                    </div>

                    <div className="cart__item__info">
                      <div className="cart__item__info__name">{cart.title}</div>
                      <div className="cart__item__info__price">
                        {(cart.price * cart.quantity).toLocaleString("en-US")}$
                      </div>
                    </div>

                    <div className="cart__item__quantity">
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleChangeQuantity("MINUS", cart.id)}
                        size="small"
                      />
                      <span>{cart.quantity}</span>
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleChangeQuantity("PLUS", cart.id)}
                        size="small"
                      />
                    </div>

                    <div
                      className="cart__item__del"
                      onClick={() => removeCartItem(cart.id)}
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Tổng tiền & Hành động */}
          <div className="cart__info">
            <div className="cart__info__txt">
              <p>
                <ShoppingCartOutlined /> Shopping Bag (
                {selectedItems.length || 0})
              </p>
              <div className="cart__info__txt__price">
                <span>Thành tiền</span>
                <span>{totalPrice.toLocaleString("en-US")}$</span>
              </div>
            </div>
            <div className="cart__info__btn">
              <Button type="primary" size="large" block onClick={handleOrder}>
                Đặt hàng
              </Button>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => {
                  navigate("/product");
                }}
              >
                Tiếp tục mua hàng
              </Button>
            </div>
          </div>
        </div>
      </Helmet>
    </Fragment>
  );
};

export default React.memo(Cart);
