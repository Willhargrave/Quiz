import { Link } from "react-router-dom"
import React from 'react';
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/">
                <a className="navbar-brand" href="#">Quiz</a>
                </Link>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/login">
                                <a className="nav-link">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/quiz">
                                <a className="nav-link">Your quiz</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/quizes">
                                <a className="nav-link">All quizes</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Github.com/willhargrave">Github</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default Navbar