import React, { useState, useEffect } from 'react'
import  './App.css'
import api from './services/api'
import Header from './components/Header'

function App() {
    const [projetos, setProjetos] = useState([])

    useEffect( () => {
        api.get('/projects').then(response => setProjetos(response.data))
    }, [])

    async function handleAddProject() {
        //projetos.push(`Novo Projeto ${Date.now()}`)
        //setProjetos([...projetos, `Novo projeto ${Date.now()}`])
        //console.log(projetos)
        const response = await api.post('/projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Thiago Teixeira"
        })
        const projeto = response.data
        setProjetos([...projetos, projeto])
    }
    return (
        <>
          <Header title='Sistema de Informação' />
           <ul>
               {projetos.map(projeto => <li key={projeto.id}>{projeto.title}</li>)}
           </ul>
           <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    )
}

export default App
