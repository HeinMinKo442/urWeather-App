import { useState } from "react";

function SearchInput({ search }) {
  const [searchCity, setSearchCity] = useState("");
  const citySearch = () => {
    setSearchCity("");
    search(searchCity);
  };
  return (
    <div className="flex flex-row items-center p-4 gap-2 rounded-lg w-[400px] mx-auto">
      <input
        type="text"
        placeholder="Search City"
        onChange={(e) => setSearchCity(e.target.value)}
        value={searchCity}
        className="w-full my-2 py-2 px-4 focus:outline-none border focus:ring-1  rounded-xl"
      />
      <button
        className="py-2 px-4 cursor-pointer bg-indigo-300 rounded-xl"
        onClick={citySearch}
      >
        Search
      </button>
    </div>
  );
}
export default SearchInput;
