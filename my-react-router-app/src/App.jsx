import { Outlet, NavLink } from 'react-router';
import './App.css';

export const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Домашня',
  },
  {
    path: '/about',
    element: <About />,
    name: 'Про нас',
  },
  {
    path: '/contact',
    element: <Contact />,
    name: 'Контакти',
  },
];

function Home() {
  return (
    <div className="page">
      <h1>🏠 Домашня сторінка</h1>
      <p>Це домашня сторінка нашого додатку. Ласкаво просимо!</p>
      <p>Використовуйте навігаційне меню вище для переходу між сторінками.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>ℹ️ Про нас</h1>
      <p>Це сторінка про нас.</p>
      <p>Ми створюємо сучасні веб-додатки з використанням React та React Router.</p>
      <p>Наш додаток демонструє можливості клієнтської маршрутизації.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1>📞 Контактна сторінка</h1>
      <p>Це контактна сторінка.</p>
      <p>Ви можете зв'язатися з нами за наступними контактами:</p>
      <ul>
        <li>Email: info@example.com</li>
        <li>Телефон: +380 12 345 67 89</li>
        <li>Адреса: м. Київ, вул. Прикладна, 1</li>
      </ul>
    </div>
  );
}

function Layout() {
  return (
    <div className="app">
      <nav className="navbar">
        <ul className="nav-list">
          {routes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export function createRoutes() {
  return [
    {
      element: <Layout />,
      children: routes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    },
  ];
}

export default Layout;
