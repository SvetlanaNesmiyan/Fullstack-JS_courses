import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock data for different categories - exact order from HTML files
const coffeeBeverageProducts = [
  {
    id: 1,
    name: 'RISTRETTO BIANCO',
    image: 'img/ristretto-bianco.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 2,
    name: 'ICED CREAMY LATTE',
    image: 'img/iced-creamy-latte.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 3,
    name: 'CAPPUCCINO',
    image: 'img/cappuccino.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 4,
    name: 'ICED LONG BLACK',
    image: 'img/iced-long-black.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 5,
    name: 'MILK COFFEE REGAL',
    image: 'img/milk-coffee-regal.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 6,
    name: 'ORANGE JUICE',
    image: 'img/orange-juice.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 7,
    name: 'SODA BEVERAGE',
    image: 'img/soda-beverage.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 8,
    name: 'ICED COFFEE WITH MILK',
    image: 'img/iced-coffee-with-milk.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 9,
    name: 'ICED AMERICANO',
    image: 'img/iced-americano.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: false
  },
  {
    id: 10,
    name: 'VEGAN ICED LATTE',
    image: 'img/vegan-iced-latte.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: false
  },
  {
    id: 11,
    name: 'ICED CHOCOLATE',
    image: 'img/iced-chocolate.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: false
  },
  {
    id: 12,
    name: 'AUTUMNAL COFFEE',
    image: 'img/autumnal-coffee.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: false
  }
]

const foodSnackProducts = [
  {
    id: 101,
    name: 'SEAFOOD LUNCH',
    image: 'img/seafood-lunch.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 102,
    name: 'FRENCH TOAST WITH SUGAR',
    image: 'img/french-toast.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 103,
    name: 'CHOCOLATE CROISSANT',
    image: 'img/chocolate-croissant.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 104,
    name: 'POTATO WEDGES',
    image: 'img/potato-wedges.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 105,
    name: 'BROWNIES',
    image: 'img/brownies.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 106,
    name: 'BANANA CAKE',
    image: 'img/banana-cake.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: false,
    isOutOfStock: true
  },
  {
    id: 107,
    name: 'SANDWICHES AND PICKLES',
    image: 'img/sandwiches-and-pickles.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 108,
    name: 'SPAGHETTI BOLOGNESE',
    image: 'img/spaghetti-bolognese.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 109,
    name: 'SANDWICH VEGAN',
    image: 'img/sandwich-vegan.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 110,
    name: 'EGGS BENEDICT BURGER',
    image: 'img/eggs-benedict-burger.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 111,
    name: 'CORN CHEESE SANDWICH',
    image: 'img/corn-cheese-sandwich.png',
    price: 5.00,
    oldPrice: 6.00,
    availability: 'Only at Cafe and Delivery',
    isSale: true,
    hasAppOffer: true
  },
  {
    id: 112,
    name: 'BUTTERMILK WAFFLE',
    image: 'img/buttermilk-waffle.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  }
]

const atHomeProducts = [
  {
    id: 201,
    name: 'AT HOME HOUSE BLEND',
    image: 'img/at-home-house-blend.png',
    price: 5.00,
    availability: 'Available Buy at Website',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 202,
    name: 'AT HOME ARABICA',
    image: 'img/at-home-arabica.png',
    price: 5.00,
    availability: 'Available Buy at Website',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 203,
    name: 'AT HOME CLASSIC',
    image: 'img/at-home-classic.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 204,
    name: 'WHITE MUG',
    image: 'img/white-mug.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 205,
    name: 'AT HOME KALOSI',
    image: 'img/at-home-kalosi.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: false,
    isOutOfStock: true
  },
  {
    id: 206,
    name: 'AT HOME LUWAK',
    image: 'img/at-home-luwak.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 207,
    name: 'AT HOME ROBUSTA',
    image: 'img/at-home-robusta.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 208,
    name: 'COFFEE TEMPER 58 MM',
    image: 'img/coffee-temper-58mm.png',
    price: 5.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 209,
    name: 'FRENCH PRESS 8 CUPS',
    image: 'img/french-press-8-cups.png',
    price: 25.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 210,
    name: 'GLASS TEA POT TEIERA (6 CUPS)',
    image: 'img/glass-tea-pot-teiera.png',
    price: 13.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 211,
    name: 'FRENCH PRESS 3 CUP',
    image: 'img/french-press-3-cup.png',
    price: 20.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  },
  {
    id: 212,
    name: 'MOKA POT',
    image: 'img/moka-pot.png',
    price: 20.00,
    availability: 'Only at Cafe and Delivery',
    isSale: false,
    hasAppOffer: true
  }
]

const getProductsByCategory = (category) => {
  switch (category) {
    case 'coffee':
      return coffeeBeverageProducts
    case 'food':
      return foodSnackProducts
    case 'home':
      return atHomeProducts
    default:
      return coffeeBeverageProducts
  }
}

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category = 'coffee', { rejectWithValue }) => {
    try {
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return getProductsByCategory(category)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for loading more products
export const loadMoreProducts = createAsyncThunk(
  'products/loadMoreProducts',
  async ({ currentCount, category }, { rejectWithValue }) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Return additional mock products based on category
      const additionalProducts = [
        {
          id: currentCount + 1,
          name: 'EXTRA ESPRESSO',
          image: 'img/cappuccino.png',
          price: 4.50,
          availability: 'Only at Cafe and Delivery',
          isSale: false,
          hasAppOffer: false
        },
        {
          id: currentCount + 2,
          name: 'HAZELNUT LATTE',
          image: 'img/iced-creamy-latte.png',
          price: 5.50,
          availability: 'Only at Cafe and Delivery',
          isSale: false,
          hasAppOffer: false
        }
      ]
      return additionalProducts
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  loadingMore: false,
  error: null,
  searchQuery: '',
  sortBy: 'bestSelling',
  underPrice: false,
  hasMore: true,
  activeCategory: 'coffee'
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.filteredItems = filterProducts(state.items, state.searchQuery, state.sortBy, state.underPrice)
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      state.filteredItems = filterProducts(state.items, state.searchQuery, state.sortBy, state.underPrice)
    },
    setUnderPrice: (state, action) => {
      state.underPrice = action.payload
      state.filteredItems = filterProducts(state.items, state.searchQuery, state.sortBy, state.underPrice)
    },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.sortBy = 'bestSelling'
      state.underPrice = false
      state.filteredItems = state.items
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
      state.hasMore = true
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filteredItems = filterProducts(action.payload, state.searchQuery, state.sortBy, state.underPrice)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Load more products
      .addCase(loadMoreProducts.pending, (state) => {
        state.loadingMore = true
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        state.loadingMore = false
        state.items = [...state.items, ...action.payload]
        state.filteredItems = filterProducts(state.items, state.searchQuery, state.sortBy, state.underPrice)
        if (action.payload.length === 0) {
          state.hasMore = false
        }
      })
      .addCase(loadMoreProducts.rejected, (state, action) => {
        state.loadingMore = false
        state.error = action.payload
      })
  },
})

// Helper function for filtering products
function filterProducts(items, searchQuery, sortBy, underPrice) {
  let filtered = [...items]
  
  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  
  // Filter by price
  if (underPrice) {
    filtered = filtered.filter(product => product.price < 10)
  }
  
  // Sort products
  switch (sortBy) {
    case 'priceLowToHigh':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'priceHighToLow':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => b.id - a.id)
      break
    default:
      // Best selling - keep original order
      break
  }
  
  return filtered
}

export const { setSearchQuery, setSortBy, setUnderPrice, clearFilters, setActiveCategory } = productsSlice.actions
export default productsSlice.reducer
