import { useState } from "react";

import "./CSS/NewAlbum.css";
import { useNavigate } from "react-router-dom";

//This Is Adding New Album And Dummy API Call For POST

function Newalbum(props) {
  const navigate = useNavigate();
  const { albums, handleChangeAlbum } = props;

  const [Id, setId] = useState();
  const [userId, setUserID] = useState();
  const [title, setTitle] = useState("");

  // function to save new album
  function saveUser(e) {
    e.preventDefault();
    let data = { Id, userId, title };
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(userId==''||title==''){
          alert("Album can not be empty...")
        }else{
        let newAlbum = data;
        let prevAlbums = albums;
        prevAlbums.push(newAlbum);
        handleChangeAlbum(prevAlbums);
       
        alert("Album has been added succefully...")
        navigate('/');}
    });
  }
// rendering template to add album
  return (
    <div className="container">
      <h1 id="albumHeading" className="mt-4">
        Add Album To Your List
      </h1>
      <form>
      <div className="mb-3">
    <label for="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" disabled='disabled' 
            
            />
  </div>
  <div className="mb-3">
    <label for="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"  value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}/>
  </div>
  <div className="mb-3">
    <label for="userid" className="form-label">UserId</label>
    <input type="number" className="form-control" id="userid" onChange={(e)=>{
      setUserID(e.target.value)
    }}/>
  </div>
  
  <button type="submit" className="btn btn-outline-primary" onClick={saveUser}>Add Album</button>
</form>
     
    </div>
  );
}

export default Newalbum;
