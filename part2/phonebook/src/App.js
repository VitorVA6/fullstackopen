import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  useEffect(() => {
    personsService.getAll().then(data => setPersons(data))
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('sucess')

  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const personsToShow = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().startsWith(filter)) : persons

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameExists = persons.find(el => el.name === newName)
    if(!nameExists){
      const newPerson = {name: newName, number: newNumber}
      personsService
        .create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessageType('sucess')
        setMessage(`Added ${returnedPerson.name}`)
      })
    }
    else{
      if(window.confirm(`${nameExists.name} is already added to phonebook, replace the old number with a new one?`) === true ){
        const changedPerson = {...nameExists, number: newNumber}
        personsService
        .update(nameExists.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setMessageType('sucess')
          setMessage(`Updated ${returnedPerson.name}`)
        })
      }
    }
    setTimeout(() => setMessage(null), 5000)
  }

  const handleDelete = (id) => {
    const personDelete = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personDelete.name} ?`) === true ){
      personsService.remove(id)
        .then(data => {
          setMessageType('sucess')
          setMessage(`Deleted ${personDelete.name}`)
          setPersons(persons.filter(person => person.id !==id))
        })
        .catch(err => {
          setMessage(`Information of ${personDelete.name} has already been removed from server`)
          setMessageType('error')
          setPersons(persons.filter(person => person.id !==id))
        })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} 
        handleName={handleName} 
        newNumber={newNumber}
        handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App