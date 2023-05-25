import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import icon from '../../assets/img/cube.png'
import defaultThumbnail from '../../assets/img/user.webp'
import burger from '../../assets/img/rubik.webp'
import { AppContext } from '../../context/AppContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AppContext);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        setLinks([
            { label: "Inicio", route: "/", show: true },
            { label: "Encontrar amigos", route: "/search", show: true },
            { label: "Iniciar sesión", route: "/login", show: !user.id ? true : false },
            { label: "Registrarse", route: "/register", show: !user.id ? true : false },
            { label: "Perfil", route: `/profile/${user.id ? user.id : ''}`, show: user.id ? true : false },
        ])
    }, [user])


    return (
        <header className='header'>
            <nav className='header__nav header__desktop'>
                <Link to={'/'} className="header__nav-logo">
                    <img src={icon} alt="Cubo" width={75} height={75} />
                    <h1>Social<span>Cubing</span></h1>
                </Link>
                <ul>
                    {links.map((link, i) => (
                        link.show &&
                        <li key={i}>
                            <Link to={link.route}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav className='header__nav header__mobile'>
                <Link to={'/'} className="header__nav-logo">
                    <img src={icon} alt="Cubo" width={75} height={75} />
                    <h1>Social<span>Cubing</span></h1>
                </Link>
                <button className="burger_button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <img src={burger} alt="Burger" width={40} height={40} />
                </button>
            </nav>
            <div className="collapse nav-mobile" id="navbarToggleExternalContent">
                <ul>
                    {links.map((link, i) => (
                        link.show &&
                        <li key={i}>
                            <Link to={link.route}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>


            {user.id ?
                <div className="dropdown">
                    <button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user.thumbnail ? user.thumbnail : defaultThumbnail} width={30} height={30} />
                        {user.name}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link to={`/profile/${user.id}`}>Perfil</Link></li>
                        <li><p onClick={logout}>Cerrar sesión</p></li>
                    </ul>
                </div>
                :
                <div className='authButtons'>
                    <Link to={'/login'}>Iniciar sesión</Link>
                    <Link to={'/register'}>Registrarse</Link>
                </div>
            }

        </header>
    )
}

export default Header