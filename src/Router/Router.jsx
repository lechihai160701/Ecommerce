import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Cart,
  Product,
  Contact,
  Home,
  Login,
  NotFound,
  Register,
  Profile,
} from "../Common";
const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product" element={<Product />}>
        <Route index element={<Product />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
