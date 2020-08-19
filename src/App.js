import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repos, setRepos] = useState(['JavaScript', 'MongoDB', 'Docker']);

  useEffect(() => {
    api.get('/repositories').then(result => {
      setRepos(result.data.map(repo => repo.title))
    });

  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepos([...repos, response.data.title]);

    console.log(response.data);
  }

  async function handleRemoveRepository(id) {
    alert(id)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => <li key={repo}>{repo}</li>)}

        <button onClick={() => handleRemoveRepository(1)}>
          Remover
          </button>
      </ul>

      <button onClick={handleAddRepository}>
        Adicionar
      </button>

      <br />

      <button onClick={() => {

      }}>Request API</button>
    </div>
  );
}

export default App;
