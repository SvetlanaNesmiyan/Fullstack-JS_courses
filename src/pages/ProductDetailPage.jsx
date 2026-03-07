import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productsData } from '../context/CartContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { addToCart, toggleCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = productsData.detail
  // Use map to get all related products including duplicates
  const relatedProducts = product.relatedProducts.map(id =>
    productsData.atHome.find(p => p.id === id)
  ).filter(Boolean)

  useEffect(() => {
    document.body.classList.remove('menu-home')
  }, [])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    toggleCart()
  }

  return (
    <>
      <div className="container">
        {/* Product Detail */}
        <section className="product-detail">
          <div className="product-gallery">
            {/* Thumbnails */}
            <div className="thumbnails-container">
              {product.images.map((img, index) => (
                <div 
                  key={index}
                  className="thumbnail"
                  style={{ backgroundColor: product.bgColor }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="product-image detail-image" style={product.bgColor ? { backgroundColor: product.bgColor } : {}}>
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
          </div>

          {/* Product Info - breadcrumb is INSIDE here */}
          <div className="product-info detail-info">
            {/* Breadcrumb - inside product-info, before title */}
            <div className="breadcrumb">
              <Link to="/">Home</Link> / 
              <Link to="/at-home">Menu</Link> / 
              <span>Detail</span>
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            <div className="price-container">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="old-price">${product.oldPrice.toFixed(2)}</span>
              )}
              <button className="app-offer">· Get 20% Off in App</button>
            </div>

            {/* Description */}
            <div className="description">
              <p>Description:</p>
              <p>{product.description}</p>
            </div>
            
            {product.storageWay && (
              <>
                <h3 className="section-title">Storage Way:</h3>
                <div className="description">
                  <p>{product.storageWay}</p>
                </div>
              </>
            )}

            {/* Quantity & Add to Cart */}
            <div className="cart-actions">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <div className="quantity-control">
                <button className="quantity-btn minus" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <div className="quantity-display">{quantity}</div>
                <button className="quantity-btn plus" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Related Products */}
      <section className="related-products">
        <div className="container">
          <div className="section-header">
            <h2>You May Also Like</h2>
          </div>

          <div className="products-grid">
            {relatedProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} isRelated={true} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetailPage
