import { Link, useLocation } from 'react-router-dom'

const MenuTabs = () => {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }

  const handleClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault()
    }
  }

  return (
    <div className="grid grid-cols-3 mb-[30px] border-b border-gray-300">
      <Link 
        to="/menu" 
        onClick={(e) => handleClick(e, '/menu')}
        className={`py-2.5 bg-transparent border-none cursor-pointer text-base transition-all relative ${
          isActive('/menu') ? 'text-primary font-semibold' : 'text-gray-500'
        }`}
        style={{ textAlign: 'left' }}
      >
        COFFEE AND BEVERAGE
        {isActive('/menu') && (
          <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-secondary block"></span>
        )}
      </Link>
      
      <Link 
        to="/food"
        onClick={(e) => handleClick(e, '/food')} 
        className={`py-2.5 bg-transparent border-none cursor-pointer text-base transition-all relative ${
          isActive('/food') ? 'text-primary font-semibold' : 'text-gray-500'
        }`}
        style={{ textAlign: 'center' }}
      >
        FOOD AND SNACK
        {isActive('/food') && (
          <span className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 w-4/5 h-[3px] bg-secondary block"></span>
        )}
      </Link>
      
      <Link 
        to="/at-home" 
        onClick={(e) => handleClick(e, '/at-home')}
        className={`py-2.5 bg-transparent border-none cursor-pointer text-base transition-all relative ${
          isActive('/at-home') ? 'text-primary font-semibold' : 'text-gray-500'
        }`}
        style={{ textAlign: 'right' }}
      >
        IMAJI COFFEE AT HOME
        {isActive('/at-home') && (
          <span className="absolute bottom-[-1px] right-0 w-full h-[3px] bg-secondary block"></span>
        )}
      </Link>
    </div>
  )
}

export default MenuTabs
