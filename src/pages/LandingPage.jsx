import { Link } from 'react-router-dom'
import { productsData } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const LandingPage = () => {
  // Get specific products: Ristretto Bianco, French Toast With Sugar, AT HOME HOUSE BLEND (twice)
  const menuProducts = [
    { ...productsData.coffee.find(p => p.name === 'RISTRETTO BIANCO') || productsData.coffee[0], badge: 'SALE' },
    { ...productsData.food.find(p => p.name === 'FRENCH TOAST WITH SUGAR') || productsData.food[1], badge: 'SALE' },
    { ...productsData.atHome.find(p => p.name === 'AT HOME HOUSE BLEND') || productsData.atHome[0], badge: 'SALE' },
    { ...productsData.atHome.find(p => p.name === 'AT HOME HOUSE BLEND') || productsData.atHome[0], badge: 'SALE' },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }

  const events = [
    { title: 'LATTE ART WORKSHOP', date: '20 Feb 2023' },
    { title: 'EXHIBITION COFFEE HARDWARE', date: '20 Mar 2023' },
  ]

  return (
    <>
      {/* Navbar Spacer */}
      <div className="h-[80px]"></div>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-20 px-[100px]">
          <div className="max-w-[1440px] mx-auto">
            {/* Text above image - centered */}
            <div className="mb-10 text-center">
              <h1 
                className="text-[#121212] mb-5 leading-tight"
                style={{ 
                  fontFamily: 'DM Sans', 
                  fontStyle: 'normal', 
                  fontWeight: 500, 
                  fontSize: '96px', 
                  lineHeight: '125px',
                  textAlign: 'center'
                }}
              >
                Choose Your Coffee & Space
              </h1>
            </div>
            
            {/* Image below */}
            <div className="w-full">
              <img 
                src="/hero.png" 
                alt="Coffee and workspace" 
                className="w-full rounded-2xl"
                style={{ height: '511px', objectFit: 'cover' }}
              />
              
              {/* Text and Stats below image */}
              <div className="flex justify-between mt-10">
                {/* Left: IMAJI Coffee text */}
                <div className="text-left max-w-[500px]">
                  <p className="text-lg text-[#666]">
                    IMAJI Coffee has been serving 20,000+ cups of coffee and providing a comfortable place for our customers to work since 2010.
                  </p>
                </div>
                
                {/* Right: Stats */}
                <div className="flex gap-10">
                  <div className="text-left">
                    <span className="text-2xl font-semibold text-[#121212]">32+</span>
                    <p className="text-base text-[#666]">Variant Menu</p>
                  </div>
                  <div className="text-left">
                    <span className="text-2xl font-semibold text-[#121212]">8</span>
                    <p className="text-base text-[#666]">Comfy Space</p>
                  </div>
                  <div className="text-left">
                    <span className="text-2xl font-semibold text-[#121212]">500+</span>
                    <p className="text-base text-[#666]">Community Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-20">
          {/* Header - full width background */}
          <div className="max-w-[1440px] mx-auto px-[100px]">
            <h2 className="text-[#121212] mb-[60px]" style={{ width: '100%', fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '96px', lineHeight: '125px' }}>
              We Provide Your Space For<br />
              Your Work or Mini event With<br />
              Your Favorite coffee.
            </h2>
            
            {/* Two paragraphs */}
            <div className="flex justify-between mb-[60px]">
              {/* Left paragraph */}
              <p className="text-xl text-[#555] max-w-[500px] leading-relaxed" style={{ letterSpacing: '3%' }}>
                Our story begins in 2010 with a simple idea from our founder that the most comfortable place to work is anywhere, because ideas are not limited by space and time, and the most comfortable place is in a café where their favorite coffee is available.
              </p>
              
              {/* Right paragraph */}
              <p className="text-xl text-[#555] max-w-[500px] leading-relaxed" style={{ letterSpacing: '3%' }}>
                All the best local coffee bean varieties from throughout Indonesia are available with us. Directly from selected farmers, high-quality beans are processed and roasted to perfection by ourselves, then passed on to our skilled baristas who are passionate about preparing a cup of longed-for happiness from home.
              </p>
            </div>
          </div>
          
          {/* Images - full viewport width - flush with edges */}
          <div className="w-screen flex gap-8 absolute left-0" style={{ height: '620px' }}>
            <img 
              src="/1.png" 
              alt="Workspace 1" 
              style={{ width: 'calc((100vw - 96px) / 4)', height: '400px', marginTop: '0' }}
            />
            <img 
              src="/2.png" 
              alt="Workspace 2" 
              style={{ width: 'calc((100vw - 96px) / 4)', height: '400px', marginTop: '80px' }}
            />
            <img 
              src="/3.png" 
              alt="Workspace 3" 
              style={{ width: 'calc((100vw - 96px) / 4)', height: '400px', marginTop: '160px' }}
            />
            <img 
              src="/4.png" 
              alt="Workspace 4" 
              style={{ width: 'calc((100vw - 96px) / 4)', height: '400px', marginTop: '220px' }}
            />
          </div>
          
          {/* Spacer after images */}
          <div className="h-[750px]"></div>
        </section>

        {/* Menu Highlights Section - immediately after Story */}
        <section id="menu" className="py-20 px-[100px]">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-start mb-16">
              {/* Left side - Find Your Favorite */}
              <div>
                <h2 
                  className="text-8xl/Medium text-[#121212] leading-tight"
                  style={{ fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '96px', lineHeight: '125px' }}
                >
                  Find Your Favorite
                </h2>
                <h2 
                  className="font-medium text-[#121212] leading-tight"
                  style={{ fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '96px', lineHeight: '125px' }}
                >
                  Menu
                </h2>
              </div>
              
              {/* Right side - Button positioned between the text lines */}
              <div className="flex items-start" style={{ paddingTop: '60px' }}>
                <Link 
                  to="/menu" 
                  className="inline-block bg-[#A27B5C] text-white px-4 py-3 rounded-lg font-medium"
                  style={{ 
                    width: '190px', 
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    letterSpacing: '3%'
                  }}
                >
                  Explore Other Menu
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {menuProducts.map((product, index) => (
                product ? <ProductCard key={`${product.id}-${index}`} product={product} /> : null
              ))}
            </div>
          </div>
        </section>

        {/* Coffee App Section */}
        <section id="coffee-app" className="py-20 bg-[#FCF7EF]">
          <div className="max-w-[1440px] mx-auto px-[100px]">
            {/* Heading */}
            <div className="mb-10">
              {/* Logo */}
              <div className="flex items-center gap-[8.35px] mb-4">
                <div 
                  className="flex items-center justify-center"
                  style={{
                    width: '35.07px',
                    height: '36.74px',
                    borderRadius: '6.68px',
                    background: '#A27B5C',
                    padding: '5.01px 4.18px'
                  }}
                >
                  <img 
                    src="/monogram.png" 
                    alt="MONOGRAM" 
                    style={{ width: '26.72px', height: '26.72px' }}
                  />
                </div>
                <h3 className="text-[36.74px] font-semibold" style={{ letterSpacing: '2%' }}>
                  <span style={{ color: '#A27B5C' }}>IMA</span><span style={{ color: '#121212' }}>COF</span>
                </h3>
              </div>
              
              {/* Main Heading */}
              <h2 className="font-medium text-[#121212] leading-tight mb-6" style={{ width: '100%', fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '96px', lineHeight: '125px'}}>
                The Best Experience,<br />
                Enjoying Coffee
              </h2>
              
              {/* Description */}
              <div className="flex justify-between max-w-[1192px]">
                <p className="text-xl text-[#121212] max-w-[500px]" style={{ letterSpacing: '3%', lineHeight: '150%' }}>
                  Enjoy a cup of coffee full of flavor from Imaji<br />
                  Coffee in just one application.
                </p>
                <p className="text-xl text-[#121212] max-w-[500px]" style={{ letterSpacing: '3%', lineHeight: '150%' }}>
                  Order without the wait, enjoy daily exclusive deals, earn Imaji Points, and more exciting promos!
                </p>
              </div>
            </div>
            
            {/* Get the App and Phone Images */}
            <div className="mt-20">
              {/* Get the App + Store Buttons - ABOVE images - centered */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <span className="text-xl text-[#121212]" style={{ letterSpacing: '3%' }}>Get the App</span>
                <img 
                  src="/download-on-the-app-store-apple-4.png" 
                  alt="App Store" 
                  style={{ width: '134px', height: '40px' }}
                />
                <img 
                  src="/google-play-badge-2.png" 
                  alt="Google Play" 
                  style={{ width: '134px', height: '40px' }}
                />
              </div>
              
              {/* Phone Images - left, center, right - with padding on edges, smaller gap */}
              <div className="flex justify-between w-full px-24" style={{ marginTop: '80px' }}>
                <img 
                  src="/iphone-16-pro-mockup-desert-portrait-4.png" 
                  alt="Phone 1" 
                  style={{ width: '280px', height: '578px' }}
                />
                <img 
                  src="/iphone-16-pro-mockup-desert-portrait-3.png" 
                  alt="Phone 2" 
                  style={{ width: '280px', height: '578px' }}
                />
                <img 
                  src="/iphone-16-pro-mockup-desert-portrait-6.png" 
                  alt="Phone 3" 
                  style={{ width: '280px', height: '578px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Space Section */}
        <section id="space" className="py-20 px-[100px]">
          <div className="max-w-[1440px] mx-auto">
            {/* Title */}
            <h2 
              className= "text-8xl/Medium text-[#121212]"
              style={{ 
                fontFamily: 'DM Sans', 
                fontStyle: 'normal', 
                fontWeight: 500, 
                fontSize: '96px', 
                lineHeight: '125px',
                marginBottom: '20px'
              }}
            >
              8 Comfy Workspace
            </h2>
            
            {/* Description */}
            <p 
              className="text-xl - H5/Regular text-[#121212]"
              style={{ 
                fontFamily: 'DM Sans', 
                fontStyle: 'normal', 
                fontWeight: 400, 
                fontSize: '20px', 
                lineHeight: '28px',
                letterSpacing: '0.03em',
                width: '480px',
                minWidth: '480px',
                marginBottom: '40px'
              }}
            >
              We provide many attractive and unique workspaces so you will have no trouble finding the workspace you want.
            </p>
            
            {/* Space Cards - Horizontal Scroll - Fixed width container */}
            <div 
              className="overflow-x-auto" 
              style={{ 
                width: '100%', 
                maxWidth: '1440px', 
                height: '500px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="flex gap-12" style={{ width: 'max-content' }}>
              {/* WHITE WALL */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/white-wall.png" alt="WHITE WALL" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>WHITE WALL</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Event Space</span>
                </div>
              </div>
              
              {/* LONG WINDOW */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/long-window.png" alt="LONG WINDOW" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>LONG WINDOW</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Event Space</span>
                </div>
              </div>
              
              {/* GENGS SPACE */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/gengs-space.png" alt="GENGS SPACE" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>GENGS SPACE</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Event Space</span>
                </div>
              </div>
              
              {/* SEMINAR AREA */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/seminar-area.png" alt="SEMINAR AREA" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>SEMINAR AREA</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Event Space</span>
                </div>
              </div>
              
              {/* Center area */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/center-area.png" alt="Center area" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>Center area</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Event Space</span>
                </div>
              </div>
              
              {/* AQUARIUM */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/aquarium.png" alt="AQUARIUM" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>AQUARIUM</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Meeting Space</span>
                </div>
              </div>
              
              {/* Roftop */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/roftop.png" alt="Roftop" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>Roftop</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Workspace</span>
                </div>
              </div>
              
              {/* HAMBLE SPACE */}
              <div style={{ width: '399px', height: '500px', position: 'relative', flexShrink: 0 }}>
                <img src="/hamble-space.png" alt="HAMBLE SPACE" style={{ width: '399px', height: '500px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: '0', top: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>HAMBLE SPACE</span>
                  <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#A27B5C' }}>Meeting Space</span>
                </div>
              </div>
            </div>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex gap-[10px] mt-8 justify-center">
              <div style={{ width: '22px', height: '22px', background: '#E3E3E3', borderRadius: '50%' }}></div>
              <div style={{ width: '22px', height: '22px', background: '#A27B5C', borderRadius: '50%' }}></div>
              <div style={{ width: '22px', height: '22px', background: '#E3E3E3', borderRadius: '50%' }}></div>
            </div>
          </div>
        </section>

        {/* Community & Events Section */}
        <section id="community" className="py-20 px-[100px]">
          <div className="max-w-[1440px] mx-auto">
            {/* Title */}
            <h2 
              className="text-[#121212]"
              style={{ 
                fontFamily: 'DM Sans', 
                fontStyle: 'normal', 
                fontWeight: 500, 
                fontSize: '96px', 
                lineHeight: '125px',
                marginBottom: '40px'
              }}
            >
              We Grow Together With Our Customer
            </h2>
            
            {/* Content Container */}
            <div 
              className="flex"
              style={{ 
                width: '100%', 
                maxWidth: '1440px',
                height: '400px',
                gap: '48px'
              }}
            >
              {/* Left Side - Description and Button */}
              <div 
                className="flex flex-col"
                style={{ 
                  width: '366px',
                  height: '324px',
                  gap: '80px'
                }}
              >
                <p 
                  className="text-[#121212]"
                  style={{ 
                    fontFamily: 'DM Sans', 
                    fontStyle: 'normal', 
                    fontWeight: 400, 
                    fontSize: '20px', 
                    lineHeight: '28px',
                    letterSpacing: '0.03em'
                  }}
                >
                  We believe that we are big not because of us but because of them. they are the ones who motivate us to continue to innovate to provide a quality coffee taste and comfortable space that is getting better every day.
                </p>
                
                <Link 
                  to="#" 
                  className="inline-flex items-center justify-start text-white font-medium no-underline"
                >
                  <svg width="192" height="48" viewBox="0 0 192 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="192" height="48" fill="#A27B5C"/>
                    <path d="M17.168 29V17.8H24.224V19.112H18.768V22.696H23.744V23.976H18.768V27.688H24.224V29H17.168ZM25.9406 29L28.7246 24.984L25.9406 20.968H27.6686L29.7806 24.088L31.9086 20.968H33.6366L30.8366 24.984L33.6366 29H31.9086L29.7806 25.864L27.6686 29H25.9406ZM35.5011 32.52V20.968H36.9411L37.1011 22.216C37.2718 21.96 37.4851 21.7253 37.7411 21.512C37.9971 21.288 38.3011 21.112 38.6531 20.984C39.0158 20.8453 39.4371 20.776 39.9171 20.776C40.6851 20.776 41.3571 20.9627 41.9331 21.336C42.5198 21.6987 42.9785 22.2 43.3091 22.84C43.6398 23.4693 43.8051 24.1893 43.8051 25C43.8051 25.8107 43.6398 26.5307 43.3091 27.16C42.9785 27.7893 42.5198 28.2853 41.9331 28.648C41.3465 29.0107 40.6691 29.192 39.9011 29.192C39.2718 29.192 38.7171 29.0693 38.2371 28.824C37.7571 28.568 37.3785 28.216 37.1011 27.768V32.52H35.5011ZM39.6451 27.8C40.1358 27.8 40.5731 27.6827 40.9571 27.448C41.3411 27.2133 41.6398 26.888 41.8531 26.472C42.0665 26.0453 42.1731 25.5493 42.1731 24.984C42.1731 24.4293 42.0665 23.9387 41.8531 23.512C41.6398 23.0853 41.3411 22.7547 40.9571 22.52C40.5731 22.2853 40.1358 22.168 39.6451 22.168C39.1438 22.168 38.7011 22.2853 38.3171 22.52C37.9331 22.7547 37.6345 23.0853 37.4211 23.512C37.2185 23.928 37.1171 24.4187 37.1171 24.984C37.1171 25.5493 37.2185 26.0453 37.4211 26.472C37.6345 26.888 37.9331 27.2133 38.3171 27.448C38.7011 27.6827 39.1438 27.8 39.6451 27.8ZM46.153 29V17.48H47.753V29H46.153ZM54.0942 29.192C53.3369 29.192 52.6542 29.0213 52.0462 28.68C51.4489 27.8373 50.9742 27.208 50.6222 26.44C50.2809 25.672 50.1102 24.8293 50.1102 23.912C50.1102 22.9947 50.2809 22.152 50.6222 21.384C50.9742 20.6053 51.4489 19.9707 52.0462 19.48C52.6542 18.9787 53.3369 18.808 54.0942 18.808C54.8516 18.808 55.5342 18.9787 56.1422 19.48C56.7502 19.9707 57.2249 20.6053 57.5662 21.384C57.9182 22.152 58.0942 22.9947 58.0942 23.912C58.0942 24.8293 57.9182 25.672 57.5662 26.44C57.2249 27.208 56.7502 27.8373 56.1422 28.68C55.5342 29.0213 54.8516 29.192 54.0942 29.192ZM54.0942 27.8C54.5316 27.8 54.9262 27.6987 55.2782 27.496C55.6409 27.2827 55.9289 26.9627 56.1422 26.536C56.3662 26.1093 56.4782 25.5867 56.4782 24.968C56.4782 24.3387 56.3716 23.816 56.1582 23.4C55.9449 22.9733 55.6569 22.6587 55.2942 22.456C54.9422 22.2427 54.5529 22.136 54.1262 22.136C53.7102 22.136 53.3156 22.2427 52.9422 22.456C52.5796 22.6587 52.2862 22.9733 52.0622 23.4C51.8489 23.816 51.7422 24.3387 51.7422 24.968C51.7422 25.5867 51.8489 26.1093 52.0622 26.536C52.2862 26.9627 52.5742 27.2827 52.9262 27.496C53.2889 27.6987 53.6782 27.8 54.0942 27.8ZM60.4568 29V20.968H61.8968L62.0408 22.488C62.2221 22.1253 62.4514 21.8213 62.7288 21.576C63.0168 21.32 63.3528 21.1227 63.7368 20.984C64.1314 20.8453 64.5741 20.776 65.0648 20.776V22.456H64.5368C64.1954 22.456 63.8754 22.4987 63.5768 22.584C63.2781 22.6693 63.0114 22.808 62.7768 23C62.5528 23.192 62.3768 23.4533 62.2488 23.784C62.1208 24.1147 62.0568 24.5253 62.0568 25.016V29H60.4568ZM70.4601 29.192C69.6815 29.192 68.9935 29.0213 68.3961 28.68C67.7988 28.328 67.3295 27.8373 66.9881 27.208C66.6575 26.5787 66.4921 25.8427 66.4921 25C66.4921 24.1573 66.6575 23.4213 66.9881 22.792C67.3295 22.1627 67.7988 21.672 68.3961 21.32C68.9935 20.9573 69.6868 20.776 70.4761 20.776C71.2655 20.776 71.9428 20.952 72.5081 21.304C73.0735 21.6453 73.5108 22.1093 73.8201 22.696C74.1295 23.272 74.2841 23.912 74.2841 24.616C74.2841 24.7227 74.2841 24.84 74.2841 24.968C74.2841 25.0853 74.2735 25.2133 74.2521 25.352H67.6601V24.232H72.6841C72.6521 23.5707 72.4281 23.0533 72.0121 22.68C71.5961 22.296 71.0788 22.104 70.4601 22.104C70.0335 22.104 69.6335 22.2 69.2601 22.392C68.8975 22.584 68.6041 22.872 68.3801 23.256C68.1668 23.6293 68.0601 24.104 68.0601 24.68V25.128C68.0601 25.7253 68.1668 26.2267 68.3801 26.632C68.6041 27.0373 68.8975 27.3467 69.2601 27.56C69.6228 27.7627 70.0175 27.864 70.4441 27.864C70.9561 27.864 71.3775 27.752 71.7081 27.528C72.0495 27.2933 72.3001 26.984 72.4601 26.6H74.0601C73.9108 27.1013 73.6708 27.5493 73.3401 27.944C73.0201 28.328 72.6148 28.632 72.1241 28.856C71.6441 29.08 71.0895 29.192 70.4601 29.192ZM86.2515 29.192C85.1742 29.192 84.2248 28.952 83.4035 28.472C82.5822 27.9813 81.9368 27.304 81.4675 26.44C81.0088 25.5653 80.7795 24.552 80.7795 23.4C80.7795 22.2587 81.0088 21.256 81.4675 20.392C81.9368 19.5173 82.5822 18.8347 83.4035 18.344C84.2248 17.8533 85.1742 17.608 86.2515 17.608C87.3502 17.608 88.3102 17.8533 89.1315 18.344C89.9635 18.8347 90.6035 19.5173 91.0515 20.392C91.5102 21.256 91.7395 22.2587 91.7395 23.4C91.7395 24.552 91.5102 25.5653 91.0515 26.44C90.6035 27.304 89.9635 27.9813 89.1315 28.472C88.3102 28.952 87.3502 29.192 86.2515 29.192ZM86.2675 27.768C87.0355 27.768 87.7075 27.592 88.2835 27.24C88.8702 26.888 89.3182 26.3867 89.6275 25.736C89.9475 25.0853 90.1075 24.3067 90.1075 23.4C90.1075 22.4933 89.9475 21.7147 89.6275 21.064C89.3182 20.4133 88.8702 19.9173 88.2835 19.576C87.7075 19.224 87.0355 19.048 86.2675 19.048C85.4995 19.048 84.8222 19.224 84.2355 19.576C83.6595 19.9173 83.2115 20.4133 82.8915 21.064C82.5715 21.7147 82.4115 22.4933 82.4115 23.4C82.4115 24.3067 82.5715 25.0853 82.8915 25.736C83.2115 26.3867 83.6595 26.888 84.2355 27.24C84.8222 27.592 85.4995 27.768 86.2675 27.768ZM97.3762 29C96.8749 29 96.4322 28.92 96.0482 28.76C95.6749 28.6 95.3869 28.3333 95.1842 27.96C94.9922 27.5867 94.8962 27.08 94.8962 26.44V22.312H93.5042V20.968H94.8962L95.0882 18.952H96.4962V20.968H98.7682V22.312H96.4962V26.456C96.4962 26.9147 96.5869 27.2293 96.7682 27.4C96.9603 27.56 97.2909 27.64 97.7603 27.64H98.6883V29H97.3762ZM101.013 29V17.48H102.613V22.28C102.88 21.8107 103.248 21.4427 103.717 21.176C104.197 20.9093 104.725 20.776 105.301 20.776C105.941 20.776 106.49 20.904 106.949 21.16C107.408 21.416 107.76 21.8053 108.005 22.328C108.25 22.8507 108.373 23.5013 108.373 24.28V29H106.789V24.456C106.789 23.688 106.629 23.112 106.309 22.728C105.989 22.3333 105.514 22.136 104.885 22.136C104.458 22.136 104.069 22.2427 103.717 22.456C103.376 22.6587 103.104 22.952 102.901 23.336C102.709 23.72 102.613 24.1947 102.613 24.76V29H101.013ZM114.548 29.192C113.769 29.192 113.081 29.0213 112.484 28.68C111.886 28.328 111.417 27.8373 111.076 27.208C110.745 26.5787 110.58 25.8427 110.58 25C110.58 24.1573 110.745 23.4213 111.076 22.792C111.417 22.1627 111.886 21.672 112.484 21.32C113.081 20.9573 113.774 20.776 114.564 20.776C115.353 20.776 116.03 20.952 116.596 21.304C117.161 21.6453 117.598 22.1093 117.908 22.696C118.217 23.272 118.372 23.912 118.372 24.616C118.372 24.7227 118.372 24.84 118.372 24.968C118.372 25.0853 118.361 25.2133 118.34 25.352H111.748V24.232H116.772C116.74 23.5707 116.516 23.0533 116.1 22.68C115.684 22.296 115.166 22.104 114.548 22.104C114.121 22.104 113.721 22.2 113.348 22.392C112.985 22.584 112.692 22.872 112.468 23.256C112.254 23.6293 112.148 24.104 112.148 24.68V25.128C112.148 25.7253 112.254 26.2267 112.468 26.632C112.692 27.0373 112.985 27.3467 113.348 27.56C113.71 27.7627 114.105 27.864 114.532 27.864C115.044 27.864 115.465 27.752 115.796 27.528C116.137 27.2933 116.388 26.984 116.548 26.6H118.148C117.998 27.1013 117.758 27.5493 117.428 27.944C117.108 28.328 116.702 28.632 116.212 28.856C115.732 29.08 115.177 29.192 114.548 29.192ZM120.629 29V20.968H122.069L122.213 22.488C122.395 22.1253 122.624 21.8213 122.901 21.576C123.189 21.32 123.525 21.1227 123.909 20.984C124.304 20.8453 124.747 20.776 125.237 20.776V22.456H124.709C124.368 22.456 124.048 22.4987 123.749 22.584C123.451 22.6693 123.184 22.808 122.949 23C122.725 23.192 122.549 23.4533 122.421 23.784C122.293 24.1147 122.229 24.5253 122.229 25.016V29H120.629ZM131.857 29V17.8H138.913V19.112H133.457V22.696H138.433V23.976H133.457V27.688H138.913V29H131.857ZM143.669 29L140.661 20.968H142.341L144.613 27.464L146.917 20.968H148.565L145.557 29H143.669ZM153.76 29.192C152.981 29.192 152.293 29.0213 151.696 28.68C151.099 28.328 150.629 27.8373 150.288 27.208C149.957 26.5787 149.792 25.8427 149.792 25C149.792 24.1573 149.957 23.4213 150.288 22.792C150.629 22.1627 151.099 21.672 151.696 21.32C152.293 20.9573 152.987 20.776 153.776 20.776C154.565 20.776 155.243 20.952 155.808 21.304C156.373 21.6453 156.811 22.1093 157.12 22.696C157.429 23.272 157.584 23.912 157.584 24.616C157.584 24.7227 157.584 24.84 157.584 24.968C157.584 25.0853 157.573 25.2133 157.552 25.352H150.96V24.232H155.984C155.952 23.5707 155.728 23.0533 155.312 22.68C154.896 22.296 154.379 22.104 153.76 22.104C153.333 22.104 152.933 22.2 152.56 22.392C152.197 22.584 151.904 22.872 151.68 23.256C151.467 23.6293 151.36 24.104 151.36 24.68V25.128C151.36 25.7253 151.467 26.2267 151.68 26.632C151.904 27.0373 152.197 27.3467 152.56 27.56C152.923 27.7627 153.317 27.864 153.744 27.864C154.256 27.864 154.677 27.752 155.008 27.528C155.349 27.2933 155.6 26.984 155.76 26.6H157.36C157.211 27.1013 156.971 27.5493 156.64 27.944C156.32 28.328 155.915 28.632 155.424 28.856C154.944 29.08 154.389 29.192 153.76 29.192ZM159.842 29V20.968H161.282L161.378 22.344C161.634 21.864 161.996 21.4853 162.466 21.208C162.935 20.92 163.479 20.776 164.098 20.776C164.727 20.776 165.271 20.904 165.73 21.16C166.188 21.416 166.546 21.8053 166.802 22.328C167.058 22.84 167.186 23.4853 167.186 24.264V29H165.586V24.424C165.586 23.6773 165.42 23.112 165.09 22.728C164.759 22.3333 164.284 22.136 163.666 22.136C163.239 22.136 162.855 22.2373 162.514 22.44C162.183 22.6427 161.922 22.936 161.73 23.32C161.538 23.704 161.442 24.1787 161.442 24.744V29H159.842ZM173.024 29C172.523 29 172.08 28.92 171.696 28.76C171.323 28.6 171.035 28.3333 170.832 27.96C170.64 27.5867 170.544 27.08 170.544 26.44V22.312H169.152V20.968H170.544L170.736 18.952H172.144V20.968H174.416V22.312H172.144V26.456C172.144 26.9147 172.235 27.2293 172.416 27.4C172.608 27.56 172.939 27.64 173.408 27.64H174.336V29H173.024Z" fill="white"/>
                  </svg>
                </Link>
              </div>
              
              {/* Right Side - Event Cards Horizontal Scroll */}
              <div 
                className="overflow-x-auto flex"
                style={{ 
                  width: '100%',
                  maxWidth: '902px',
                  height: '400px',
                  gap: '48px',
                  paddingLeft: '124px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {/* LATTE ART WORKSHOP */}
                <div style={{ width: '570px', height: '400px', position: 'relative', flexShrink: 0 }}>
                  <img src="/latte-art-workshop.png" alt="LATTE ART WORKSHOP" style={{ width: '570px', height: '400px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', left: '0', bottom: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>LATTE ART WORKSHOP</span>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#A27B5C' }}>20 Feb 2023</span>
                  </div>
                </div>
                
                {/* EXHIBITION COFFEE HARDWARE */}
                <div style={{ width: '570px', height: '400px', position: 'relative', flexShrink: 0 }}>
                  <img src="/exhibition-coffee-hardware.png" alt="EXHIBITION COFFEE HARDWARE" style={{ width: '570px', height: '400px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', left: '0', bottom: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>EXHIBITION COFFEE HARDWARE</span>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#A27B5C' }}>20 Mar 2023</span>
                  </div>
                </div>
                
                {/* Factory visit */}
                <div style={{ width: '570px', height: '400px', position: 'relative', flexShrink: 0 }}>
                  <img src="/factory-visit.png" alt="Factory visit" style={{ width: '570px', height: '400px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', left: '0', bottom: '0', padding: '16px 20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '20px', lineHeight: '28px', color: '#121212' }}>Factory visit</span>
                    <span style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#A27B5C' }}>20 Apr 2023</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Podcast Card */}
            <div 
              className="flex flex-col justify-center items-start"
              style={{ 
                width: '1192px',
                height: '292.06px',
                background: '#A27B5C',
                padding: '32px',
                gap: '32px',
                marginTop: '48px'
              }}
            >
              {/* Podcast Content */}
              <div style={{ display: 'flex', gap: '32px', width: '100%' }}>
                {/* Podcast Image */}
                <div style={{ width: '140px', height: '140.06px', position: 'relative' }}>
                  <img src="/mix-the-taste-of-indonesian-coffee.png" alt="Podcast" style={{ width: '140px', height: '140px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.3055 34.125H11.8195C10.6523 34.125 9.60048 33.4741 9.07898 32.4276C8.55398 31.3758 8.66597 30.1386 9.37122 29.2006L14.6161 22.2232C15.7851 20.6675 18.3418 20.6675 19.5108 22.2232L24.7555 29.1989C25.4607 30.1369 25.5727 31.3741 25.0477 32.4258C24.5245 33.4741 23.4727 34.125 22.3055 34.125ZM17.0625 23.625C16.982 23.625 16.828 23.6479 16.7143 23.8002L11.4694 30.7771C11.3224 30.9713 11.3803 31.1586 11.4276 31.2531C11.4731 31.3441 11.585 31.4983 11.8213 31.4983H22.3072C22.5434 31.4983 22.6538 31.3441 22.7011 31.2531C22.7466 31.1586 22.806 30.9713 22.659 30.7771L17.4143 23.8002C17.2971 23.6479 17.143 23.625 17.0625 23.625ZM23.4552 18.6006C23.5672 18.0808 23.625 17.563 23.625 17.0625C23.625 13.4435 20.6798 10.5 17.0625 10.5C13.4453 10.5 10.5 13.4435 10.5 17.0625C10.5 17.563 10.5561 18.0808 10.6698 18.6006C10.8238 19.3093 11.5237 19.7608 12.2325 19.605C12.9395 19.4528 13.3892 18.7531 13.2369 18.0443C13.1617 17.7013 13.1267 17.3793 13.1267 17.0608C13.1267 14.889 14.8942 13.1233 17.0642 13.1233C19.2342 13.1233 21.0017 14.889 21.0017 17.0608C21.0017 17.3793 20.965 17.6996 20.8915 18.0443C20.7392 18.7531 21.1889 19.451 21.8959 19.605C21.9904 19.626 22.0832 19.6349 22.176 19.6349C22.778 19.6349 23.3222 19.2148 23.4552 18.6006ZM26.789 23.7929C28.154 21.8172 28.875 19.4897 28.875 17.0625C28.875 10.549 23.576 5.25 17.0625 5.25C10.549 5.25 5.25 10.549 5.25 17.0625C5.25 19.4897 5.97103 21.8172 7.33603 23.7929C7.74553 24.3879 8.56093 24.5404 9.16293 24.1274C9.75793 23.7162 9.90854 22.8968 9.49554 22.3018C8.43504 20.7671 7.87329 18.9543 7.87329 17.0625C7.87329 11.9963 11.9945 7.875 17.0608 7.875C22.127 7.875 26.2483 11.9963 26.2483 17.0625C26.2483 18.9543 25.6883 20.7653 24.626 22.3018C24.2148 22.8986 24.3652 23.7162 24.9584 24.1274C25.1877 24.2849 25.4467 24.3599 25.704 24.3599C26.124 24.3599 26.5335 24.1622 26.789 23.7929ZM29.9512 28.2153C32.6427 25.1318 34.125 21.1715 34.125 17.0625C34.125 7.6545 26.4705 0 17.0625 0C7.6545 0 0 7.6545 0 17.0625C0 21.1715 1.48227 25.1318 4.17377 28.2153C4.64977 28.7613 5.47745 28.8174 6.02695 28.3414C6.57295 27.8654 6.63073 27.0357 6.15298 26.4897C3.87798 23.8839 2.625 20.5362 2.625 17.0625C2.625 9.10175 9.10175 2.625 17.0625 2.625C25.0233 2.625 31.5 9.10175 31.5 17.0625C31.5 20.5362 30.247 23.8839 27.972 26.4897C27.496 27.0357 27.5521 27.8654 28.0981 28.3414C28.3483 28.5584 28.6544 28.6648 28.9607 28.6648C29.3282 28.6648 29.6922 28.5128 29.9512 28.2153Z" fill="white"/>
                    </svg>
                    <span style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '5px' }}>Imaji Coffee Podcast</span>
                  </div>
                </div>
                
                {/* Podcast Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: '48px', lineHeight: '62px', color: '#FFFFFF', margin: 0 }}>Mix The Taste of Indonesian Coffee</h3>
                    {/* Spotify Icon */}
                    <a 
                      href="https://open.spotify.com/playlist/6lBlqj7s2a1CsKllGGQSWw?si=0856ebb290ef4acf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ cursor: 'pointer' }}
                    >
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 0C7.84 0 0 7.84 0 17.5C0 27.16 7.84 35 17.5 35C27.16 35 35 27.16 35 17.5C35 7.84 27.16 0 17.5 0ZM24.605 25.7425C24.3075 25.7425 24.1325 25.655 23.8525 25.48C19.4425 22.82 14.3325 22.715 9.27498 23.7475C8.99498 23.8175 8.64501 23.9225 8.43501 23.9225C7.75251 23.9225 7.31499 23.38 7.31499 22.8025C7.31499 22.0675 7.75252 21.735 8.27752 21.6125C14.0525 20.335 19.9675 20.44 25.0075 23.4675C25.445 23.7475 25.69 23.9925 25.69 24.64C25.69 25.2875 25.1825 25.725 24.6225 25.725L24.605 25.7425ZM26.495 21.105C26.1275 21.105 25.8825 20.9475 25.62 20.8075C21.21 18.2 14.63 17.15 8.78498 18.725C8.45248 18.8125 8.26001 18.9 7.94501 18.9C7.19251 18.9 6.58002 18.2875 6.58002 17.535C6.58002 16.7825 6.94751 16.275 7.66501 16.0825C9.62501 15.54 11.6375 15.12 14.56 15.12C19.145 15.12 23.5725 16.2575 27.055 18.3225C27.6325 18.655 27.86 19.0925 27.86 19.705C27.86 20.475 27.265 21.0875 26.495 21.0875V21.105ZM28.6825 15.7325C28.315 15.7325 28.0875 15.645 27.7725 15.4525C22.75 12.46 13.7725 11.7425 7.94501 13.3525C7.68252 13.4225 7.36748 13.5275 7.03498 13.5275C6.10748 13.5275 5.38998 12.7925 5.38998 11.865C5.38998 10.9375 5.985 10.36 6.615 10.185C9.1 9.45001 11.8825 9.11751 14.91 9.11751C20.055 9.11751 25.4625 10.185 29.4 12.495C29.9425 12.81 30.31 13.2475 30.31 14.0875C30.31 15.05 29.54 15.7325 28.665 15.7325H28.6825Z" fill="#1ED760"/>
                      </svg>
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF', fontFamily: 'DM Sans', fontSize: '18px' }}>
                    <span>Feb 2023</span>
                    <span style={{ width: '8px', height: '8px', background: '#F6F6F6', borderRadius: '50%' }}></span>
                    <span>1 hr 13 min</span>
                  </div>
                </div>
              </div>
              
              {/* Player Controls */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px', color: '#FFFFFF' }}>
                  {/* Arrow reply icon (left) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.99996 4.4966C11 4.4966 18 4.9965 18 11.4905C18 13.1985 17.532 14.6734 16.917 15.7554C16.675 16.1804 16.0259 16.0186 16.0319 15.5286C16.0649 12.9616 15.563 10.4915 7.99996 10.4915V13.9966C7.99996 14.8916 6.90598 15.3266 6.29098 14.6756L0.363 8.40554C-0.121 7.89354 -0.121 7.09356 0.363 6.58156L6.29098 0.311542C6.90598 -0.338458 7.99996 0.0964973 7.99996 0.990497V4.4966Z" fill="white"/>
                    </svg>
                    <span style={{ fontFamily: 'DM Sans', fontSize: '18px' }}>10s</span>
                  </div>
                  {/* Arrow share icon (right) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0.991162C10 0.096162 11.094 -0.338793 11.709 0.312207L17.637 6.58223C18.121 7.09423 18.121 7.8942 17.637 8.4062L11.709 14.6762C11.094 15.3262 10 14.8913 10 13.9973V10.4921C2.437 10.4921 1.93602 12.9622 1.96802 15.5292C1.97402 16.0192 1.32501 16.1813 1.08301 15.7563C0.467008 14.6753 0 13.2002 0 11.4912C0 4.99616 7 4.49727 10 4.49727V0.991162Z" fill="white"/>
                    </svg>
                    <span style={{ fontFamily: 'DM Sans', fontSize: '18px' }}>10s</span>
                  </div>
                </div>
                <div style={{ flex: 1, height: '2px', background: '#FFFFFF' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#FFFFFF', fontFamily: 'DM Sans', fontSize: '18px' }}>
                  <span>00:03/1:13:56</span>
                  {/* Volume high icon */}
                  <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.432 26.0008C12.6866 26.0008 11.9547 25.7383 11.3547 25.2303L6.43327 21.0607C6.13327 20.806 5.75062 20.6661 5.35596 20.6661H3C1.34667 20.6661 0 19.3208 0 17.6661V8.3341C0 6.67943 1.34667 5.3341 3 5.3341H5.35596C5.75062 5.3341 6.13324 5.19424 6.43457 4.93957L11.356 0.769974C12.3266 -0.0526931 13.644 -0.229862 14.7974 0.304804C15.9507 0.839471 16.6667 1.96086 16.6667 3.23286V22.77C16.6667 24.042 15.9507 25.1634 14.7974 25.698C14.3587 25.9007 13.8933 26.0008 13.432 26.0008ZM3.0013 7.3328C2.45064 7.3328 2.0013 7.7808 2.0013 8.3328V17.6648C2.0013 18.2168 2.45064 18.6648 3.0013 18.6648H5.35726C6.22393 18.6648 7.06523 18.9726 7.72656 19.534L12.6479 23.7036C13.0199 24.0196 13.5106 24.0887 13.9559 23.8807C14.4012 23.674 14.6667 23.258 14.6667 22.7674V3.23026C14.6667 2.73959 14.4012 2.32332 13.9559 2.11665C13.5119 1.90999 13.0213 1.97673 12.6493 2.29406L7.72656 6.46333C7.06523 7.02333 6.22393 7.3328 5.35726 7.3328H3.0013ZM20.6906 19.3608C22.3959 17.6635 23.3346 15.4035 23.3346 12.9995C23.3346 10.5955 22.3959 8.33547 20.6906 6.63814C20.2986 6.2488 19.6654 6.24874 19.276 6.64074C18.8854 7.03141 18.888 7.66612 19.2786 8.05546C20.604 9.37546 21.3346 11.1328 21.3346 13.0008C21.3346 14.8688 20.604 16.6261 19.2786 17.9461C18.888 18.3354 18.8854 18.9688 19.276 19.3608C19.4707 19.5568 19.7281 19.6554 19.9841 19.6554C20.24 19.6527 20.4946 19.5555 20.6906 19.3608ZM24.464 23.1342C27.1747 20.4302 28.668 16.8301 28.668 12.9995C28.668 9.1688 27.1747 5.5687 24.464 2.8647C24.072 2.47403 23.4387 2.47534 23.0493 2.866C22.66 3.25667 22.6599 3.89005 23.0519 4.28072C25.3839 6.60605 26.668 9.70213 26.668 12.9995C26.668 16.2968 25.3839 19.3916 23.0519 21.7182C22.6599 22.1089 22.66 22.7423 23.0493 23.1329C23.244 23.3289 23.5013 23.4262 23.7573 23.4262C24.0133 23.4262 24.268 23.3289 24.464 23.1342Z" fill="white"/>
                  </svg>
                  {/* Play button icon */}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.5 0.5C34.6503 0.5 44.5 10.3499 44.5 22.5C44.4998 34.6499 34.6502 44.499 22.5 44.499C10.3498 44.499 0.500178 34.6499 0.5 22.5C0.5 10.3499 10.3497 0.500006 22.5 0.5Z" stroke="white"/>
                    </svg>
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginLeft: '1px' }}>
                      <path d="M9.77336 7.59123L3.05599 11.7019C1.71932 12.5199 0 11.5605 0 9.99651V2.00383C0 0.439832 1.71932 -0.519409 3.05599 0.298591L9.77336 4.40927C10.9634 5.13793 10.9634 6.86323 9.77336 7.59123Z" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="bg-white">
          <div className="max-w-[1440px] mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 124px', gap: '48px' }}>
            {/* Title */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '1192px' }}>
              <h2 style={{ 
                width: '1192px', 
                fontFamily: 'DM Sans', 
                fontWeight: 500, 
                fontSize: '96px', 
                lineHeight: '125px', 
                textAlign: 'center', 
                color: '#121212', 
                margin: 0 
              }}>Our News</h2>
              <p style={{ 
                width: '1192px', 
                minWidth: '480px', 
                fontFamily: 'DM Sans', 
                fontWeight: 400, 
                fontSize: '20px', 
                lineHeight: '28px', 
                textAlign: 'center', 
                letterSpacing: '0.03em', 
                color: '#121212', 
                margin: 0 
              }}>
                Get the latest updates and deeper coffee experience from IMAJI Coffee
              </p>
            </div>
          </div>
          {/* Content */}
          <div className="max-w-[1440px] mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 124px 60px', gap: '24px' }}>
            {/* Image */}
            <img 
              src="/sections-new.png" 
              alt="News" 
              style={{ width: '1192px', height: '400px', objectFit: 'cover' }} 
            />
            {/* Description */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', width: '1192px' }}>
              <h3 style={{ 
                width: '1192px', 
                fontFamily: 'DM Sans', 
                fontWeight: 500, 
                fontSize: '30px', 
                lineHeight: '36px', 
                color: '#121212', 
                margin: 0 
              }}>
                Collaboration to Develop Coffee and Beverage Industry Expertise in Indonesia
              </h3>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', width: '264px' }}>
                <span style={{ 
                  width: '61px', 
                  fontFamily: 'DM Sans', 
                  fontWeight: 400, 
                  fontSize: '24px', 
                  lineHeight: '32px', 
                  color: '#7F7F7F', 
                  margin: 0 
                }}>4 Min</span>
                <div style={{ width: '5px', height: '5px', background: '#7F7F7F', borderRadius: '50%' }}></div>
                <span style={{ 
                  width: '174px', 
                  fontFamily: 'DM Sans', 
                  fontWeight: 400, 
                  fontSize: '24px', 
                  lineHeight: '32px', 
                  color: '#7F7F7F', 
                  margin: 0 
                }}>August 19, 2022</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default LandingPage
