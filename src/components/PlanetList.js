import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from './Loader';

export default class PlanetList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planets: [],
            planetSearch: [],
            endTarget: 0,
            search: "",
            hasMorePlanets: true,
            page: 1,
            loading: true
        }
    }

    componentDidMount() {
        axios
            .get(`https://swapi.dev/api/planets/`)
            .then((res) => {
                const planets = res.data.results;
                this.setState({ planets });
            })
            .catch((err) => {
                console.log(err);
            })

        axios
            .get(`https://swapi.dev/api/planets/`)
            .then((res) => {
                const endTarget = res.data.count;
                this.setState({ endTarget });
            })
            .catch((err) => {
                console.log(err);
            })

    }

    fetchMoreData = () => {
        const { page, planets, endTarget } = this.state;

        if (planets.length === endTarget) {
            this.setState({ hasMorePlanets: false })
        } else {
            setTimeout(() => {
                axios
                    .get(`https://swapi.dev/api/planets/?page=${page + 1}`)
                    .then((res) => {
                        const planets = res.data.results;
                        this.setState({ planets: this.state.planets.concat(planets), page: this.state.page + 1 });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }, 1000)
        }
    }

    handleSearch = (e) => {
        const { search } = this.state;
        this.setState({ search: e.target.value })
        axios
            .get(`https://swapi.dev/api/planets/?search=${search}`)
            .then((res) => {
                const planets = res.data.results;
                this.setState({ planets });
                console.log(this.state.planets)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getDetail = (url) => {
        const { history } = this.props;
        const splitStr = url.split(`/`);

        const id = splitStr[splitStr.length - 2];
        history.push(`/${id}`)
    }

    render() {
        const { planets, hasMorePlanets, search } = this.state;
        if (search !== "") {
            return (
                <div className="planet">
                    <div className="container">
                        <div className="planet__header">
                            <div className="common">
                                <h1 className="mainHeader">P L A N E T</h1>
                                <div className="commonBorder"></div>
                            </div>
                            <div className="searchContainer">
                                <FaSearch className="searchIcon" />
                                <input className="searchInput" type="text" placeholder="Search..." onChange={this.handleSearch} />
                            </div>
                            <div className="row">
                                {planets && planets.map((pS, index) => (
                                    <div className="col-4" key={index} onClick={() => this.getDetail(pS.url)}>
                                        <div className="planet__box">
                                            <div className="planet__box-header">
                                                {pS.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else {
            return (
                <div className="planet">
                    <div className="container">
                        <div className="planet__header">
                            <div className="common">
                                <h1 className="mainHeader">P L A N E T</h1>
                                <div className="commonBorder"></div>
                            </div>
                            <div className="searchContainer">
                                <FaSearch className="searchIcon" />
                                <input className="searchInput" type="text" placeholder="Search..." onChange={this.handleSearch} />
                            </div>
                            <InfiniteScroll
                                dataLength={planets.length}
                                next={this.fetchMoreData}
                                hasMore={hasMorePlanets}
                                loader={<Loader />}
                            >
                                <div className="row">
                                    {planets && planets.map((planet, index) => (
                                        <div className="col-4" key={index} onClick={() => this.getDetail(planet.url)}>
                                            <div className="planet__box">
                                                <div className="planet__box-header">
                                                    {planet.name}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                </div >
            )
        }
    }
}
