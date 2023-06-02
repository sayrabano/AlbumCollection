
import Spinner from "react-bootstrap/Spinner";
import "./CSS/Album.css";
import { Link } from "react-router-dom";



//For Fetching API Data

const Albums = (props) => {
  const { albums, handleChangeAlbum } = props;
  //For Delete API Call

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        let updatedAlbums = albums.filter((album) => album.id !== id);
        alert("Album  has been deleted...");
        handleChangeAlbum(updatedAlbums);
      });
    });
  };

  // For Upadte API Call

  const mappedAlbum = albums
    .sort((b, a) => a.id - b.id)
    .slice(0, 21)
    .map((album) => {
      return (
        
        <div className="container my-3">
        
          <div className="row">
            <div className="col-md-6" style={{ marginLeft: 250 }}>
              <div className="card">
                {/* <img src="..." className="card-img-top" alt="..."> */}
                <div className="card-body">
                  <h5 className="card-title">{album.userId}</h5>
                  <p className="card-text">{album.title}</p>
                  <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-warning" type="button" style={{backgroundColor:'white'}}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/album/${album.id}`}
              >
                Update
              </Link>
            </button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => deleteUser(album.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  //If API Is Loading That Time Showing A Spinner While API Data Is Fetching
  const emptyAlbum = (
    <tr>
      <td colSpan="4" className="text-center">
        <Spinner variant="info" animation="grow" />
      </td>
    </tr>
  );

  return <div>{mappedAlbum.length > 0 ? mappedAlbum : emptyAlbum}</div>;
};

export default Albums;
