import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1a120b', color: '#e9e1d8', padding: '60px 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
        
        {/* Footer Location - Centered */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: 'white' }}>Our Location</h2>
          <p style={{ marginBottom: '10px', fontSize: '16px' }}>Jl. Bangkringan No 19, RT.11/RW.2, Kota Surabaya, 60124</p>
          <p style={{ marginBottom: '10px', fontSize: '16px' }}>Customer Service +6282-2876-6862</p>
          <p style={{ fontSize: '16px' }}>We Are Open from Sun - Mon 10 AM - 22 PM</p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#5a3f2b', margin: '30px 0' }}></div>

        {/* Delivery Order Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'nowrap' }}>
          
          {/* Social Icons - Left */}
          <div style={{ marginRight: 'auto', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="#"><img src="/spotify.png" alt="Spotify" width="24" height="24" style={{ display: 'block' }} /></a>
            <a href="#"><img src="/instagram.png" alt="Instagram" width="24" height="24" style={{ display: 'block' }} /></a>
            <a href="#"><img src="/tiktok.png" alt="TikTok" width="24" height="24" style={{ display: 'block' }} /></a>
            <a href="#"><img src="/youtube.png" alt="YouTube" width="24" height="24" style={{ display: 'block' }} /></a>
            <a href="#"><img src="/twitter.png" alt="Twitter" width="24" height="24" style={{ display: 'block' }} /></a>
            <a href="#"><img src="/telegram.png" alt="Telegram" width="24" height="24" style={{ display: 'block' }} /></a>
          </div>

          {/* Delivery Order Title + Badges - Right */}
          <h3 style={{ fontSize: '24px', marginBottom: '0', marginRight: '15px', whiteSpace: 'nowrap' }}>Delivery Order</h3>
          <div style={{ width: '134px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/download-on-the-app-store-apple-4.png" alt="App Store" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ width: '134px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/google-play-badge-2.png" alt="Google Play" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Copyright - Left */}
          <div style={{ fontSize: '14px', color: '#b7a996', textAlign: 'left' }}>
            © 2023 IMAJI COFFEE, All rights reserved
          </div>

          {/* Links - Right */}
          <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
            <a href="#" style={{ color: '#e9e1d8', textDecoration: 'none', fontSize: '14px' }}>Terms and Conditions</a>
            <span>|</span>
            <a href="#" style={{ color: '#e9e1d8', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
