import { memo, useEffect, useState } from "react";
import {
  Helmet,
  Slider,
  policy,
  Section,
  SectionBody,
  SectionTitle,
  Grid,
  Policy,
  ProductCard,
  IntroDuce,
} from "../Common";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res;
    }
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Helmet title="Trang chủ">
      <Slider />
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={30}>
            {policy.map((item, index) => (
              <Policy
                key={index}
                name={item.name}
                icon={item.icon}
                title={item.description}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Men's Clothing</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={30}>
            {data.map((item) => {
              return (
                item.category === "men's clothing" && (
                  <ProductCard key={item.id} data={item} />
                )
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Women's Clothing</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={30}>
            {data.map((item) => {
              return (
                item.category === "women's clothing" && (
                  <ProductCard key={item.id} data={item} />
                )
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Electronics</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={30}>
            {data.map((item) => {
              return (
                item.category === "electronics" && (
                  <ProductCard key={item.id} data={item} />
                )
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Jewelery</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={30}>
            {data.map((item) => {
              return (
                item.category === "jewelery" && (
                  <ProductCard key={item.id} data={item} />
                )
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <IntroDuce />
        </SectionBody>
      </Section>
    </Helmet>
  );
};
export default memo(Home);
