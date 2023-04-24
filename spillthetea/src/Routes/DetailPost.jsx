import { useEffect, useState } from "react";
import { supabase } from "../clients";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaComments } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const DetailPost = () => {
  const { id } = useParams();
  const defaultPost = {
    id: 0,
    name: "User not found",
    time: "",
    title: "Title not found",
    text: "",
    img: "https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tag: "",
    like: 0,
    comment: [],
  };

  const [post, setPost] = useState(defaultPost);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("SpillTheTea")
        .select("*")
        .eq("id", id);

      setPost(data[0]);
    };
    fetchPost();
  });

  const getComment = (comment) => {
    setComment(comment);
  };

  const addComment = async () => {
    const tempArr = post.comment;
    tempArr.push(comment);
    const { data, error } = await supabase
      .from("SpillTheTea")
      .update({ comment: tempArr })
      .eq("id", id);
    setComment("");
  };

  const deletePost = async () => {
    const { data, error } = await supabase
      .from("SpillTheTea")
      .delete()
      .eq("id", id);
    window.location.href = "/";
  };

  const deleteAlert = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost();
    }
  };

  return (
    <div>
      <div className="detail-contain">
        <div className="edit-detail">
          <div
            className="detail-delete"
            onClick={deleteAlert}
            style={{ cursor: "pointer" }}
          >
            <ImBin className="detail-delete-icon" />
          </div>
          <Link to={`/edit/${id}`} className="detail-edit">
            <FiEdit3 className="detail-edit-icon" />
          </Link>
        </div>
        <span className="detail-time">{post.time}</span>
        <h2 className="detail-title">{post.title}</h2>
        <p className="detail-text">{post.text}</p>
        <div className="detail-img-content">
          <img src={post.img} alt="image of the post" />
          <div className="detail-comment-section">
            <div className="detail-icons-container">
              <div className="like-icon-section">
                <AiFillHeart className="like-icon" />
                <span className="like-text">{post.like}</span>
              </div>
              <div className="comment-icon-section">
                <FaComments className="comment-icon" />
                <span className="comment-text">{post.comment.length}</span>
              </div>
            </div>
            <div className="detail-comment-section">
              <ul className="detail-comments">
                {post.comment.map((comment, index) => (
                  <li className="detail-each-comment">- {comment}</li>
                ))}
              </ul>
              <div className="detail-add-comment-section">
                <input
                  className="detail-input-comment"
                  type="text"
                  placeholder="Leave a comment..."
                  onChange={(e) => getComment(e.target.value)}
                  value={comment}
                />
                <button className="detail-add-comment" onClick={addComment}>
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailPost;
