import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSearchPlus } from "@fortawesome/free-solid-svg-icons";

function SearchRecipes() {
  return (
    <div>
      <div className="flex items-center max-w-md mx-auto bg-white rounded-lg mb-8 " x-data="{ search: '' }">
        <div className="w-full">
          <input
            type="search"
            className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
            placeholder="search"
            x-model="search"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchRecipes;
