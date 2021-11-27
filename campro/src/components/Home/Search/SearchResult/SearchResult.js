import React from 'react';

const SearchResult = ({ result }) => {
    const { camera } = result || {}
    return (
        <div className="bg-white shadow-sm rounded my-3">
            <p className="d-flex justify-content-center align-items-center p-2">{camera}</p>
        </div>
    );
};

export default SearchResult;