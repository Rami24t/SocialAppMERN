import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { handleImageChange } from "../../utilities/handleImageChange";
import {
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

export default function PostForm({ updatePost, post, heading, avatar }) {
  useEffect(() => {
    if (!post.image) {
      setFileData({
        url: "",
        file: null,
      });
    }
  }, [post]);

  const [fileData, setFileData] = useState({
    url: "",
    file: null,
  });
  const onChange = (e) => {
    if (e.currentTarget.files[0]) {
      handleImageChange(e, setFileData);
    }
    updatePost(e);
  };

  return (
    <Card className="mb-2">
      <CardHeader
        avatar={
          <img
            src={avatar}
            alt="author avatar"
            className="cursor-pointer rounded-circle object-cover "
            style={{ width: "40px", height: "40px" }}
            title={post?.author?.name}
          />
        }
        title={heading}
        subheader={Date().toLocaleString().slice(0, 21)}
      />
      <CardContent>
        <MDBValidation>
          <MDBValidationItem
            feedback="Title is required to make a post"
            invalid
          >
            <MDBInput
              required
              className="text-center mb-1"
              label="Title"
              id="title"
              type="text"
              name="title"
              value={post.title}
              onChange={updatePost}
            />
          </MDBValidationItem>
          <label className={"cursor-pointer " + !fileData.file ? "btn" : ""}>
            {fileData.file && (
              <CardMedia
                component="img"
                height="194"
                image={fileData.file ? fileData.url : ""}
                alt="Post Image"
              />
            )}
            {!fileData.file && !post.postImage ? "Add" : "Change"} Image...
            <input
              name="image"
              type="file"
              className="d-none"
              onInput={onChange}
            />
          </label>
          <Typography variant="body2" color="text.secondary" className="mt-2">
            <MDBTextArea
              label="Write something ..."
              id="textAreaExample"
              rows={4}
              name="text"
              value={post.text}
              onChange={updatePost}
            />
          </Typography>
        </MDBValidation>
      </CardContent>
    </Card>
  );
}
