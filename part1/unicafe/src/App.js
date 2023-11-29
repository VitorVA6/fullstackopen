import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const clickGood = () => {
    const updated_good = good+1
    setGood(updated_good)
    const totalUpdated = neutral+bad+updated_good
    setTotal(totalUpdated)
    setAverage((bad*-1 + updated_good)/totalUpdated)
    setPositive((updated_good/totalUpdated)*100)
  }

  const clickNeutral = () => {
    const updated_neutral = neutral+1
    setNeutral(updated_neutral)
    const totalUpdated = updated_neutral+bad+good
    setTotal(totalUpdated)
    setAverage((bad*-1 + good)/totalUpdated)
    setPositive((good/totalUpdated)*100)
  }

  const clickBad = () => {
    const updated_bad = bad+1
    setBad(updated_bad)
    const totalUpdated = neutral+updated_bad+good
    setTotal(totalUpdated)
    setAverage((updated_bad*-1 + good)/totalUpdated)
    setPositive((good/totalUpdated)*100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button title={'good'} handleClick={clickGood}/>
      <Button title={'neutral'} handleClick={clickNeutral}/>
      <Button title={'bad'} handleClick={clickBad}/>
      <h1>statistics</h1>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
        total={total}
        average={average}
        positive={`${positive} %`}
      />
    </div>
  )
}

export default App