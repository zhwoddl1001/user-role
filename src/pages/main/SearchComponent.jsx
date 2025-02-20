import React, { useState } from "react";

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="상품 검색..."
                />
                <button type="submit">검색</button>
            </form>
        </div>
    );
};

export default SearchComponent;