import React from 'react'
import Config from './components/config'
import Game from './components/game'
import './App.css'
import axios from 'axios'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      numberOfQuestions: 10,
      difficulty: 'easy'
    }
    this.setCategory = this.setCategory.bind(this)
    this.setNumberOfQuestions = this.setNumberOfQuestions.bind(this)
    this.setDifficulty = this.setDifficulty.bind(this)
  }

  componentDidMount () {
    axios.get('https://opentdb.com/api_token.php?command=request').then(response => {
      this.setState({
        token: response.data.token
      })
    })
  }

  setCategory (id) {
    this.setState({
      category: id
    })
  }

  setNumberOfQuestions (num) {
    this.setState({
      numberOfQuestions: num
    })
  }

  setDifficulty (difficulty) {
    this.setState({
      difficulty: difficulty
    })
  }

  render () {
    return (
      <div className='App' style={{ marginBottom: 40 }}>
        <h1 style={{ paddingLeft: 40 }}>React Trivia</h1>
        {this.state.category ? <Game category={this.state.category} setCategory={this.setCategory} difficulty={this.state.difficulty} numberOfQuestions={this.state.numberOfQuestions} token={this.state.token} /> : <Config setCategory={this.setCategory} setNumberOfQuestions={this.setNumberOfQuestions} setDifficulty={this.setDifficulty} numberOfQuestions={this.state.numberOfQuestions} difficulty={this.state.difficulty} />}
      </div>
    )
  }
}

export default App
