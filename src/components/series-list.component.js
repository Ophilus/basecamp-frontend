import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Slide } from 'react-slideshow-image';

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  }

const Poster = props => (
            <div className="each-slide">
            <div style={{'backgroundImage': `url(${props.series.posterImage.large})`}}>
              <span>{ props.series.title }</span>
            </div>
          </div>
)

const Series = props => (
    
        <div className="card">
            <div className="face face1">
                <div className="content">
                    
                    <img src={ props.series.posterImage.small } alt="logo"/>
                    <h3> { props.series.title }</h3>
                    <h4>{ props.series.subtitle.map( elem => <span key={elem.toString()}>{ elem }</span>) }</h4>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p>{ props.series.shortDescription }</p>
                    <Link to={"/"+props.series.relatedShow}>Read More</Link>
                </div>
            </div>
        </div>

)
export default class SeriesList extends Component {
    constructor(props) {
        super(props);
        this.state = { series: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/series/')
            .then(response => {
                this.setState({ series: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    Poster() {
        return this.state.series.map(currentseries => {
            return <Poster series = { currentseries }
            key = { currentseries._id }
            />;
        })
    }

    seriesList() {
        return this.state.series.map(currentseries => {
            return <Series series = { currentseries }
            key = { currentseries._id }
            />;
        })
    }

    render() {
        return ( <div className="container">
            <div className="slide-container">
                <Slide {...properties}>{this.Poster()}</Slide>
            </div>
            <div className="list">{this.seriesList()}</div>
            </div>
        )
    }
}