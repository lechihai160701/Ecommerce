import clsx from "clsx";
import styles from "../../page/Blog/Blog.module.scss";

const RecentPosts = (props) => {
  const { posts } = props;
  return (
    <div className={clsx(styles.blog__recent__posts)}>
      <div className={clsx(styles.blog__recent__posts__item)}>
        <div className={clsx(styles.blog__recent__posts__item__img)}>
          <img src={posts.img} alt="" />
        </div>
        <div className={clsx(styles.blog__recent__posts__item__info)}>
          <h2>{posts.name}</h2>
          <p>{posts.date}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
