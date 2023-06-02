
// required componenets
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAlbum(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { albums, handleChangeAlbum } = props;
  let [album, setAlbum] = useState({ title: "", userId: "" });
  console.log(album);
  let [title, setTitle] = useState(album.title);
  let [userId, setUserId] = useState(album.userId);
/// function to update the albums 
  useEffect(() => {
    let album = albums.find((elem) => elem.id == id);
    setAlbum(album);
    setTitle(album.title);
    setUserId(album.userId);
  }, [id, albums]);


  // function to
  const updateUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: title,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let updatedAlbums = albums.filter((album) => {
          console.log(album);
          return album.id != id;
        });
        updatedAlbums.push(data);
        handleChangeAlbum(updatedAlbums);
        alert('Album updated Successfully...')
        navigate('/')
      });
  };

  function handleChange(e) {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else {
      setUserId(e.target.value);
    }
  }
// rendering template for update form
  return (
    <div className="container my-3">
      <h1 style={{textAlign:'center'}}>Update Album</h1>
    
  <div className="mb-3">
    <label for="title" className="form-label">Title</label>
    <input
    className="form-control"
        type='text'
        value={title}
        name='title'
        onChange={(e) => {
          handleChange(e);
        }}
      />
  </div>
  <div className="mb-3">
    <label for="userid" className="form-label">UserId</label>
    <input
    className="form-control"
        type='text'
        value={userId}
        name='userId'
        onChange={(e) => {
          handleChange(e);
        }}
      />
  </div>
  
  <button type="submit" className="btn btn-outline-success" onClick={updateUser}>Update Album</button>

     
    </div>
  );
}
