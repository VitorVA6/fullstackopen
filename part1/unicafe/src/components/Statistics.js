import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if(good>0 || neutral>0 || bad>0){
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good}/>
            <StatisticLine text={'neutral'} value={neutral}/>
            <StatisticLine text={'bad'} value={bad}/>
            <StatisticLine text={'all'} value={total}/>
            <StatisticLine text={'average'} value={average}/>
            <StatisticLine text={'positive'} value={positive}/>
          </tbody>
        </table>
      </>
    )
  }else {
    return (
      <p>No feedback given</p>
    )
  }
  
}

export default Statistics