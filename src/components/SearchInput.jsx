function SearchInput({ search, searchCity, setSearchCity }) {
  const citySearch = () => {
    if (searchCity.trim() !== "") {
      search(searchCity.trim());
      setSearchCity("");
    }
  };
  return (
    <div className="flex flex-row flex-wrap items-center p-4 gap-2 rounded-lg  mx-auto">
      <input
        type="text"
        placeholder="Search City"
        onChange={(e) => setSearchCity(e.target.value)}
        value={searchCity}
        className="w-[340px] my-2 py-2 px-4 focus:outline-none border focus:ring-1 focus:ring-yellow-800 rounded-xl"
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
