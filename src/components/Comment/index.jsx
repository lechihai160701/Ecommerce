import { LikeFilled, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Rate, Tag } from "antd";
import { useEffect, useState } from "react";
import { CommentData } from "../../Common";
import styles from "./Comment.module.scss";

const filterOptions = [
  { label: "Tất cả", value: "all" },
  { label: "5 sao", value: 5 },
  { label: "4 sao", value: 4 },
  { label: "3 sao", value: 3 },
  { label: "2 sao", value: 2 },
  { label: "1 sao", value: 1 },
  { label: "Có bình luận", value: "withComment" },
  { label: "Có hình ảnh", value: "withImage" },
];

const Comment = ({ productRating = 4.5 }) => {
  const [comments, setComments] = useState(CommentData.getComment(5));
  const [filteredComments, setFilteredComments] = useState(comments);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [likedComments, setLikedComments] = useState({});

  const allComments = CommentData.getAllComment;

  useEffect(() => {
    const displayed = showAll ? allComments : CommentData.getComment(5);
    setComments(displayed);
    filterComments(displayed, activeFilter);
  }, [showAll]);

  const filterComments = (list, filter) => {
    let result = list;

    if (filter === "withComment") {
      result = list.filter((c) => c.content.trim());
    } else if (filter === "withImage") {
      result = list.filter((c) => c.image.some((img) => img.url));
    } else if (filter !== "all") {
      result = list.filter((c) => c.rating === filter);
    }

    setFilteredComments(result);
    setActiveFilter(filter);
  };

  const handleLike = (id) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const averageRating =
    comments.reduce((acc, c) => acc + c.rating, 0) / comments.length ||
    productRating;

  return (
    <div className={styles.commentSection}>
      <div className={styles.header}>
        <h2>Đánh giá sản phẩm</h2>
      </div>

      {/* Tổng quan đánh giá */}
      <div className={styles.summary}>
        <div className={styles.score}>
          <span className={styles.bigScore}>{averageRating.toFixed(1)}</span>
          <span className={styles.outOf}>/5</span>
        </div>
        <Rate
          disabled
          value={Math.round(averageRating)}
          className={styles.stars}
        />
        <span className={styles.totalReviews}>
          ({comments.length} đánh giá)
        </span>
      </div>

      {/* Bộ lọc */}
      <div className={styles.filters}>
        {filterOptions.map((option) => (
          <Tag
            key={option.value}
            color={activeFilter === option.value ? "processing" : "default"}
            className={styles.filterTag}
            onClick={() => filterComments(comments, option.value)}
          >
            {option.label}
          </Tag>
        ))}
      </div>

      {/* Danh sách bình luận */}
      <div className={styles.commentList}>
        {filteredComments.length === 0 ? (
          <div className={styles.noComment}>Chưa có đánh giá nào</div>
        ) : (
          filteredComments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <Avatar
                size={48}
                src={comment.avarUrl || "https://joeschmoe.io/api/v1/random"}
                className={styles.avatar}
              />
              <div className={styles.content}>
                <div className={styles.author}>{comment.name}</div>
                <Rate
                  disabled
                  value={comment.rating}
                  className={styles.commentStars}
                />
                <div className={styles.date}>{comment.date}</div>
                <div className={styles.text}>{comment.content}</div>

                {/* Hình ảnh */}
                {comment.image.some((img) => img.url) && (
                  <Image.PreviewGroup>
                    <div className={styles.images}>
                      {comment.image
                        .filter((img) => img.url)
                        .map((img, i) => (
                          <Image
                            key={i}
                            src={img.url}
                            alt="review"
                            className={styles.reviewImage}
                          />
                        ))}
                    </div>
                  </Image.PreviewGroup>
                )}

                {/* Hành động */}
                <div className={styles.actions}>
                  <Button
                    type="text"
                    icon={
                      likedComments[comment.id] ? (
                        <LikeFilled />
                      ) : (
                        <LikeOutlined />
                      )
                    }
                    onClick={() => handleLike(comment.id)}
                    className={likedComments[comment.id] ? styles.liked : ""}
                  >
                    Hữu ích {likedComments[comment.id] ? "(1)" : ""}
                  </Button>
                  <Button type="text" icon={<MessageOutlined />}>
                    Phản hồi
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Xem thêm / Thu gọn */}
      {allComments.length > 3 && (
        <div className={styles.loadMore}>
          <Button
            type="link"
            size="large"
            onClick={() => setShowAll(!showAll)}
            className={styles.loadMoreBtn}
          >
            {showAll ? "Thu gọn" : "Xem tất cả đánh giá"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Comment;
