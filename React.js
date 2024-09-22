import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-url/bfhl', parsedJson);
      setResponse(res.data);
    } catch (err) {
      console.error("Invalid JSON or API Error");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes("Alphabets") && <div>Alphabets: {response.alphabets.join(", ")}</div>}
        {selectedOptions.includes("Numbers") && <div>Numbers: {response.numbers.join(", ")}</div>}
        {selectedOptions.includes("Highest lowercase alphabet") && <div>Highest Lowercase: {response.highest_lowercase_alphabet}</div>}
      </div>
    );
  };

  return (
    <div>
      <h1>{response?.roll_number || "Web Application"}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON"
        />
        <button type="submit">Submit</button>
      </form>
      <select multiple={true} onChange={handleOptionChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
