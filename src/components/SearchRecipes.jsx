import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

function SearchRecipes({ setSearchInput, searchInput }) {
  const searchHandler = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="px-4">
      <div className="flex items-center max-w-md mx-auto bg-white rounded-lg mb-8">
        <div className="w-full">
          <input
            type="search"
            className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
            placeholder="Search"
            value={searchInput}
            onChange={searchHandler}
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center bg-[#749eb2] justify-center w-12 h-12 text-white rounded-r-lg"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchRecipes;
