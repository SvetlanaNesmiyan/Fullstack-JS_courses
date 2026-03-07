import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product, isRelated = false }) => {
  const { addToCart, toggleCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    toggleCart()
  }

  if (isRelated) {
    return (
      <div className="product-card">
        {/* Sale Badge */}
        {product.badge && (
          <div className="sale-badge">
            {product.badge}
          </div>
        )}

        {/* Out of Stock Badge */}
        {product.outOfStock && (
          <div className="out-of-stock">
            OUT OF STOCK
          </div>
        )}

        {/* Product Image - Related Products use product-image-small */}
        <div className="product-image-small" style={product.bgColor ? { backgroundColor: product.bgColor } : {}}>
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info - Related Products use product-info-small */}
        <div className="product-info-small">
          {product.link ? (
            <h3>
              <Link to={product.link} style={{ color: '#3a2c1e', textDecoration: 'none' }}>
                {product.name}
              </Link>
            </h3>
          ) : (
            <h3>{product.name}</h3>
          )}
          
          <p className="availability">{product.availability}</p>
          
          <div className="price-small">
            <span className="current-price-small">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="old-price-small">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          {!product.outOfStock && (
            <button 
              className="app-offer-small"
              onClick={handleAddToCart}
            >
              Get 20% Off in App
            </button>
          )}
        </div>
      </div>
    )
  }

  // Regular product card (not related)
  return (
    <div className="product-card">
      {/* Sale Badge */}
      {product.badge && (
        <div className="sale-badge">
          {product.badge}
        </div>
      )}

      {/* Out of Stock Badge */}
      {product.outOfStock && (
        <div className="out-of-stock">
          OUT OF STOCK
        </div>
      )}

      {/* Product Image */}
      <div className="product-image" style={product.bgColor ? { backgroundColor: product.bgColor } : {}}>
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product Info */}
      <div className="product-info">
        {product.link ? (
          <h3>
            <Link to={product.link} style={{ color: '#3a2c1e', textDecoration: 'none' }}>
              {product.name}
            </Link>
          </h3>
        ) : (
          <h3>{product.name}</h3>
        )}
        
        <p className="availability">{product.availability}</p>
        
        <div className="price">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="old-price">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        {!product.outOfStock && (
          <button 
            className="app-offer"
            onClick={handleAddToCart}
          >
            Get 20% Off in App
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
