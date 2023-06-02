// required componenets or module
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Album from "./Albums";
import Navbar from "./Navbars";
import Newalbum from "./NewAlbum";
import UpdateAlbum from "./UpdateAlbum";

// app components
function App() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    getAlbums();
  }, []);


  //using use effect to sorting album in asscending order
  useEffect(() => {
    console.log(albums.sort((a,b)=>(a.id-b.id)), "albums");
  });


  //function to fetch data from api
  const getAlbums = () => {
    fetch("https://jsonplaceholder.typicode.com/albums").then((result) => {
      result.json().then((resp) => {
        setAlbums(resp);
      });
    });
  };


    //function to update data
  const handleChangeAlbum = (updatedAlbums) => {
    setAlbums(updatedAlbums);
  };

  //rendering data
  return (
    <div className="App">

      {/* //navbar */}
      <Navbar />
      {/* using router to routing */}
      <Routes>
        {/* route for view album */}
        <Route
          path="/"
          element={
            <Album albums={albums} handleChangeAlbum={handleChangeAlbum} />
          }
        />
        {/* route for add album */}
        <Route
          path="/newalbum"
          element={
            <Newalbum albums={albums} handleChangeAlbum={handleChangeAlbum} />
          }
        />
        {/* route for update album */}
        <Route
          path="/album/:id"
          element={
            <UpdateAlbum
              albums={albums}
              handleChangeAlbum={handleChangeAlbum}
            />
          }
        />
      </Routes>
    </div>
  );
}


// exporting 
export default App;
