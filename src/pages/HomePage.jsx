import { productsData } from '../context/CartContext'
import MenuTabs from '../components/MenuTabs'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const coffeeProducts = productsData.coffee

  return (
    <>
      {/* Menu Header */}
      <section className="py-[60px]">
        <div className="container">
          <h1 className="text-[36px] text-primary mb-5 text-left">Our Menu</h1>
          <p className="max-w-[700px] mb-10 text-gray-600 leading-relaxed text-left">
            IMAJI Coffee provides a variety of high quality coffee and drinks and
            flavors that are suitable for you to support and cheer up your day. We
            also provide coffee to accompany you at home along with the equipment.
          </p>

          <FilterBar />
        </div>
      </section>

      {/* Main Content */}
      <main className="container pb-[60px]">
        <MenuTabs />

        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {coffeeProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-10 mb-[60px]">
          <button className="bg-transparent border border-secondary text-secondary px-10 py-3 rounded cursor-pointer text-base transition-all hover:bg-secondary hover:text-white">
            Load More
          </button>
        </div>
      </main>
    </>
  )
}

export default HomePage
