import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return ( 
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg" >
                <Link to = "/" className = "navbar-brand" > <img src="https://i.ibb.co/BKT0rvW/popcorn-2.png" alt="Series"/></Link>  
            </nav>
        );
    }
}