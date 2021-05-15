import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

// component is just a function that returns jsx
function Main(props){

    const [people, setPeople] = useState(null)

    const URL = "https://people-api-backend-emc.herokuapp.com/people/"

    const getPeople = async () => {
        const response = await fetch(URL); 
        const data = await response.json();
        setPeople(data);
    }

    const createPeople = async (person) => {
        await fetch(URL, {
            method: "post",
            headers: {
                //the content type does not change - you will use this over and over again
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        })
        //since we already made a get people function to update the list of people, we can just use that again
        getPeople()
    }

    const updatePeople = async (person, id) => {
        //make the put request to update a person (have to add the id to the above url that we used because it just sends in person, not in ID)
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person)
        })
        //updates the list of people
        getPeople()
    }

    const deletePeople = async (id) => {
        //make delete request to delete a person
        await fetch(URL + id, {
            //don't need any extra info like above (like json header because it's JUST to delete)
            method: "delete"
        })
        //update list of people (so it gets the new list with people removed)
        getPeople()
    }


    useEffect(() => {
        getPeople()
    }, [])

    return <main>
        {/* only one route inside of a switch can be active at any point (that's what the swithc does) */}
        <Switch>
            <Route exact path="/">
                <Index people={people} createPeople={createPeople}/>
            </Route>
            {/* an id in the below route is a param which can be anything (like cheese) */}
            {/* you have to update the route and add the props in (people, update people and delete people) */}
            <Route path="/people/:id" 
            render={(rp) => <Show
                people={people}
                updatePeople={updatePeople}
                deletePeople={deletePeople}
                {...rp}
                />}
            />
        </Switch>
    </main>
  } 
  
  export default Main