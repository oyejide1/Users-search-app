import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Card(props){
  console.log(props);
  return(
    <div className="card-wrp">
      <img src={props.avatar_url}  alt="person' avatar" className="card-img"/>
      <div className="person-details">
        <p className="prsn-name"><em>Name: </em> {  props.name}</p>
        <p className="company-name"><em>Company: </em> {  props.company}</p>
        <p className="company-name"><em>Location: </em> {  props.location}</p>
      </div>
    </div>
  )
}

function CardList(props){
  return(
    <div className="card-list">
      { props.Data.map((profile) => <Card key={profile.id}{...profile}/>) }
    </div>
  )
}

function SearchBlock(props){
  let [searchInput, setSearchInput] = useState("");
  const userNameInput = React.createRef();
  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(`https://api.github.com/users/${searchInput}`)
    .then(response => {
      if(!response.ok) throw new Error("got a non 2xx response from server");
      return response.json(); 
    })
    .then( (userObj) => {props.processData(userObj)} );
    setSearchInput(searchInput = "");
  }

  return(
    <form name="search-form" className="search-blck-wrp" onSubmit={handleSubmit}>
      <input 
        type="text" 
        ref={userNameInput}
        value = {searchInput}
        placeholder = "GitHub Username" 
        onChange = {ev => setSearchInput(searchInput = ev.target.value)} 
        required
      />
      <input type="submit" value="Search"/>
      <button className="refresh-btn" onClick={props.refresh}>Refresh</button>
    </form>
  )
}

function App() {
  let [data, setData] = useState([]);
  let processData = (userdata) => {
    setData( () => {
      return data = [...data, userdata]} 
    );
  }
  let refresh = () => {
    setData( () => data = [] )
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>The GitHub Cards App</div>
      </header>
      <SearchBlock processData={processData} refresh={refresh}/>
      <CardList Data={data}/>
    </div>
  )
}

export default App;
