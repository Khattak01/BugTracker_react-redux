import React from 'react'
import './App.css'
// import { Counter } from '../components/counter/Counter'
import Bugs from '../components/bugs/Bugs'

const App = () => {
    return (
        <div className="app container">
            <h1>Bugs Tracker <span style={{fontWeight:'lighter'}}> made with </span> &#10084;</h1>
            {/* <Counter /> */}
            <Bugs />
        </div>
    )
}

export default App
