import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationState, setNotificationState] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = event => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    const changedPerson = { ...person, number: newNumber}

    if (persons.some(person => person.name === newName)) {
      const proceed = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (proceed === true)
        personService
          .update(changedPerson.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
              setNotificationState(true)
              setNewName('')
              setNewNumber('')
              setNotification(`Updated ${returnedPerson.name}`)
              setTimeout(() => {
                setNotification(null)
              }, 3000)
          })
            .catch(error => {
              console.log(error)
              setNotificationState(false)
              setNotification(`Information of ${changedPerson.name} has already been removed from server`)
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
                setNotification(null)
              }, 3000)
              setPersons(persons.filter(p => p.id !== changedPerson.id))
            })
    }
    else {
      const id = `${persons.length + 1}`
      const personObject = {
          name: newName,
          number: newNumber,
          id: id
      }
      console.log(`new persons id is ${id}`)

      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationState(true)
            setNotification(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
        })
    }
  }

  const deletePerson = (id, name) => {
    if (confirm(`Delete ${name} ?`) === true)
    {
      personService
        .deleteService(id)
      setPersons(persons.filter((p) => p.id != id))
      setNotificationState(true)
      setNotification(`Deleted ${name}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }



  const personsToShow = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return(
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} notificationState={notificationState}/>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm  addPerson={addPerson} newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
         />
      <h2 className='number'>Numbers</h2>
        {personsToShow.map(person =>
          <Person 
            key={person.id} 
            person={person} 
            deletePerson={() => deletePerson(person.id, person.name)} />
        )}
        <Footer />
    </div>
  )
}

export default App