import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartDropdown = () => {
  const { cartItems, isCartOpen, closeCart, subtotal, updateQuantity } = useCart()

  // Products that should have colored background in cart
  const atHomeColorProducts = [
    'AT HOME - LUWAK',
    'AT HOME - ROBUSTA', 
    'AT HOME - HOUSE BLEND',
    'AT HOME - ARABICA',
    'AT HOME - CLASSIC',
    'AT HOME LUWAK',
    'AT HOME ROBUSTA', 
    'AT HOME HOUSE BLEND',
    'AT HOME ARABICA',
    'AT HOME CLASSIC'
  ]

  const shouldHaveColoredBg = (itemName) => {
    return atHomeColorProducts.some(product => itemName.includes(product))
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="cart-overlay"
        onClick={closeCart}
      ></div>

      {/* Cart Dropdown */}
      <div className="cart-dropdown show">
        <h3 style={{ fontSize: '36px', fontWeight: 500, marginBottom: '20px', color: '#3a2c1e' }}>My Cart</h3>
        <div className="grid grid-cols-[3fr_1fr_1.2fr_1fr] pb-3 border-b border-gray-300 mb-2" style={{ fontWeight: 500 }}>
          <span style={{ fontSize: '20px', letterSpacing: '3%', color: '#3a2c1e' }}>Product</span>
          <span style={{ fontSize: '20px', letterSpacing: '3%', textAlign: 'center', color: '#3a2c1e' }}>Price</span>
          <span style={{ fontSize: '20px', letterSpacing: '3%', textAlign: 'center', color: '#3a2c1e' }}>Quantity</span>
          <span style={{ fontSize: '20px', letterSpacing: '3%', textAlign: 'center', color: '#3a2c1e' }}>Subtotal</span>
        </div>

        {/* Cart Items */}
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto gap-6" style={{ display: 'flex', flexDirection: 'column' }}>
          {cartItems.map((item, index) => (
            <div key={item.id} className="grid grid-cols-[3fr_1fr_1.2fr_1fr] items-center py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div 
                  className="w-[120px] h-[91.95px] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: shouldHaveColoredBg(item.name) ? item.bgColor : '#f5f5f5' }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="leading-relaxed">
                  <div style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '3%', color: '#3a2c1e' }}>{item.name}</div>
                  <div style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '3%', color: '#666', marginTop: '4px' }}>{item.category}</div>
                </div>
              </div>
              
              <div style={{ fontSize: '20px', fontWeight: 500, color: '#3a2c1e', textAlign: 'center' }}>${item.price.toFixed(2)}</div>
              
              <div className="flex items-center border border-accent rounded-md overflow-hidden w-fit">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 bg-white border-none cursor-pointer text-lg text-accent flex items-center justify-center transition-colors hover:bg-gray-100"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-primary font-medium">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 bg-white border-none cursor-pointer text-lg text-accent flex items-center justify-center transition-colors hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <div style={{ fontSize: '20px', fontWeight: 500, color: '#3a2c1e', textAlign: 'center' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div style={{ fontSize: '30px', fontWeight: 400, color: '#121212', marginBottom: '16px' }}>Summary</div>
          <div className="flex justify-between items-center mb-lg" style={{ fontWeight: 500 }}>
            <span style={{ fontSize: '18px', letterSpacing: '3%', color: '#3a2c1e' }}>Total</span>
            <span style={{ fontSize: '20px', fontWeight: 500, textAlign: 'right', color: '#3a2c1e' }}>${subtotal.toFixed(2)}</span>
          </div>
          <Link 
            to="/checkout"
            className="block w-full bg-accent text-white text-center py-[14px] rounded-lg no-underline transition-colors hover:bg-[#8b5a2b]"
            style={{ width: '771px', maxWidth: 'calc(100% - 48px)', margin: '0 auto', fontSize: '16px', fontWeight: 500, letterSpacing: '3%' }}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  )
}

export default CartDropdown
