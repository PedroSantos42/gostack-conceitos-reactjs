import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const objRepos = [{
    id: 123,
    title: 'nodejs-mysql-crud'
  }];

  const [repos, setRepos] = useState(objRepos);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data.map(repo => {
        return {
          id: repo.id,
          title: repo.title
        }
      }))
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: `Desafio da hora: ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    const newRepo = {
      id: response.data.id,
      title: response.data.title
    };

    setRepos([...repos, newRepo]);
  }

  async function handleRemoveRepository(repoId) {
    await api.delete(`repositories/${repoId}`);

    let index = repos.findIndex(repo => repo.id == repoId);
    if (index >= 0) {
      repos.splice(repos.findIndex(repo => repo.id == repoId), 1);
      setRepos([...repos]);
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>
        Adicionar
      </button>

      <ul data-testid="repository-list">
        {repos.map(({ id, title }) => {
          return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
