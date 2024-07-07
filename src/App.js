// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_TOKEN = "12345";

function App() {
  const [file, setFile] = useState(null);
  const [filterOptns, setFilterOptns] = useState([]);
  const [filters, setFilters] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
    const response = await axios.post('http://localhost:8000/upload_csv/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${API_TOKEN}`
      },
    });
    setFilterOptns(response.data.headers);
    alert('File uploaded successfully');
  }catch(error){
    alert('Error uploading file: ' + error.message);
  }
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { column: selectedOption, comparison: '', value: '' }]);
  };

  const queryData = async () => {
    try{
    const response = await axios.get('http://localhost:8000/query/', {
      headers: {
        'Authorization': `${API_TOKEN}`
      },
      params: filters.reduce((acc, filter) => {
        const key = `${filter.column}${filter.comparison}`;
        acc[key] = filter.value;
        return acc;
      }, {}),
    });
    setResults(response.data.results);
  }catch(error){
    alert('Error querying data: ' + error.message);
  }
  };

  return (
    <div className="App">
      <h1>Upload CSV and Query Data</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Query Data</h2>
      <h4>Filters</h4>
      {filters.map((filter, index) => (
        <div key={index} className="filter-row">
          <select
            value={filter.column}
            onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
          >
            <option value="">Select an option...</option>
            {filterOptns
              .filter((option) => !option.includes('Unnamed'))
              .map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            value={filter.comparison}
            onChange={(e) => handleFilterChange(index, 'comparison', e.target.value)}
          >
            <option value="">Select comparison...</option>
            <option value="__gt">Greater than</option>
            <option value="__lt">Less than</option>
            <option value="__gte">Greater than or equal to</option>
            <option value="__lte">Less than or equal to</option>
            <option value="__max">Maximum</option>
            <option value="__min">Minimum</option>
            <option value="__eq">Equal</option>
            <option value="__sum">Total</option>
          </select>
          <input
            type="text"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addFilter}>Add Filter</button>
      <button onClick={queryData}>Query</button>

      <h2>Results</h2>
      {results.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {filterOptns.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
