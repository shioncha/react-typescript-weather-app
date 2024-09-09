import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>Sample Apps</h1>
      <nav>
        <ul>
          <li><Link to={'/'}>Top</Link></li>
          <li><Link to={'/weather/'}>Weather</Link></li>
          <li><Link to={'/dev/'}>Dev</Link></li>
          <li><Link to={'/signin/'}>Login</Link></li>
          <li><Link to={'/signup/'}>Register</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
