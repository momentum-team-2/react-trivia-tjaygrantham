import React from 'react'
import he from 'he'
import shuffle from 'shuffle-array'

class Question extends React.Component {
  constructor (props) {
    super(props)
    const possibleAnswers = []
    possibleAnswers.push(he.decode(props.question.correct_answer))
    for (const answer of props.question.incorrect_answers) {
      possibleAnswers.push(he.decode(answer))
    }
    shuffle(possibleAnswers)
    this.state = {
      possibleAnswers: possibleAnswers
    }
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this)
  }

  handleSelectAnswer (event) {
    this.props.setSelectedAnswer(this.props.index, event.target.value)
  }

  render () {
    return (
      <li>
        <p style={this.props.hasSubmitted ? this.state.selectedAnswer === this.props.question.correct_answer ? { color: 'green' } : { color: 'red' } : { color: 'black' }}>{he.decode(this.props.question.question)}</p>
        {
          this.props.question.type === 'boolean' &&
            <select onChange={this.handleSelectAnswer}>
              <option />
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
        }
        {
          this.props.question.type === 'multiple' &&
            <select onChange={this.handleSelectAnswer}>
              <option />
              {this.state.possibleAnswers.map((answer, idx) => {
                return (
                  <option key={idx} value={answer}>{answer}</option>
                )
              })}
            </select>
        }
      </li>
    )
  }
}

export default Question
