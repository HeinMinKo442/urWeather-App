function SearchHistory({ storedHistory, search, clearHistory }) {
  return (
    <div>
      {storedHistory.length > 0 ? (
        <div className="flex flex-col items-center justify-center">
          {storedHistory.map((city, index) => (
            <button
              key={index}
              className="cursor-pointer text-gray-800 font-medium"
              onClick={() => search(city)}
            >
              {city}
            </button>
          ))}
          <p
            className="text-center underline underline-offset-1 text-red-900 font-light cursor-pointer"
            onClick={() => clearHistory()}
          >
            clear history
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-gray-700">There is no search History</h1>
        </div>
      )}
    </div>
  );
}
export default SearchHistory;
