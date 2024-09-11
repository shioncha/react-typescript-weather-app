import { NavLink } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth';

const Header = () => {
  const { userData } = useContext(AuthContext);
  return (
    <header>
      <h1>Sample Apps</h1>
      <nav>
        <ul>
          <li><NavLink to={'/'}>Top</NavLink></li>
          <li><NavLink to={'/weather/'}>Weather</NavLink></li>
          <li><NavLink to={'/dev/'}>Dev</NavLink></li>
          { userData.name ? <li><NavLink to={'/mypage/'}>{userData.name}</NavLink></li> : 
            <>
              <li><NavLink to="/signin/">Sign in</NavLink></li>
              <li><NavLink to="/signup/">Sign up</NavLink></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header;
