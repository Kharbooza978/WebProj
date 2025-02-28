import { useState, useEffect } from "react";
// import process from "process";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/HomeListings.css";
import HorizontalScrollList from "./HorizontalScrollList";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";

const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState(""); 

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/listings?category=${category}`
        );
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [category]); 

  const handleSearch = () => {
    navigate("/search");
  };
  const handlelisting = (listing) => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div className="home-listing-home">
      <div className="horizontal-scroll-list-container">
        <HorizontalScrollList setCategory={setCategory} />
      </div>
      <div className="home-search-bar">
        <button onClick={handleSearch} className="home-search-button">
          <FaSearch className="home-search-icon" /> Search Listings
        </button>
      </div>
      <h1 className="home-listing-title-h1">All Listings</h1>
      <div className="home-listing-grid">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="home-listing-card"
              onClick={() => handlelisting(listing)}
            >
              <img
                src={
                  listing.images && listing.images.length > 0
                    ? `${import.meta.env.VITE_API_BASE_URL}/${
                        listing.images[0]
                      }`
                    : "path/to/placeholder-image.jpg" 
                }
                className="home-listing-image"
                alt={listing.title}
              />
              <h3 className="home-listing-title">{listing.title}</h3>
              <p className="home-listing-location">{listing.location}</p>
              <p className="home-listing-location">{listing.category}</p>
              <p className="home-listing-price">{listing.price} per night</p>
            </div>
          ))
        ) : (
          <p className="no-listings-message">No listings found.</p>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ListingsPage;
