import {useState} from "react"

function Show(props){
  //grab the id from the URL (coming from the router props - it knows to gradb that beceause we grabbed it in our routes)
  const id = props.match.params.id
  //instead of writing props.people all the time - we can put the array in a variable
  const people = props.people
  // find the individual person in people (group of people) so we're holding the individual person we want to show. how do i grab the specific person i'm looking for in the people array (people array is an array of object people)
  //find here will loop over each person in the people array to see if the id matches are true (===)
  const person = people.find((p) => {
    return p._id === id
  })

//state for form
const [editForm, setEditForm] = useState(person)

//handleChange function for form
const handleChange = (event) => {
  setEditForm({
    ...editForm,
    [event.target.name]: event.target.value
  })
}

//handle submit for when form is submitted
const handleSubmit = (event) => {
  //this prevents the refresh
  event.preventDefault()
  //we have that update people function as a prop, so this is us updating the person (passing these two variables so it updates the person)
  props.updatePeople(editForm, person._id)
  //redirection people back to the index page
  props.history.push("/")
}

const removePerson = () => {
  props.deletePeople(person._id)
  //pushing them back to the main page (since person is deleted they don't need to be on the page anymore)
  //the history property in router - everytime you click on a link it's saying you weren't here, here and here - so you're pushing another entry into the history
  props.history.push("/")
}

    return <div className="person">
      <h1>{person.name}</h1>
      <h2>{person.title}</h2>
      <img src={person.image} alt={person.name} />
      <button onClick={removePerson}>Delete</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          //in our edit form state - the edit form state should have a name property - so that's the value of the form
          value={editForm.name}
          //need to give the input a name - it's being binded to the name of the person
          name="name"
          // placeholder makes for a better user experience so it tells what's supposed to be there
          placeholder="name"
          //anytime you change what's inside the input, we're going to trigger the handle change function
          onChange={handleChange}
        />
        {/* and we do this three times - since we have three things assigned to each "person" */}
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    </div>
  } 
  
  export default Show