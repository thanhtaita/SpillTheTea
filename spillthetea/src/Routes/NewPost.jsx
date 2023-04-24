import { useState } from "react";
import { supabase } from "../clients";
const NewPost = () => {
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
  const [data, setData] = useState(null);
  const updateAttribute = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();
    console.log(data);

    if (
      post.name != "" &&
      post.title != "" &&
      post.text != "" &&
      post.img != "" &&
      post.tag != ""
    ) {
      const now = new Date();
      const { data, error } = await supabase.from("SpillTheTea").insert({
        name: post.name,
        title: post.title,
        text: post.text,
        like: post.like,
        comment: post.comment,
        img: post.img,
        tag: post.tag,
        time: now,
      });
      setPost(defaultPost);
      setData(data);
      if (error) {
        console.error(error);
      } else {
        // console.log("ID: ", data[0]);
        // const id = data[0].id;
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="new-post">
      <h1 className="post-title">New Post</h1>
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
      <button className="new-post-btn" onClick={createPost}>
        CREATE
      </button>
    </div>
  );
};

export default NewPost;
