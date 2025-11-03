import { Input, Select } from "antd";
import clsx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Grid,
  ProductCard,
  Section,
  SectionBody,
  SectionTitle,
} from "../../Common";
import ProductCardSkeleton from "../ProductCardSkeleton";
import styles from "./ProductHandle.module.scss";

const ProductHandle = (props) => {
  const { product, category } = props;
  const [allProducts, setAllProducts] = useState(product); // danh sách gốc
  const [filteredProducts, setFilteredProducts] = useState(product); // danh sách hiển thị
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const refInput = useRef(null);

  // Hàm xử lý lọc tổng hợp (theo cả category và search)
  const filterProducts = (categoryValue, searchValue) => {
    let result = allProducts;

    if (categoryValue.trim() !== "") {
      result = result.filter((item) =>
        item.category.toUpperCase().includes(categoryValue.toUpperCase())
      );
    }

    if (searchValue.trim() !== "") {
      result = result.filter((item) =>
        item.title.toUpperCase().includes(searchValue.toUpperCase())
      );
    }

    return result;
  };

  const handleSearchProduct = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setIsLoading(true);
    setTimeout(() => {
      const result = filterProducts(selectedCategory, value);
      setFilteredProducts(result);
      setIsLoading(false);
    }, 500);
  };

  const handleChangeCategory = (value) => {
    setSelectedCategory(value || ""); // clear = ""
    setIsLoading(true);
    setTimeout(() => {
      const result = filterProducts(value || "", searchText);
      setFilteredProducts(result);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (product.length > 0) {
      setAllProducts(product);
      setFilteredProducts(product);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [product]);

  return (
    <Fragment>
      <Section>
        <SectionBody>
          <div className={clsx(styles.product_handle_filter)}>
            <span>Sắp xếp theo:</span>
            <div className={clsx(styles.product_handle_filter_option)}>
              <Select
                className={clsx(styles.product_handle_filter_option_select)}
                placeholder="Danh mục"
                onChange={handleChangeCategory}
                allowClear
              >
                {category.map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
              <Input.Search
                className={clsx(styles.product_handle_filter_option_input)}
                placeholder="Tên sản phẩm"
                ref={refInput}
                onChange={handleSearchProduct}
                value={searchText}
              />
            </div>
          </div>
        </SectionBody>
      </Section>

      <div className={clsx(styles.product_name)}>
        <SectionTitle>Product</SectionTitle>
      </div>

      <SectionBody>
        {!isLoading ? (
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </Grid>
        ) : (
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </Grid>
        )}
      </SectionBody>
    </Fragment>
  );
};

export default ProductHandle;
