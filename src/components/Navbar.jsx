import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="navbar">
            <header>
                <nav>
                    <h2>Realworld Blog</h2>
                    <Link to='/'>Home</Link>
                    <Link to='sign-in'>Sign In</Link>
                    <Link to='sign-up'>Sign Up</Link>
                </nav>
            </header>
        </div>
    )
}