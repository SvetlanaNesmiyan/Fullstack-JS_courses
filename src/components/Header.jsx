import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { toggleCart, totalItems } = useCart()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')

  const isHomePage = location.pathname === '/'
  const isCheckout = location.pathname === '/checkout'
  const isMenuPage = location.pathname === '/menu'

  // Handle scroll for active navigation on Home page
  useEffect(() => {
    if (!isHomePage) return

    const sections = ['home', 'story', 'menu', 'space', 'community', 'news']

    const handleScroll = () => {
      let scrollY = window.pageYOffset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const sectionTop = element.offsetTop - 150
          const sectionHeight = element.offsetHeight
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'space', label: 'Space' },
    { id: 'community', label: 'Community' },
    { id: 'news', label: 'News' },
  ]

  // On checkout page - hide everything
  if (isCheckout) {
    return null
  }

  return (
    <header className="bg-white sticky top-0 z-[100] border-b border-gray-200">
      <div className="container">
        <div className="flex justify-between items-center py-5">
          <div className="text-2xl text-primary flex-1">
            IMAJI<span className="text-secondary"> Coffee.</span>
          </div>

          <nav className="flex-2 flex justify-end">
            <ul className="flex list-none gap-[30px] mr-[30px]">
              {navItems.map(item => (
                <li key={item.id}>
                  {isHomePage ? (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`text-gray-700 no-underline relative whitespace-nowrap transition-colors hover:text-secondary bg-transparent border-none cursor-pointer ${
                        activeSection === item.id 
                          ? 'text-secondary after:content-[""] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-[2px] after:bg-secondary' 
                          : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link 
                      to="/" 
                      className="text-gray-700 no-underline relative whitespace-nowrap transition-colors hover:text-secondary"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!isHomePage && (
              <button 
                onClick={toggleCart}
                className="bg-transparent border-none text-gray-700 cursor-pointer flex items-center gap-1 whitespace-nowrap"
              >
                <i className="fas fa-shopping-cart"></i> Cart
                <span className="bg-secondary text-white rounded-full w-[22px] h-[22px] flex items-center justify-center text-xs">
                  ({totalItems})
                </span>
              </button>
            )}
            
            {isHomePage && (
              <Link 
                to="/menu" 
                className="bg-[#A27B5C] text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all hover:bg-[#8b5a2b] no-underline whitespace-nowrap"
              >
                Order
              </Link>
            )}
            
            <button className="bg-transparent border border-primary px-4 py-2 rounded cursor-pointer transition-all hover:bg-primary hover:text-white whitespace-nowrap">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
