
import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Search () {
  let [searchState,setSearchState]=React.useState({
    searchType:null,
  })
  
  console.log(searchState.searchType)
  return (
    <div className="search-container">
      <Form>
        <Form.Check 
          type="radio"
          id="default-radio"
          label="Random"
          name="searchRandomBool"
          onClick={(prevState)=>setSearchState({...prevState,searchType:'random'})}
          inline
        />
        <Form.Check 
          type="radio"
          id="default-radio"
          label="Name"
          name="searchRandomBool"
          onClick={(prevState)=>setSearchState({...prevState,searchType:'name'})}
          inline
        />
        <Form.Check 
          type="radio"
          id="default-radio"
          label="Alcohol"
          name="searchRandomBool"
          onClick={(prevState)=>setSearchState({...prevState,searchType:'alcohol'})}
          inline
        />
        <Form.Check 
          type="radio"
          id="default-radio"
          label="Category"
          name="searchRandomBool"
          onClick={(prevState)=>setSearchState({...prevState,searchType:'category'})}
          inline
        />
        <Form.Check 
          type="radio"
          id="default-radio"
          label="Glass"
          name="searchRandomBool"
          onClick={(prevState)=>setSearchState({...prevState,searchType:'glass'})}
          inline
        />
      </Form>
    </div>
  )
}