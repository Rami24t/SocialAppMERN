import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { handleImageChange } from "../../utilities/handleImageChange";
import {
  MDBInput,
  MDBTextArea
} from "mdb-react-ui-kit";

export default function NewPostForm({ updatePost, post, heading, avatar }) {
  useEffect(() => {
    if (!post.image) {
      setFileData({
        url: '',
        file: null
      })
    }
  }, [post.image])

  const [fileData,setFileData] = useState({
    url: '',
    file: null
  })
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
        <MDBInput
          className="text-center mb-1"
          label="Title"
          id="title"
          type="text"
          name="title"
          value={post.title}
          onChange={updatePost}
        />
        <label className={"cursor-pointer "+ !fileData.file ? 'btn' : '' }>
        {fileData.file&&<CardMedia
          component="img"
          height="194"
          image={fileData.file ? fileData.url : ''}
          alt="Add Post Image"
        />}
            {!fileData.file ? 'Add' : 'Change'} Image...
        <input name="image" type="file" className="d-none" onInput={onChange} />
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
      </CardContent>
    </Card>
  );
}
