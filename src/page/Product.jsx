import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Banner,
  Helmet,
  ProductDetail,
  ProductHandle,
  Section,
  SectionBody,
} from "../Common";
import banner from "../banner.png";

const Product = () => {
  const [searchParam] = useSearchParams();
  const nameProduct = searchParam.get("nameProduct");

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (res.status === 200) {
          const cate = [...new Set(res.data.flatMap((item) => item.category))];

          setCategory(cate);
          setData(res.data);
        } else if (res.status !== 200) {
          alert("Có lỗi!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllData();
  }, []);

  if (nameProduct) {
    return <ProductDetail />;
  }

  return (
    <React.Fragment>
      <Helmet title="Sản phẩm">
        <Banner img={banner} alt="Banner" marginBottom={50} />
        <Section>
          <SectionBody>
            <ProductHandle product={data} category={category} />
          </SectionBody>
        </Section>
      </Helmet>
    </React.Fragment>
  );
};
export default React.memo(Product);
