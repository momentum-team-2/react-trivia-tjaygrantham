import React from 'react'
import axios from 'axios'
import styled from 'tachyons-components'

const Button = styled('button')`
  f6 f5-ns fw6 dib ba
  b--black-20 bg-dark-blue white
  no-underline br3
`

class Config extends React.Component {
  constructor () {
    super()
    this.state = {
      categories: []
    }
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
    this.handleNumberOfQuestionsChange = this.handleNumberOfQuestionsChange.bind(this)
    this.handleDifficultySelect = this.handleDifficultySelect.bind(this)
  }

  componentDidMount () {
    axios.get('https://opentdb.com/api_category.php').then(response => {
      this.setState({
        categories: response.data.trivia_categories
      })
    })
  }

  handleCategorySelect (event) {
    this.props.setCategory(event.target.id)
  }

  handleDifficultySelect (event) {
    this.props.setDifficulty(event.target.value)
  }

  handleNumberOfQuestionsChange (event) {
    const num = event.target.value
    if (num > 0 && num <= 20) {
      this.props.setNumberOfQuestions(event.target.value)
    }
  }

  render () {
    return (
      <div className='Config'>
        <div className='Settings' style={{ marginLeft: 40 }}>
          <span>Number of Questions: </span><input type='number' name='numberOfQuestions' value={this.props.numberOfQuestions} onChange={this.handleNumberOfQuestionsChange} />
          <p />
          <span>Difficulty: </span>
          <select name='difficulty' value={this.props.difficulty} onChange={this.handleDifficultySelect}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <h4 style={{ marginLeft: 40 }}>Choose a Category</h4>
        <ul>
          {this.state.categories.map((category, idx) => {
            return (
              <li key={category.id} style={{ marginTop: 10 }}>
                <Button id={category.id} onClick={this.handleCategorySelect}>{category.name}</Button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Config
