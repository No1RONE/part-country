import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Country = (props) => {
  const [ctylist, setctyList] = useState([])
  const [loading,setLoading] = useState(true)
  const name = props.per
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`).then(res =>{
      let temp = []
      temp.push(props.per,res.data[0].capital,res.data[0].population,res.data[0].flags.png)
      
      const languages = []
      
      Object.keys(res.data[0].languages).forEach(function (key) {
        var val = res.data[0].languages[key];
        // use val
        languages.push(val)
      });
      
      temp.push(languages)
      setctyList(temp)
      setLoading(!loading)
      console.log(temp);
    })
  },[])

  if(!loading){
    return(
      <div>
        <h1>{ctylist[0]}</h1> 
        <h3>Capital: {ctylist[1]}</h3>
        <h3>population: {ctylist[2]}</h3>
        <h2>Languages</h2>
        <ul>{ctylist[4].map(x =><li key={x}>{x}</li>)}</ul>
        <img src = {ctylist[3]}/>
      </div>
      
    )
  }else{
    return(
      <><h1>LOADING</h1></>
    )
  }

}

const Filter = (props) => {
  
  const handleSearchChange = (event) =>{
    props.setFilter(event.target.value)
  }

  return(
    <div>Filter shown with: <input value = {props.filter} onChange={handleSearchChange}/></div>
  )
}


const App = () => {
  const [country, setCountry] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      // const cty = response.data.map(res => res.name.common)
      // const cap = response.data.map(cap => cap.capital)
      
      // setCountry(cty,cap)
      const data = response.data.map(res => res.name.common)
       setCountry(data)
      
    })
  },[])
  
  const countryToShow = filter === "" ? country : country.filter(cty => cty.toLowerCase().includes(filter.toLowerCase()) === true)
  return (
    <div>
      <h1>Find Country</h1>
      <Filter filter = {filter} setFilter = {setFilter}/>
      {countryToShow.length >= 10 && filter !== "" ?
       (<h3>Too may countries, specify another filter</h3>) :(countryToShow.map(per => <Country key = {per} per = {per}/>))}
      

    </div>
  )
}

export default App;
