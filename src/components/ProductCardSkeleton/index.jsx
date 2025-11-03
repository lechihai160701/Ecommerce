import clsx from "clsx";
import styles from "./ProductCardSkeleton.module.scss";

const ProductCardSkeleton = () => {
  return (
    <div className={clsx(styles.card)}>
      <div className={clsx(styles.image, styles.skeleton)}></div>
      <div className={clsx(styles.text, styles.skeleton, styles.title)}></div>
      <div
        className={clsx(styles.text, styles.skeleton, styles.subtitle)}
      ></div>
      <div className={clsx(styles.price, styles.skeleton)}></div>
    </div>
  );
};

export default ProductCardSkeleton;
