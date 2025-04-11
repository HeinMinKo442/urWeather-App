function ToggleFandC({ unit, setUnit }) {
    return (
      <div className="border border-white rounded-md px-2 py-1 bg-white bg-opacity-20 text-sm text-black">
        <label htmlFor="TempType" className="mr-1">
          Unit:
        </label>
        <select
          name="TempType"
          id="TempType"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="bg-white text-gray-800 rounded px-1 py-0.5 focus:outline-none"
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
      </div>
    );
  }
  
  export default ToggleFandC;
  
