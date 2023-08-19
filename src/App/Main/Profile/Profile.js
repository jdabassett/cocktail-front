import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// import Accordion from "react-bootstrap/Accordion";
// import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function Profile(props) {
  //make a list of unique names from the userCocktails in state
  let uniqueNames= props.userCocktails.reduce((acc,b)=>{acc.push(acc.includes(b['strDrink'])?null:b['strDrink']); return acc;},[]).filter(string => string!==null).sort((a,b)=>a.localeCompare(b));
  
  //make a list of unique glass from the userCocktails in state
  let uniqueGlass= props.userCocktails.reduce((acc,b)=>{acc.push(acc.includes(b['strGlass'])?null:b['strGlass']); return acc;},[]).filter(string => string!==null).sort((a,b)=>a.localeCompare(b));

  console.log('project page: ',uniqueNames,uniqueGlass);



  let [stateProfile, setStateProfile] = React.useState({
    selectedName: [],
    selectedIngredient: [],
    selectedGlass: [],
    selectedCategory: [],
    selectedRandom: [],
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
    switch (e.target.value) {
      case "name":
        return setStateProfile((prevState) => ({
          ...prevState,
          searchType: {
            name: !prevState.searchType.name,
            category: false,
            ingredient: false,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "ingredient":
        return setStateProfile((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: false,
            ingredient: !prevState.searchType.ingredient,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "glass":
        return setStateProfile((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: false,
            ingredient: false,
            glass: !prevState.searchType.glass,
            random: false,
            clear: false,
          },
        }));

      case "category":
        return setStateProfile((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: !prevState.searchType.category,
            ingredient: false,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "random":
        return setStateProfile((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: false,
            ingredient: false,
            glass: false,
            random: !prevState.searchType.random,
            clear: false,
          },
        }));

      case "clear":
        return setStateProfile((prevState) => ({
          ...prevState,
          selectedName: [],
          selectedIngredient: [],
          selectedGlass: [],
          selectedCategory: [],
          selectedRandom: [],
          searchType: {
            name: false,
            category: false,
            ingredient: false,
            glass: false,
            random: false,
            clear: true,
          },
        }));

      default:
        return;
    }
  };

  const handlerOnSubmit = () => {
    // console.log("handlerSubmit");
  };

  return (
    <div className="profile-container">
      <p>Search your records for the perfect cocktail!</p>
      <Form>
        <Form.Group>
          {Object.entries(stateProfile.searchType)
            .filter((pair) => pair[0] !== "id")
            .map((pair, idx) => {
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
        </Form.Group>

        {stateProfile.searchType.name && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail name?"
              id="name-search"
              onChange={(selected) => {
                setStateProfile((prevState) => ({
                  ...prevState,
                  selectedName: selected,
                }));
              }}
              options={uniqueObject.uniqueNames}
              selected={stateProfile.selectedName}
            />
          </Form.Group>
        )}

        {stateProfile.searchType.category && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail category?"
              id="cocktail-search"
              onChange={(selected) => {
                setStateProfile((prevState) => ({
                  ...prevState,
                  selectedCategory: selected,
                }));
              }}
              options={uniqueObject.uniqueCategories}
              selected={stateProfile.selectedCategory}
            />
          </Form.Group>
        )}

        {stateProfile.searchType.ingredient && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail ingredient?"
              id="ingredient-search"
              onChange={(selected) => {
                setStateProfile((prevState) => ({
                  ...prevState,
                  selectedIngredient: selected,
                }));
              }}
              options={uniqueObject.uniqueIngredients}
              selected={stateProfile.selectedIngredient}
            />
          </Form.Group>
        )}

        {stateProfile.searchType.glass && (
          <Form.Group>
            <Typeahead
              placeholder="Glass type?"
              id="glass-search"
              onChange={(selected) => {
                setStateProfile((prevState) => ({
                  ...prevState,
                  selectedGlass: selected,
                }));
              }}
              options={uniqueObject.uniqueGlasses}
              selected={stateProfile.selectedGlass}
            />
          </Form.Group>
        )}

        {stateProfile.searchType.random && (
          <Form.Group>
            <Typeahead
              placeholder="How many?"
              id="random-search"
              onChange={(selected) => {
                setStateProfile((prevState) => ({
                  ...prevState,
                  selectedRandom: selected,
                }));
              }}
              options={uniqueObject.uniqueRandom}
              selected={stateProfile.selectedRandom}
            />
          </Form.Group>
        )}
      </Form>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip id="button-tooltip">
            Click to find a cocktail with the above search criteria from your
            records.
          </Tooltip>
        }
      >
        <Button className="button search-buttons" onClick={handlerOnSubmit}>
          Search
        </Button>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip className="tooltip" id="button-tooltip">
            Click to clear search criteria and view all records.
          </Tooltip>
        }
      >
        <Button
          className="button search-buttons"
          onClick={() => console.log("triggered clear stateProject")}
        >
          View-All
        </Button>
      </OverlayTrigger>
    </div>
  );
}
