import clsx from "clsx";
import styles from "../../page/Blog/Blog.module.scss";

const BlogList = (props) => {
  const { blog } = props;
  return (
    <div className={clsx(styles.blog__list)}>
      <div className={clsx(styles.blog__list__item)}>
        <div className={clsx(styles.blog__list__item__img)}>
          <img src={blog.image.imgBlog} alt="" />
        </div>
        <div className={clsx(styles.blog__list__item__info)}>
          <span className={clsx(styles.blog__list__item__info__status)}>
            {blog.status === 1 ? (
              <span
                className={clsx(styles.blog__list__item__info__status_news)}
              >
                News
              </span>
            ) : (
              <span className={clsx(styles.blog__list__item__info__status_old)}>
                Old
              </span>
            )}
          </span>
          <h1 className={clsx(styles.blog__list__item__info__name)}>
            {blog.name}
          </h1>
          <div className={clsx(styles.blog__list__item__info__desc)}>
            {blog.desc}
          </div>
          <div className={clsx(styles.blog__list__item__info__user)}>
            <div className={clsx(styles.blog__list__item__info__user__info)}>
              <img src={blog.image.imgUser} alt="" />
              <h2>{blog.user}</h2>
            </div>
            <div className={clsx(styles.blog__list__item__info__user__date)}>
              {blog.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
