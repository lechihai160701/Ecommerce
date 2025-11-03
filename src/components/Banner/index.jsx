import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Banner.module.scss";
const Banner = (props) => {
  const style = {
    marginBottom: props.marginBottom ? `${props.marginBottom}px` : "0",
  };
  const image = props.img ? props.img : "";
  return (
    <div className={clsx(styles.banner)} style={style}>
      <img src={image} alt="" />
    </div>
  );
};

Banner.propTypes = {
  img: PropTypes.string.isRequired,
  marginBottom: PropTypes.number,
};

export default Banner;
