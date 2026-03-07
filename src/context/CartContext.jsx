import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

// Product data (hardcoded from original HTML)
export const productsData = {
  coffee: [
    { id: 1, name: 'RISTRETTO BIANCO', price: 5.00, oldPrice: 6.00, image: '/ristretto-bianco.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#53557D' },
    { id: 2, name: 'ICED CREAMY LATTE', price: 5.00, oldPrice: 6.00, image: '/iced-creamy-latte.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#86664E' },
    { id: 3, name: 'CAPPUCCINO', price: 5.00, oldPrice: 6.00, image: '/cappuccino.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#3F8B71' },
    { id: 4, name: 'ICED LONG BLACK', price: 5.00, oldPrice: 6.00, image: '/iced-long-black.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 5, name: 'MILK COFFEE REGAL', price: 5.00, oldPrice: 6.00, image: '/milk-coffee-regal.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#494947' },
    { id: 6, name: 'ORANGE JUICE', price: 5.00, image: '/orange-juice.png', category: 'coffee', availability: 'Only at Cafe and Delivery', bgColor: '#A77E61' },
    { id: 7, name: 'SODA BEVERAGE', price: 5.00, image: '/soda-beverage.png', category: 'coffee', availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 8, name: 'ICED COFFEE WITH MILK', price: 5.00, oldPrice: 6.00, image: '/iced-coffee-with-milk.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#53557D' },
    { id: 9, name: 'ICED AMERICANO', price: 5.00, oldPrice: 6.00, image: '/iced-americano.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#86664E' },
    { id: 10, name: 'VEGAN ICED LATTE', price: 5.00, oldPrice: 6.00, image: '/vegan-iced-latte.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#494947' },
    { id: 11, name: 'ICED CHOCOLATE', price: 5.00, oldPrice: 6.00, image: '/iced-chocolate.png', category: 'coffee', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#3F8B71' },
    { id: 12, name: 'AUTUMNAL COFFEE', price: 5.00, image: '/autumnal-coffee.png', category: 'coffee', availability: 'Only at Cafe and Delivery', bgColor: '#A77E61' },
  ],
  food: [
    { id: 101, name: 'SEAFOOD LUNCH', price: 5.00, image: '/seafood-lunch.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#53557D' },
    { id: 102, name: 'FRENCH TOAST WITH SUGAR', price: 5.00, image: '/french-toast.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#86664E' },
    { id: 103, name: 'CHOCOLATE CROISSANT', price: 5.00, oldPrice: 6.00, image: '/chocolate-croissant.png', category: 'food', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#3F8B71' },
    { id: 104, name: 'POTATO WEDGES', price: 5.00, oldPrice: 6.00, image: '/potato-wedges.png', category: 'food', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 105, name: 'BROWNIES', price: 5.00, image: '/brownies.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#494947' },
    { id: 106, name: 'BANANA CAKE', price: 5.00, image: '/banana-cake.png', category: 'food', outOfStock: true, availability: 'Only at Cafe and Delivery', bgColor: '#A77E61' },
    { id: 107, name: 'CORN CHEESE SANDWICH', price: 5.00, image: '/corn-cheese-sandwich.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#53557D' },
    { id: 108, name: 'BUTTERMILK WAFFLE', price: 5.00, image: '/buttermilk-waffle.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#86664E' },
    { id: 109, name: 'EGGS BENEDICT BURGER', price: 5.00, image: '/eggs-benedict-burger.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#3F8B71' },
    { id: 110, name: 'SPAGHETTI BOLOGNESE', price: 5.00, image: '/spaghetti-bolognese.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 111, name: 'SANDWICHES AND PICKLES', price: 5.00, image: '/sandwiches-and-pickles.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#494947' },
    { id: 112, name: 'VEGAN SANDWICH', price: 5.00, image: '/sandwich-vegan.png', category: 'food', availability: 'Only at Cafe and Delivery', bgColor: '#A77E61' },
  ],
  atHome: [
    { id: 201, name: 'AT HOME HOUSE BLEND', price: 5.00, oldPrice: 6.00, image: '/at-home-house-blend.png', category: 'atHome', badge: 'SALE', availability: 'Available Buy at Website', bgColor: '#53557D' },
    { id: 202, name: 'AT HOME ARABICA', price: 5.00, oldPrice: 6.00, image: '/at-home-arabica.png', category: 'atHome', badge: 'SALE', availability: 'Available Buy at Website', bgColor: '#86664E' },
    { id: 203, name: 'AT HOME CLASSIC', price: 4.00, oldPrice: 6.00, image: '/at-home-classic.png', category: 'atHome', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#3F8B71', link: '/product/203' },
    { id: 204, name: 'WHITE MUG', price: 5.00, image: '/white-mug.png', category: 'atHome', availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 205, name: 'AT HOME KALOSI', price: 5.00, image: '/at-home-kalosi.png', category: 'atHome', outOfStock: true, availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 206, name: 'AT HOME LUWAK', price: 5.00, oldPrice: 6.00, image: '/at-home-luwak.png', category: 'atHome', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#494947' },
    { id: 207, name: 'AT HOME ROBUSTA', price: 5.00, oldPrice: 6.00, image: '/at-home-robusta.png', category: 'atHome', badge: 'SALE', availability: 'Only at Cafe and Delivery', bgColor: '#A77E61' },
    { id: 208, name: 'COFFEE TEMPER 58MM', price: 5.00, image: '/coffee-temper-58mm.png', category: 'atHome', availability: 'Only at Cafe and Delivery', bgColor: '#53557D' },
    { id: 209, name: 'FRENCH PRESS 8 CUPS', price: 25.00, image: '/french-press-8-cups.png', category: 'atHome', availability: 'Only at Cafe and Delivery', bgColor: '#86664E' },
    { id: 210, name: 'GLASS TEA POT TEIERA (6 CUPS)', price: 13.00, image: '/glass-tea-pot-teiera.png', category: 'atHome', availability: 'Only at Cafe and Delivery', bgColor: '#3F8B71' },
    { id: 211, name: 'FRENCH PRESS 3 CUP', price: 20.00, image: '/french-press-3-cup.png', category: 'atHome', availability: 'Only at Cafe and Delivery', bgColor: '#824D34' },
    { id: 212, name: 'MOKA POT', price: 5.00, image: '/moka-pot.png', category: 'atHome', availability: 'Only at Cafe and Delivery', bgColor: '#494947' },
  ],
  detail: {
    id: 203,
    name: 'AT HOME CLASSIC',
    price: 4.00,
    oldPrice: 6.00,
    image: '/at-home-classic.png',
    images: [
      '/at-home-classic.png',
      '/at-home-classic-2.png',
      '/at-home-classic-3.png',
      '/at-home-classic-4.png',
    ],
    description: 'An all-time favorite blend with citrus fruit character, caramel flavors, and a pleasant faintly floral aroma. Locked scent: Excelso prevents air from entering the packaging with a locked aroma, ensuring the coffee\'s freshness.',
    storageWay: 'To maintain the taste of coffee and the freshness of the aroma, store Excelso coffee in an airtight container away from direct sunlight and moisture.',
    bgColor: '#3F8B71',
    relatedProducts: [201, 202, 206, 206]
  }
}

// Initial cart items (hardcoded from original HTML)
const initialCartItems = [
  {
    id: 203,
    name: 'AT HOME - CLASSIC',
    category: 'IMAJI Coffee At Home',
    price: 4.00,
    quantity: 1,
    image: '/at-home-classic.png',
    bgColor: '#3F8B71'
  },
  {
    id: 202,
    name: 'AT HOME - ARABICA',
    category: 'IMAJI Coffee At Home',
    price: 5.00,
    quantity: 1,
    image: '/at-home-arabica.png',
    bgColor: '#86664E'
  },
  {
    id: 201,
    name: 'AT HOME - HOUSE BLEND',
    category: 'IMAJI Coffee At Home',
    price: 5.00,
    quantity: 1,
    image: '/at-home-house-blend.png',
    bgColor: '#53557D'
  }
]

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, {
        id: product.id,
        name: product.name,
        category: product.category === 'atHome' ? 'IMAJI Coffee At Home' : 'Product',
        price: product.price,
        quantity: 1,
        image: product.image,
        bgColor: product.bgColor
      }]
    })
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      totalItems,
      subtotal,
      toggleCart,
      closeCart,
      updateQuantity,
      addToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
