import { Link } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth';

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header>
      <h1>Sample Apps</h1>
      <nav>
        <ul>
          <li><Link to={'/'}>Top</Link></li>
          <li><Link to={'/weather/'}>Weather</Link></li>
          <li><Link to={'/dev/'}>Dev</Link></li>
          { user ? <p>{user.email}</p> : 
            <>
              <li><Link to="/signin/">Sign in</Link></li>
              <li><Link to="/signup/">Sign up</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header;
