import React, { useState, useEffect} from "react";
import "../PhotoGallery/Photogallery.css";
import '../Modal/Modal';
import { Modal } from "bootstrap";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedImageUrl, setSelectedImageUrl ] = useState('');

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


    async function fetchData(url) {
    console.log("recent: {}", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prev) =>  [...prev, ...data.photos.photo]);
      })
      .catch((error) => console.error("Error fetching photos:", error));
  }

  useEffect(() => {
    var url =
      "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=79b1509726ab2d285430c6f93d9753f7&format=json&nojsoncallback=1&safe_search=3&per_page=" + perPage + "&page=" + pageNum;
    fetchData(url);
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search text: ", query);
    var url =
      " https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=79b1509726ab2d285430c6f93d9753f7&text=" +
      query +
      "&format=json&nojsoncallback=1&per_page=" + perPage + "&page=" + pageNum;
    fetchData(url);
  };

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPageNum((prev) => prev + 1);
        var url =
       "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=79b1509726ab2d285430c6f93d9753f7&format=json&nojsoncallback=1&safe_search=3&per_page=" + perPage + "&page=" + pageNum;

        fetchData(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    <>
      <nav className="navbar bg-warning">
        <div className="container-fluid d-flex justify-content-center mx-20">
          <form className="d-flex " role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => {
              setQuery(event.target.value);
              }}
            />
            <button className="btn btn-outline-success" type="submit" onSubmit={handleSubmit}>
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="photo-gallery container" onScroll={handleScroll}>
        {photos.map((photo) => (
          <div id={photo.id}>
            <img
            key={photo.id}
            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            alt={photo.title}
          />
          </div>
        )
        )}

        <div className="image-container">
          <img
            src={`https://farm${photos.farm}.staticflickr.com/${photos.server}/${photos.id}_${photos.secret}.jpg`}
            alt={photos.title}
            onClick={() => handleImageClick("https://placekitten.com/200/300")}
          />
          {/* Add more images with onClick handlers here */}
          <Modal showModal={modalVisible} closeModal={closeModal} imageUrl={selectedImageUrl} />
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;
