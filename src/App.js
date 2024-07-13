import { Form } from "react-bootstrap";
import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 12;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
 
  const fetchImages = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
      );

      console.log("data", data);
      setImages(data.results);

      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  }, [page]);
  useEffect(() => {
   
    fetchImages();
    
  }, [fetchImages, page]);
  const resetSearch = () => {
    setPage(1);
    fetchImages();
    
  };
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };
  console.log("pages", page);
 

  return (
    <>
      <div className="container">
        <h1 className="title">Image Search</h1>
        <div className="search-section">
          <Form onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Type something to search"
              className="search-input"
              ref={searchInput}
            />
          </Form>
        </div>
        <div className="filters">
          <div onClick={() => handleSelection("nature")}>Nature</div>
          <div onClick={() => handleSelection("birds")}>Birds</div>
          <div onClick={() => handleSelection("cats")}>Cats</div>
          <div onClick={() => handleSelection("shoes")}>Shoes</div>
        </div>
        <div className="images">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className="image"
            />
          ))}
        </div>
        <div className="buttons">
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous</Button>
          )}
          {page < totalPages && (
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
