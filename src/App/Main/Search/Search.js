import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from '../../../Data/UniqueArrays.js';



export default function Search() {
  let [searchState, setSearchState] = React.useState({
    searchType: {
      name: false,
      category: false,
      ingredient: false,
      glass: false,
      random: false,
      clear: false,
    },
  });

  const handlerSearchType = (e) => {
    e.persist();
    // console.log(e.target.value);
    switch (e.target.value){

      case 'name': return setSearchState(prevState=>({...prevState,searchType:{name: true,category: false,ingredient: false,glass: false,random: false,clear: false}}));

      case 'ingredient': return setSearchState(prevState=>({...prevState,searchType:{...prevState.searchType,ingredient:!prevState.searchType['ingredient'],name:false,category:false,random:false,clear:false}}));

      case 'glass': return setSearchState(prevState=>({...prevState,searchType:{...prevState.searchType,glass:!prevState.searchType['glass'],name:false,category:false,random:false,clear:false}}));

      case 'category': return setSearchState(prevState=>({...prevState,searchType:{name: false,category: true,ingredient: false,glass: false,random: false,clear: false}}));

      case 'random': return setSearchState(prevState=>({...prevState,searchType:{name: false,category: false,ingredient: false,glass: false,random: true,clear: false}}));

      case 'clear': return setSearchState(prevState=>({...prevState,searchType:{name: false,category: false,ingredient: false,glass: false,random: false,clear: true}}));

      default: return;
    }
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   alert(`${kindOfStand}`);
  // };

  // console.log(uniqueObject.uniqueGlasses);

  return (
    <div className="search-container">
      <p>Search advise: Start with one criteria. If no results, check spelling and unselect one or more criteria.</p>
      <Form>
        {Object.entries(searchState.searchType).map((pair, idx) => {
          return (
            <Form.Check
              key={idx}
              type="radio"
              id="default-radio"
              label={`${pair[0]}`}
              onChange={handlerSearchType}
              value={`${pair[0]}`}
              checked={pair[1]}
              inline
            />
          );
        })}

        {searchState.searchType['name'] && 
                <Form.Control
                  type="text"
                  id="name"
                  aria-describedby="name"
                  placeholder="What is it's name?"
                />}

        {searchState.searchType['category'] &&
            <Form.Select aria-label="Default select example">
              <option>What category is it in?</option>
              {uniqueObject.uniqueCategories.map((item,idx)=>{
                return(<option key={idx} value={item.searchValue}>{item.displayValue}</option>)
              })}
            </Form.Select>
        }

        {searchState.searchType['ingredient'] &&
            <Form.Select aria-label="Default select example">
              <option>What is one ingredient it will contain?</option>
              {uniqueObject.uniqueIngredients.map((item,idx)=>{
                return(<option key={idx} value={item.searchValue}>{item.displayValue}</option>)
              })}
            </Form.Select>
        }

        {searchState.searchType['glass'] &&
            <Form.Select aria-label="Default select example">
              <option>What glass will it be served in?</option>
              {uniqueObject.uniqueGlasses.map((item,idx)=>{
                return(<option key={idx} value={item.searchValue}>{item.displayValue}</option>)
              })}
            </Form.Select>
        }

        {searchState.searchType['random'] &&
            <Form.Select aria-label="Default select example">
              <option>How many random cocktails?</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </Form.Select>
        }

      </Form>
    </div>
  );
}
