import Post from "./Post";
import { useState, useEffect } from "react";
import { supabase } from "../clients";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { BsSortDown } from "react-icons/bs";
const PostCollection = () => {
  // Menu setup
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [sortOption, setSortOption] = useState("like");
  const [searchInput, setSearchInput] = useState("");

  const handleClose = (choice) => {
    setAnchorEl(null);
    if (choice == "like") setSortOption("like");
    else if (choice == "comment") setSortOption("comment");
    else if (choice == "time") setSortOption("time");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const [posts, setPosts] = useState([defaultPost]);

  const [tags, setTags] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      if (filteredData.length == 0) setFilterPosts([defaultPost]);
      else setFilterPosts(filteredData);
    } else setFilterPosts(posts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("SpillTheTea")
        .select()
        .order(sortOption, { ascending: false });
      setPosts(data);

      let tempArr = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (!tempArr.includes(data[i].tag)) {
            tempArr.push(data[i].tag);
          }
        }
        setTags(tempArr);
      }
      console.log(tempArr);
    };
    fetchPosts();
  });

  return (
    <div className="main-page">
      <div className="main-page-content">
        <div className="main-page-header">
          <input
            type="text"
            placeholder="Find by title..."
            className="search-input"
            onChange={(e) => searchItems(e.target.value)}
          />
          <ul className="tags">
            {tags.map((tag, index) => (
              <li className="tag-each">{tag}</li>
            ))}
          </ul>
        </div>
        <div className="sort-btn">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <BsSortDown className="sort-icon" />
          </Button>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
            className="menu-sort"
          >
            <MenuItem onClick={() => handleClose("like")}>Like</MenuItem>
            <MenuItem onClick={() => handleClose("time")}>Time</MenuItem>
          </Menu>
        </div>

        <ul className="post-collection">
          {searchInput.length > 0
            ? filterPosts.map((post, index) => (
                <li>
                  <Post post={post} />
                </li>
              ))
            : posts.map((post, index) => (
                <li>
                  <Post post={post} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default PostCollection;
