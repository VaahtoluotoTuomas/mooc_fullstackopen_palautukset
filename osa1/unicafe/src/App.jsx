import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}


const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text='good' value={props.good} />
            <StatisticsLine text='neutral' value={props.neutral} />
            <StatisticsLine text='bad' value={props.bad} />
            <StatisticsLine text='all' value={props.total} />
            <StatisticsLine text='average' value={props.average} />
            <StatisticsLine text='positive' value={`${props.positives} %`} />         
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positives = (good / total) * 100

  const statisticsData = {
    good, neutral, bad, total, average, positives
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={handleGoodClick}
        text = 'good'
      />
      <Button 
        onClick={handleNeutralClick}
        text = 'neutral'
      />
      <Button 
        onClick={handleBadClick}
        text = 'bad'
      />
       <Statistics {...statisticsData} /> 
    </div>
  )
}

export default App
