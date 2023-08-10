import React from "react";
import Form from "react-bootstrap/Form";

export default function Search() {
  let [searchState, setSearchState] = React.useState({
    searchType: {
      random: false,
      name: false,
      alcohol: false,
      glass: false,
      clear: false,
    },
  });

  const handlerSearchType = (e) => {
    e.persist();
    // console.log(e.target.value);
    switch (e.target.value){
      case 'random': return setSearchState(prevState=>({...prevState,searchType:{random: true, name: false,alcohol: false,glass: false,clear: false,}}));
      case 'name': return setSearchState(prevState=>({...prevState,searchType:{...prevState.searchType,name:!prevState.searchType['name'],clear:false,random:false}}));
      case 'alcohol': return setSearchState(prevState=>({...prevState,searchType:{...prevState.searchType,alcohol:!prevState.searchType['alcohol'],clear:false,random:false}}));
      case 'glass': return setSearchState(prevState=>({...prevState,searchType:{...prevState.searchType,glass:!prevState.searchType['glass'],clear:false,random:false}}));
      case 'clear': return setSearchState(prevState=>({...prevState,searchType:{random: false, name: false,alcohol: false,glass: false,clear: true,}}));
      default: return;
    }
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   alert(`${kindOfStand}`);
  // };

  // console.log(searchState.searchType)

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

        {searchState.searchType['name'] && 
                <Form.Control
                  type="text"
                  id="name"
                  aria-describedby="name"
                  placeholder="What is it's name?"
                />}

        {searchState.searchType['alcohol'] &&
            <Form.Select aria-label="Default select example">
              <option>What type of alcohol?</option>
              <option value="gin">Gin</option>
              <option value="vodka">Vodka</option>
              <option value="whiskey">Whiskey</option>
              <option value="tequila">Tequila</option>
              <option value="rum">Rum</option>
              <option value="brandy">Brandy</option>
              <option value="Non_Alcoholic">Non-Alcoholic</option>
            </Form.Select>
        }

        {searchState.searchType['glass'] &&
            <Form.Select aria-label="Default select example">
              <option>What type of glass?</option>
              <option value="Cocktail_glass">Cocktail Glass</option>
              <option value="Highball_glass">Highball Glass</option>
              <option value="Champagne_flute">Champagne Flute</option>
              <option value="Shot_glass">Shot Glass</option>
              <option value="Pitcher">Pitcher</option>
              <option value="Wine_glass">Wine Glass</option>
              <option value="Hurricane_glass">Hurricane Glass</option>
              <option value="Whiskey_glass">Whiskey Glass</option>
              <option value="Pint_glass">Pint Glass</option>
            </Form.Select>
        }

      </Form>
    </div>
  );
}
