import React, { Component } from 'react';
import axios from 'axios';

export default class PlanetDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planetDetail: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get(`https://swapi.dev/api/planets/${id}`)
            .then((res) => {
                const planetDetail = res.data;
                this.setState({
                    planetDetail
                });
                console.log(planetDetail)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { planetDetail } = this.state;
        return (
            <div className="planetDetail">
                <div className="container">
                    <div className="planetDetail__header">
                        <div className="common">
                            <h1 className="mainHeader">P L A N E T &nbsp;&nbsp; D E T A I L S</h1>
                            <div className="commonBorder"></div>
                        </div>
                        <div className="row">
                            <div className="planetDetail__box">
                                <div className="planetDetail__box-header">
                                    {planetDetail.name}
                                </div>
                                <div className="planetDetail__info">
                                    <div className="row">
                                        <div className="col-4">
                                            <strong>Climate:</strong>
                                            <p>{planetDetail.climate}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Diameter:</strong>
                                            <p>{planetDetail.diameter}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Gravity:</strong>
                                            <p>{planetDetail.gravity}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Orbital period:</strong>
                                            <p>{planetDetail.orbital_period}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Population:</strong>
                                            <p>{planetDetail.population}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Rotation period:</strong>
                                            <p>{planetDetail.rotation_period}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Surface water:</strong>
                                            <p>{planetDetail.surface_water}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>Terrain:</strong>
                                            <p>{planetDetail.terrain}</p>
                                        </div>
                                        <div className="col-4">
                                            <strong>URL:</strong>
                                            <p>{planetDetail.url}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
