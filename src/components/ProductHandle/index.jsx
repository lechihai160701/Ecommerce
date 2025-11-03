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

const ProductHanlde = (props) => {
  const { product, category } = props;
  const [products, setProducts] = useState(product);
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef(null);

  const handleSearchProduct = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      const search = e.target.value;
      if (search.trim() !== "") {
        let result = products.filter((item) => {
          return item.title.toUpperCase().includes(search.toUpperCase());
        });
        setProducts(result);
        refInput.current.focus();
        setIsLoading(false);
      } else {
        setProducts(product);
        setIsLoading(false);
        refInput.current.focus();
      }
    }, 1000);
  };

  const handleChangeCategory = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      if (e.trim() !== "") {
        let result = products.filter((item) => {
          return item.category.toUpperCase().includes(e.toUpperCase());
        });
        setProducts(result);
        setIsLoading(false);
      } else {
        setProducts(product);
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (product.length > 0) {
      setIsLoading(false);
      setProducts(product);
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
                type="text"
                placeholder="Tên sản phẩm"
                ref={refInput}
                onChange={handleSearchProduct}
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
            {products.map((item) => (
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
export default ProductHanlde;
