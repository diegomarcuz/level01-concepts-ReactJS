import React, { useState, useEffect } from "react";
import api from './services/api'


import "./styles.css";

function App() {
  const [respositoryNames, setRepositoryName] = useState([])
  const [projectNumber, setProjectNumber] = useState(0)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      const names = []
      response.data.map(respository => {
        names.push(respository.title)
        return false;
      })
      setRepositoryName(names)
      setRepos(response.data)

    })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositório ${projectNumber}`,
      url: 'github.com',
      techs: ['ReactJS', 'NodeJS']
    })
    setRepos([...repos, response.data])
    setProjectNumber(projectNumber + 1)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepos(repos.filter(repo => repo.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
