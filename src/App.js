import React from 'react'
import Content from './Content' 
import { useState, useEffect, useRef } from "react";
import JSONdata from './data.json'

function App() {

  const [collections, setCollections] = useState([]);
  
const url = "https://65cec9b3bdb50d5e5f59f964.mockapi.io/travel/photo"

  useEffect(()=>{
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>{
      setCollections(json);
      console.log(json);
    })
    .catch((err)=>{
      console.log(err);
      alert('Error');
    });
  },[])
  

  return (
    <div className="App">
      <h1>My Photo Collection</h1>

      <div className="top">

        <ul className="tags">
          <li className="active">All</li>
          <li>Nature</li>
          <li>Cities</li>
          <li>Wildlife</li>
          <li>Traveling</li>
        </ul>

        <input className="search-input" placeholder="Search by name"/>        
      </div>
      

      <div className="content">

          {collections.map((obj, index)=>(
            <Content 
            key={index}
            name={obj.name}
            images={obj.photos}
            />
          ))} 

      </div>

      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
