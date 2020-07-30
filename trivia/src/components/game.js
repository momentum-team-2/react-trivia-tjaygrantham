import React from 'react'
import axios from 'axios'
import Question from './question'
import styled from 'tachyons-components'

const Button = styled('button')`
  f6 f5-ns fw6 dib ba
  b--black-20 bg-dark-blue white
  no-underline br3
`

class Game extends React.Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      hasSubmitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.setSelectedAnswer = this.setSelectedAnswer.bind(this)
  }

  componentDidMount () {
    this.setState({
      answers: new Array(this.props.numberOfQuestions)
    })
    if (this.state.questions.length === 0) {
      axios.get(`https://opentdb.com/api.php?amount=${this.props.numberOfQuestions}&category=${this.props.category}&difficulty=${this.props.difficulty}&token=${this.props.token}`).then(response => {
        const questions = response.data.results
        const comps = []
        for (const idx in questions) {
          const question = questions[idx]
          comps.push(<Question key={idx} index={idx} question={question} setSelectedAnswer={this.setSelectedAnswer} />)
        }
        this.setState({
          questions: comps
        })
      })
    }
  }

  setSelectedAnswer (idx, answer) {
    this.state.answers[idx] = answer
  }

  handleReset () {
    this.props.setCategory(undefined)
  }

  handleSubmit (event) {
    this.setState({
      hasSubmitted: true
    })
  }

  render () {
    if (this.state.hasSubmitted) {
      let correct = 0
      for (let i = 0; i < this.props.numberOfQuestions; i++) {
        const question = this.state.questions[i].props.question
        const answer = this.state.answers[i]
        if (answer === question.correct_answer) {
          correct++
        }
      }
      return (
        <div className='Game' style={{ marginLeft: 40 }}>
          <p>You got {correct}/{this.props.numberOfQuestions}</p>
          <Button onClick={this.handleReset}>Play Again</Button>
        </div>
      )
    } else {
      return (
        <div className='Game'>
          <ol>
            {this.state.questions.map((question, idx) => {
              return question
            })}
          </ol>
          <Button type='submit' style={{ marginLeft: 40 }} onClick={this.handleSubmit}>Submit</Button>
        </div>
      )
    }
  }
}

export default Game
