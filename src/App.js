import React, { useState, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import axios from 'axios';

const App = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState({});
  const [name, setName] = useState('');
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount(count + 2);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      alert('Please Enter Name');
    } else {
      axios
        .get(`https://api.nationalize.io/?name=${name}`)
        .then((response) => {
          setUsers(response.data);
          //console.log(response.data);
          setFlag(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const columns = [
    { key: 'id', name: '#' },
    { key: 'country_id', name: 'Country ID' },
    { key: 'probability', name: 'Probability' },
  ];

  const rows = [];
  console.log(rows);
  return (
    <div>
      {count}
      <button onClick={handleClick}>click</button>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={name} />
        <button type='submit'>submit</button>
      </form>
      {flag ? (
        users.country.length > 0 ? (
          <>
            {users.country.map((ele, idx) => {
              rows.push({ id: idx + 1, country_id: ele.country_id, probability: ele.probability });
            })}
            <DataGrid columns={columns} rows={rows} />
          </>
        ) : (
          <p style={{ color: 'red' }}>No matching result for name '{users.name}'</p>
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
