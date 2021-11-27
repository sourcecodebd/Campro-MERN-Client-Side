import React from 'react';
import './Search.css';
import { useState, useEffect } from 'react';
import SearchResult from './SearchResult/SearchResult';
import { TypoLarge } from '../../StyledComponents/Typo';
import NavBar from '../../Shared/Header/NavBar/NavBar';

const Search = () => {
    const [search, setSearch] = useState([]);
    const [cameras, setCameras] = useState([]);
    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/cameras/explore`)
            .then(res => res.json())
            .then(data => {
                setCameras(data);
            });
    }, []);
    const handleSearch = e => {
        const searchText = e.target.value;
        const foundCameras = cameras.filter(cam => cam.camera.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        if (searchText) {
            setSearch(foundCameras);
        }
        else {
            setSearch([]);
        }
    }

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), URL('./campro_products/Canon-EOS-200D-mark-II-DSLR-Camera.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    }

    return (
        <div>
            <NavBar />
            <div className="search" style={backgroundStyle}>

                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <TypoLarge>Search Camera</TypoLarge>
                        <p className="lines mt-2 mb-5"></p>
                    </div>
                </div>
                {
                    search.length ?
                        <div className="m-3">
                            <div className="bg-dark col-md-3 mx-auto p-3 text-white my-3">
                                Result Found: {search?.length}
                            </div>
                        </div>
                        :
                        ""
                }
                <div className="search-section">
                    <input onChange={handleSearch} type="text" className="search-bar p-3" placeholder="Search Item" /><button className="search-btn p-3"><i className="search-logo fas fa-search fa-2x"></i></button>
                </div>
                <div className="m-3">
                    <div className="col-md-4 mx-auto">
                        {
                            search.map(s => <SearchResult result={s} key={s.id} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;