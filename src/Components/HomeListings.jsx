import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/listings`,
          {
            params: { category: category || undefined }
          }
        );
        setListings(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to load listings. Please try again later.");
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [category]);

  const handleSearch = () => navigate("/search");
  const handleListingClick = (listingId) => navigate(`/listing/${listingId}`);

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
      
      <h1 className="home-listing-title-h1">
        {category ? `${category} Listings` : "All Listings"}
      </h1>
      
      {isLoading ? (
        <div className="loading-message">Loading listings...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : listings.length > 0 ? (
        <div className="home-listing-grid">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="home-listing-card"
              onClick={() => handleListingClick(listing._id)}
            >
              <img
                src={
                  listing.images?.length > 0
                    ? `${import.meta.env.VITE_API_BASE_URL}/${listing.images[0]}`
                    : "/placeholder-image.jpg"
                }
                className="home-listing-image"
                alt={listing.title}
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              <div className="home-listing-details">
                <h3 className="home-listing-title">{listing.title}</h3>
                <p className="home-listing-location">{listing.location}</p>
                <p className="home-listing-category">{listing.category}</p>
                <p className="home-listing-price">${listing.price} per night</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-listings-container">
          <p className="no-listings-message">
            No listings found{category ? ` in ${category} category` : ""}.
          </p>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ListingsPage;