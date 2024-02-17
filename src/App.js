import React from 'react'
import Content from './Content' 
import { useState, useEffect, useRef } from "react";

const categories = [
  {"name":"All"},
  {"name":"Nature"},
  {"name":"Cities"},
  {"name":"Wildlife"},
  {"name":"Traveling"}
]

function App() {
  const [categoryID, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
const url = "https://65cec9b3bdb50d5e5f59f964.mockapi.io/travel/photo"

  useEffect(()=>{
    setIsLoading(true);
    fetch(`https://65cec9b3bdb50d5e5f59f964.mockapi.io/travel/photo?${categoryID ? `category=${categoryID}`: ''}`)
    .then((res)=>res.json())
    .then((json)=>{
      setCollections(json);
      console.log(json);
    })
    .catch((err)=>{
      console.log(err);
      alert('Error');
    }).finally(()=>setIsLoading(false));
  },[categoryID])
  

  return (
    <div className="App">
      <h1>My Photo Collection</h1>

      <div className="top">

        <ul className="tags">
          {
            categories.map((obj, i) => (
              <li key={obj.name}
               className={categoryID === i ? 'active' : ''}
               onClick={()=>setCategoryId(i)}
              >
                {obj.name}
              </li>
            ))
          }
        </ul>

        <input 
          value={searchValue}
          onChange={e=>setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Search by name"
        />

      </div>
      

      <div className="content">

          { isLoading ? (
            <h3>Loading...</h3>
          ) : (
            collections
            .filter((obj)=> obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index)=>(
              <Content 
              key={index}
              name={obj.name}
              images={obj.photos}
              />
            ))
          )          
            } 

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
