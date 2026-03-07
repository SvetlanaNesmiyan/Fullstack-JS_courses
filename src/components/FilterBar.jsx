import { useState } from 'react'

const FilterBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Best Selling')

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
      <div className="flex flex-wrap gap-5">
        {/* Search Filter */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 whitespace-nowrap">Search</span>
            <button className="bg-transparent border-none text-secondary cursor-pointer flex items-center gap-1">
              <i className="fas fa-times"></i> Clear
            </button>
          </div>
          <div className="flex items-center gap-2.5 bg-gray-100 p-2.5 rounded-md">
            <input 
              type="text"
              placeholder="Q: Enter keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border border-gray-200 rounded text-sm"
            />
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 whitespace-nowrap">Price</span>
            <button className="bg-transparent border-none text-secondary cursor-pointer flex items-center gap-1">
              <i className="fas fa-times"></i> Clear
            </button>
          </div>
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-md border border-gray-200 w-full">
            <input type="checkbox" id="under10" className="w-4 h-4 cursor-pointer" />
            <label htmlFor="under10" className="text-sm">Under $10</label>
          </div>
        </div>

        {/* Sort By Filter */}
        <div className="flex flex-col flex-1 min-w-[250px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 whitespace-nowrap">Sort By</span>
            <button className="bg-transparent border-none text-secondary cursor-pointer flex items-center gap-1">
              <i className="fas fa-times"></i> Clear
            </button>
          </div>
          <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-md border border-gray-200 w-full">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 p-2 border border-gray-200 rounded text-sm bg-white"
            >
              <option>Best Selling</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
