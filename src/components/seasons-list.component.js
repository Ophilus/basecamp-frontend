import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const SeriesInfo = props => ( 
    <div className="info">
        <h1 className='title'>{ props.series.title }</h1>
        <div>
            <img className='smallPoster' alt="poster" src={ props.series.posterImage.medium } />
            <div className='genre'><span>Genre: </span>{ props.series.subtitle.join(', ') }</div>
            <div className='dateofstart'><span>Date of start: </span>{ props.series.dateOfStart }</div>
            <div className='description'><span>Description: </span>{ props.series.longDescription }</div>
            <div className='rating'><span>Rating: </span><StarRatings rating={props.series.usersRating} starRatedColor="yellow" 
             numberOfStars={10} name='rating' starSpacing="1px" starDimension="25px" />
            </div>
        </div>
        <iframe  title="videoplayer" className='video' src={props.series.videoFragmentUrl} 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
   )

const Seasons = props => ( 
        <div className="card">
            <div className="face face1">
                <div className="content">
                    <div><img src={ props.seasons.featuredImage } alt="logo"/></div>
                    <h3> { props.seasons.name }</h3>
                </div>
            </div>
            <div className="face face2">
                <div className="content">
                    <p>{ props.seasons.shortDescription }</p>
                    <Link to={"/"+ props.seasons.relatedShow + "/"+props.seasons.relatedSeason}>Read More</Link>
                </div>
            </div>
        </div>
   )

export default class SeasonsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            seasons:[],
            series:[]
         };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/series/' + this.props.match.params.relatedShow)
            .then(response => {
                this.setState({ series: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get('http://localhost:5000/seasons/' + this.props.match.params.relatedShow)
            .then(response => {
                this.setState({ seasons: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    seriesInfo() {
        return this.state.series.map(currentseries => {
            return <SeriesInfo series = { currentseries }
            key = { currentseries._id }
            />;
        })
    }

    seasonsList() {
        return this.state.seasons.map(currentseasons => {
            return <Seasons seasons = { currentseasons }
            key = { currentseasons._id }
            />;
        })
    }

    render() {
        return ( <div className="container">
            <div>{this.seriesInfo()}</div>
            <div className="list">{this.seasonsList()}</div>
            </div>
        )
    }
}