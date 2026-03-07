import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CheckoutPage = () => {
  const { cartItems, subtotal } = useCart()

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="w-full min-h-screen bg-white flex flex-col px-[60px]">
        {/* Title */}
        <div className="w-full max-w-[769px] h-[78px] text-[48px] font-medium text-[#121212] leading-none mb-2.5 flex items-center">
          Checkout
        </div>

        {/* Breadcrumb */}
        <div className="text-lg text-secondary mb-5 font-medium">
          Checkout <span>&gt;</span> Shipping <span>&gt;</span> Payment
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[1fr_420px] gap-10 flex-1 items-stretch min-h-0">
          {/* Left Column - Shipping */}
          <div className="flex flex-col pt-5">
            <h2 className="text-2xl text-primary mb-5 font-semibold">Shipping Address</h2>
            
            <table className="w-full border-collapse mb-5">
              <thead>
                <tr>
                  <th className="text-left font-semibold text-primary pb-2 border-b border-gray-200">Name</th>
                  <th className="text-left font-semibold text-primary pb-2 border-b border-gray-200">Country</th>
                  <th className="text-left font-semibold text-primary pb-2 border-b border-gray-200">City</th>
                  <th className="text-left font-semibold text-primary pb-2 border-b border-gray-200">Postal Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 border-b border-gray-100">
                    <input type="text" placeholder="Your name" className="w-full p-2 border border-gray-200 rounded text-sm" />
                  </td>
                  <td className="py-2 border-b border-gray-100">
                    <input type="text" placeholder="Country" className="w-full p-2 border border-gray-200 rounded text-sm" />
                  </td>
                  <td className="py-2 border-b border-gray-100">
                    <input type="text" placeholder="City" className="w-full p-2 border border-gray-200 rounded text-sm" />
                  </td>
                  <td className="py-2 border-b border-gray-100">
                    <input type="text" placeholder="Postal code" className="w-full p-2 border border-gray-200 rounded text-sm" />
                  </td>
                </tr>
              </tbody>
            </table>

            <label className="font-semibold mt-4 mb-1 block">Address</label>
            <input type="text" placeholder="Street address" className="w-full p-2 border border-gray-200 rounded text-sm mb-4" />

            <div className="flex items-center gap-2 my-4">
              <span className="bg-gray-100 p-2 border border-gray-200 rounded text-sm text-gray-500">+62</span>
              <input type="tel" placeholder="892 000 000 000" className="flex-1 p-2 border border-gray-200 rounded text-sm" />
            </div>

            <div className="flex items-center gap-2 my-4">
              <input type="checkbox" id="defaultAddress" className="w-4 h-4 cursor-pointer" />
              <label htmlFor="defaultAddress" className="text-sm">Set as default address</label>
            </div>

            <div className="mt-auto pt-5">
              <button 
                onClick={handleBack}
                className="inline-flex items-center gap-2 bg-transparent border border-accent text-accent px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-accent hover:text-white"
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
            </div>
          </div>

          {/* Right Column - Order Items */}
          <div className="bg-cream p-5 pt-5 rounded-xl flex flex-col gap-3 w-[420px] box-border h-full">
            <h2 className="text-2xl text-primary font-semibold m-0">Order Items</h2>
            
            <div className="flex flex-col gap-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary">{item.name}</span>
                    <span className="text-gray-500 text-sm mt-0.5">{item.category}</span>
                  </div>
                  <span className="font-semibold text-primary">{item.quantity}x ${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-2 border-t border-gray-200 text-base">
              <span>Shipping</span>
              <span>$0</span>
            </div>

            <div className="flex justify-between items-center text-2xl font-bold text-primary py-2">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button className="w-full bg-accent text-white border-none rounded-lg py-4 text-lg font-semibold cursor-pointer transition-colors mt-1 hover:bg-[#8b5a2b]">
              Process to Shipping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
