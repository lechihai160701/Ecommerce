import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Policy.module.scss";
const Policy = (props) => {
  return (
    <div className={clsx(styles.policy)}>
      <div className={clsx(styles.policy__icon)}>
        <i className={props.icon}></i>
      </div>
      <div className={clsx(styles.policy__info)}>
        <div className={clsx(styles.policy__info__name)}>{props.name}</div>
        <div className={clsx(styles.policy__info__title)}>{props.title}</div>
      </div>
    </div>
  );
};

Policy.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default Policy;
