import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './styles.css'

export default function Navbar(){
    const path = window.location.pathname
    return <nav className="nav">
        <Link to="/" className="site-title">Pogimon</Link>
        <ul>
            <CustommLink to="/home">Home</CustommLink>
            <CustommLink to="/pokemon">Pokemon</CustommLink>
            <CustommLink to="/digimon">Digimon</CustommLink>
            <CustommLink to="/account">Account</CustommLink>
        </ul>
    </nav>
}

// Link method used to redirect
function CustommLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}