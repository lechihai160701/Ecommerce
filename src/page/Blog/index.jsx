import clsx from "clsx";
import {
  blog,
  BlogList,
  gallery,
  Helmet,
  recentPosts,
  RecentPosts,
  Section,
  SectionTitle,
  tags,
} from "../../Common";
import styles from "./Blog.module.scss";

const Blog = () => {
  return (
    <Helmet title="Bài viết">
      <Section>
        <SectionTitle>Bài viết</SectionTitle>
      </Section>
      <div className={clsx(styles.blog)}>
        <div className={clsx(styles.blog__left)}>
          {blog.map((item) => (
            <BlogList key={item.id} blog={item} />
          ))}
        </div>
        <div className={clsx(styles.blog__right)}>
          <div className={clsx(styles.blog__right__item)}>
            <div
              className={clsx(
                styles.blog__right__item__name,
                styles.blog__recent__name
              )}
            >
              Recent Posts
            </div>
            {recentPosts.map((item) => (
              <RecentPosts posts={item} key={item.id} />
            ))}
          </div>
          <div className={clsx(styles.blog__right__item)}>
            <div className={clsx(styles.blog__gallery)}>
              <div
                className={clsx(
                  styles.blog__right__item__name,
                  styles.blog__gallery__name
                )}
              >
                Gallery
              </div>
              <div className={clsx(styles.blog__gallery__img)}>
                {gallery.map((item, index) => (
                  <img key={index} src={item.img} alt="" />
                ))}
              </div>
            </div>
          </div>
          <div className={clsx(styles.blog__right__item)}>
            <div className={clsx(styles.blog__tags)}>
              <div
                className={clsx(
                  styles.blog__right__item__name,
                  styles.blog__tags__name
                )}
              >
                Tags
              </div>
              <div className={clsx(styles.blog__tags__item)}>
                {tags.map((item, index) => (
                  <span key={index}>{item.display}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Blog;
