import { useState } from "react";
import { supabase } from "../clients";
import { useParams } from "react-router-dom";
const EditPost = () => {
  const { id } = useParams();
  const defaultPost = {
    name: "",
    title: "",
    text: "",
    like: 0,
    img: "",
    comment: [],
    tag: "",
  };

  const [post, setPost] = useState(defaultPost);

  const updateAttribute = (event) => {
    const { name, value } = event.target;
    console.log("Name: ", name, " value: ", value);
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useState(() => {
    const getPost = async () => {
      const { data, error } = await supabase
        .from("SpillTheTea")
        .select("*")
        .eq("id", id);
      setPost(data[0]);
    };
    getPost();
  }, []);

  const editPost = async (event) => {
    event.preventDefault();

    if (
      post.name != "" &&
      post.title != "" &&
      post.text != "" &&
      post.img != "" &&
      post.tag != ""
    ) {
      const now = new Date();
      await supabase
        .from("SpillTheTea")
        .update({
          name: post.name,
          title: post.title,
          text: post.text,
          like: post.like,
          comment: post.comment,
          img: post.img,
          tag: post.tag,
          time: now,
        })
        .eq("id", id);
      window.location.href = "/";
    }
  };

  return (
    <div className="new-post">
      <h1>New Post</h1>
      <textarea
        type="text"
        value={post.name}
        name="name"
        onChange={updateAttribute}
        placeholder="Your name"
      />
      <textarea
        type="text"
        value={post.title}
        name="title"
        onChange={updateAttribute}
        placeholder="Title"
      />
      <textarea
        type="text"
        value={post.text}
        name="text"
        onChange={updateAttribute}
        placeholder="Content"
        style={{ height: "10rem" }}
        className="new-post-content"
      />
      <textarea
        type="text"
        value={post.tag}
        name="tag"
        onChange={updateAttribute}
        placeholder="Tag"
      />
      <textarea
        type="text"
        value={post.img}
        name="img"
        onChange={updateAttribute}
        placeholder="Insert image"
      />
      <button className="new-post-btn" onClick={editPost}>
        CHANGE
      </button>
    </div>
  );
};

export default EditPost;
