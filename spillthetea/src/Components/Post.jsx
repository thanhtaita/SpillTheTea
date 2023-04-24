import { FaUserCircle, FaComments } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { supabase } from "../clients";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const likeUpdate = async () => {
    await supabase
      .from("SpillTheTea")
      .update({ like: post.like + 1 })
      .eq("id", post.id);
  };

  return (
    <div>
      <div className="post">
        <img className="post-img" src={post.img} alt="image of the post" />
        <div className="content">
          <div className="post-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">{post.name}</span>
            <span className="post-date">{post.time}</span>
          </div>
          <div className="post-title">{post.title}</div>
          <div className="post-text">{post.text}</div>
          <div className="btn-container">
            <button className="like-btn" onClick={likeUpdate}>
              <AiFillHeart className="like-icon" />
              <span>{post.like}</span>
            </button>
            <Link to={`/${post.id}`}>
              <button className="comment-btn">
                <FaComments className="comment-icon" />
                <span>{(post, post.comment.length)}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
