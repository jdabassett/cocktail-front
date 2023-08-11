import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';

export default function Search() {
  let { getIdTokenClaims } = useAuth0();
  let [searchState, setSearchState] = React.useState({
    selectedName: [],
    selectedIngredient: [],
    selectedGlass: [],
    selectedCategory: [],
    selectedRandom: [],
    searchResults: [],
    activeKey:null,
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
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            name: true,
            category: false,
            ingredient: false,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "ingredient":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            ...prevState.searchType,
            ingredient: !prevState.searchType.ingredient,
            name: false,
            category: false,
            random: false,
            clear: false,
          },
        }));

      case "glass":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            ...prevState.searchType,
            glass: !prevState.searchType.glass,
            name: false,
            category: false,
            random: false,
            clear: false,
          },
        }));

      case "category":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: true,
            ingredient: false,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "random":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: false,
            ingredient: false,
            glass: false,
            random: true,
            clear: false,
          },
        }));

      case "clear":
        return setSearchState((prevState) => ({
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

  const configureConfigObject = (searchType) => {};

  const handlerOnSubmit = () => {
    getIdTokenClaims().then((res) => {
      let jwt = res.__raw;
      let config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: "get",
        baseURL: process.env.REACT_APP_SERVER,
        url: "/",
      };
      axios(config)
        .then((res) => {
          let searchResults = res.data.drinks;
          setSearchState((prevState) => ({
            ...prevState,
            searchResults: searchResults,
          }));
          // console.log(searchResults);
        })
        .catch((err) => console.log(err));
    });
  };

  console.log(searchState.searchResults);
  return (
    <div className="search-container">
      <p>How do you want to search for your next cocktail?</p>
      <Form>
        <Form.Group>
          {Object.entries(searchState.searchType).map((pair, idx) => {
            return (
              <Form.Check
                key={idx}
                type="radio"
                id="default-radio"
                label={`${pair[0]}`}
                onClick={handlerSearchType}
                value={`${pair[0]}`}
                checked={pair[1]}
                inline
              />
            );
          })}
        </Form.Group>

        {searchState.searchType.name && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail name?"
              id="name-search"
              onChange={(selected) => {
                setSearchState((prevState) => ({
                  ...prevState,
                  selectedName: selected,
                }));
              }}
              options={uniqueObject.uniqueNames}
              selected={searchState.selectedName}
            />
          </Form.Group>
        )}

        {searchState.searchType.category && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail category?"
              id="cocktail-search"
              onChange={(selected) => {
                setSearchState((prevState) => ({
                  ...prevState,
                  selectedCategory: selected,
                }));
              }}
              options={uniqueObject.uniqueCategories}
              selected={searchState.selectedCategory}
            />
          </Form.Group>
        )}

        {searchState.searchType.ingredient && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail ingredient?"
              id="ingredient-search"
              onChange={(selected) => {
                setSearchState((prevState) => ({
                  ...prevState,
                  selectedIngredient: selected,
                }));
              }}
              options={uniqueObject.uniqueIngredients}
              selected={searchState.selectedIngredient}
            />
          </Form.Group>
        )}

        {searchState.searchType.glass && (
          <Form.Group>
            <Typeahead
              placeholder="Glass type?"
              id="glass-search"
              onChange={(selected) => {
                setSearchState((prevState) => ({
                  ...prevState,
                  selectedGlass: selected,
                }));
              }}
              options={uniqueObject.uniqueGlasses}
              selected={searchState.selectedGlass}
            />
          </Form.Group>
        )}

        {searchState.searchType.random && (
          <Form.Group>
            <Typeahead
              placeholder="How many?"
              id="random-search"
              onChange={(selected) => {
                setSearchState((prevState) => ({
                  ...prevState,
                  selectedRandom: selected,
                }));
              }}
              options={uniqueObject.uniqueRandom}
              selected={searchState.selectedRandom}
            />
          </Form.Group>
        )}
      </Form>
      <Button onClick={handlerOnSubmit}>Submit</Button>

      <Accordion defaultActiveKey="null">
        {searchState.searchResults.map((cocktail,idx)=>{
          return <Accordion.Item 
                    key={idx} 
                    eventKey={idx} 
                    onClick={()=>setSearchState(prevState=>({...prevState,activeKey:prevState.activeKey===idx?null:idx}))}>
            <Accordion.Header>
              {cocktail.strDrink}
              </Accordion.Header>
            <Accordion.Body>
              <Image src={cocktail.strDrinkThumb} thumbnail />
              <Button>View In Detail</Button>
            </Accordion.Body>
          </Accordion.Item>
        })}
      </Accordion>
    </div>
  );
}
