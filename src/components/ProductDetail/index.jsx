import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Grid,
  Helmet,
  ProductCard,
  ProductView,
  Section,
  SectionBody,
  SectionTitle,
} from "../../Common";
import { getProducts } from "../../utils";
const Index = () => {
  const [searchParam] = useSearchParams();
  const nameProduct = searchParam.get("nameProduct");

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let result = products.find((item) => {
        return item.title.toUpperCase().includes(nameProduct.toUpperCase());
      });
      setProduct(result);
    }
  }, [products, nameProduct]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (res.status === 200) {
          setProducts(res.data);
        } else if (res.status !== 200) {
          alert("Có lỗi!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0);
    }
  }, [product]);

  return (
    <Helmet title={product ? product.title : ""}>
      <Section>
        <SectionBody>
          {product && <ProductView product={product} />}
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Related Products</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {getProducts(
              products.filter((item) => item.id !== product?.id),
              4
            ).map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Index;
