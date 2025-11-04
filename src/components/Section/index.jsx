import clsx from "clsx";
import styles from "./Section.module.scss";
const Section = (props) => {
  return <div className={clsx(styles.section)}>{props.children}</div>;
};
export const SectionTitle = (props) => {
  return <div className={clsx(styles.section__title)}>{props.children}</div>;
};
export const SectionBody = (props) => {
  return <div className={clsx(styles.section__body)}>{props.children}</div>;
};

export default Section;
