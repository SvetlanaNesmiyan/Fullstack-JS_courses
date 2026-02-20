import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, loadMoreProducts, setSearchQuery, setSortBy, setUnderPrice, clearFilters, setActiveCategory } from './redux/slices/productsSlice'
import { addToCart } from './redux/slices/cartSlice'
import ContactForm from './components/Form'

function App() {
  const dispatch = useDispatch()
  const { filteredItems, loading, loadingMore, error, searchQuery, sortBy, underPrice, hasMore, activeCategory } = useSelector(state => state.products)
  const { totalQuantity } = useSelector(state => state.cart)
  const [notification, setNotification] = useState(null)
  const [activeTab, setActiveTab] = useState('coffee')

  useEffect(() => {
    dispatch(fetchProducts(activeTab))
  }, [dispatch, activeTab])

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    showNotification('Товар додано до кошика!')
  }

  const handleLoadMore = () => {
    dispatch(loadMoreProducts({ currentCount: filteredItems.length, category: activeTab }))
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    dispatch(setActiveCategory(tab))
    dispatch(clearFilters())
    dispatch(fetchProducts(tab))
  }

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }

  const handlePriceFilter = (e) => {
    dispatch(setUnderPrice(e.target.checked))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Завантаження товарів...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Помилка: {error}</p>
      </div>
    )
  }

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Header */}
      <header>
        <div className="container header-container">
          <div className="logo">IMAJI<span> Coffee.</span></div>

          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Story</a></li>
              <li><a href="#" className="active">Menu</a></li>
              <li><a href="#">Space</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">News</a></li>
            </ul>
          </nav>

          <div className="header-buttons">
            <button className="cart-btn">
              <i className="fas fa-shopping-cart"></i> Cart
              <span className="cart-count">({totalQuantity})</span>
            </button>
            <button className="signin-btn">Sign In</button>
          </div>
        </div>
      </header>

      {/* Menu Header */}
      <section className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
          <p className="menu-description">
            IMAJI Coffee provides a variety of high quality coffee and drinks and
            flavors that are suitable for you to support and cheer up your day. We
            also provide coffee to accompany you at home along with the equipment.
          </p>

          {/* Filters */}
          <div className="filters-container">
            <div className="filters">
              <div className="filter-group">
                <div className="filter-header">
                  <span className="filter-label">Search</span>
                  <button className="clear-btn" onClick={handleClearFilters}>
                    <i className="fas fa-times"></i> Clear
                  </button>
                </div>
                <div className="filter-controls">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Q: Enter keyword"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-header">
                  <span className="filter-label">Price</span>
                  <button className="clear-btn" onClick={() => dispatch(setUnderPrice(false))}>
                    <i className="fas fa-times"></i> Clear
                  </button>
                </div>
                <div className="filter-controls">
                  <div className="checkbox-container">
                    <input 
                      type="checkbox" 
                      id="under10" 
                      checked={underPrice}
                      onChange={handlePriceFilter}
                    />
                    <label htmlFor="under10">Under $10</label>
                  </div>
                </div>
              </div>

              <div className="filter-group">
                <div className="filter-header">
                  <span className="filter-label">Sort By</span>
                  <button className="clear-btn" onClick={() => dispatch(setSortBy('bestSelling'))}>
                    <i className="fas fa-times"></i> Clear
                  </button>
                </div>
                <div className="filter-controls">
                  <select className="filter-select" value={sortBy} onChange={handleSortChange}>
                    <option value="bestSelling">Best Selling</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        {/* Tabs */}
        <div className="menu-tabs">
          <button 
            className={`tab ${activeTab === 'coffee' ? 'active' : ''}`}
            onClick={() => handleTabChange('coffee')}
          >
            COFFEE AND BEVERAGE
          </button>
          <button 
            className={`tab ${activeTab === 'food' ? 'active' : ''}`}
            onClick={() => handleTabChange('food')}
          >
            FOOD AND SNACK
          </button>
          <button 
            className={`tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabChange('home')}
          >
            IMAJI COFFEE AT HOME
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredItems.map(product => (
            <div key={product.id} className="product-card">
              {product.isSale && <div className="sale-badge">SALE</div>}
              {product.isOutOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="availability">{product.availability}</p>
                <div className="price">
                  <span className="current-price">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                  )}
                </div>
                {product.isOutOfStock ? null : product.hasAppOffer ? (
                  <button 
                    className="app-offer"
                    onClick={() => handleAddToCart(product)}
                  >
                    Get 20% Off in App
                  </button>
                ) : (
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="load-more">
            <button 
              className="load-more-btn" 
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Завантаження...' : 'Load More'}
            </button>
          </div>
        )}
      </main>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-location">
            <h2>Our Location</h2>
            <p>Jl. Bangkringan No 19, RT.11/RW.2, Kota Surabaya, 60124</p>
            <p><strong>Customer Service +6282-2876-6862</strong></p>
            <p><strong>We Are Open from Sun - Mon 10 AM - 22 PM</strong></p>
          </div>

          <div className="divider"></div>

          <div className="delivery-order">
            <div className="social-icons">
              <a href="#"><img src="img/spotify.png" alt="Spotify" width="24" height="24" /></a>
              <a href="#"><img src="img/instagram.png" alt="Instagram" width="24" height="24" /></a>
              <a href="#"><img src="img/tiktok.png" alt="TikTok" width="24" height="24" /></a>
              <a href="#"><img src="img/youtube.png" alt="YouTube" width="24" height="24" /></a>
              <a href="#"><img src="img/twitter.png" alt="Twitter" width="24" height="24" /></a>
              <a href="#"><img src="img/telegram.png" alt="Telegram" width="24" height="24" /></a>
            </div>

            <h3>Delivery Order</h3>
            <div className="app-store-badge">
              <img src="img/1.png" alt="Download on the App Store" />
            </div>
            <div className="google-play-badge">
              <img src="img/2.png" alt="GET FOR Google Play" />
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">© 2023 IMAJI COFFEE, All rights reserved</div>
            <div className="footer-links">
              <a href="#">Terms and Conditions</a> |
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
