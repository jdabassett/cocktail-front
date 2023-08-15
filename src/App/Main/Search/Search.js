import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";

export default function Search(props) {
  let { getIdTokenClaims } = useAuth0();
  let [searchState, setSearchState] = React.useState({
    selectedName: [],
    selectedIngredient: [],
    selectedGlass: [],
    selectedCategory: [],
    selectedRandom: [],
    activeKey: null,
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
            name: !prevState.searchType.name,
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
            name: false,
            category: false,
            ingredient: !prevState.searchType.ingredient,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "glass":
        return setSearchState((prevState) => ({
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
        return setSearchState((prevState) => ({
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
        return setSearchState((prevState) => ({
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

  const configureConfigObject = (config) => {
    let searchType = searchState.searchType;
    let returnConfig = config;
    if (searchType.name && searchState.selectedName[0]) {
      returnConfig["url"] = `/name?name=${searchState.selectedName[0].replace(
        /\s/g,
        "_"
      )}`;
    } else if (searchType.category && searchState.selectedCategory[0]) {
      returnConfig[
        "url"
      ] = `/category?category=${searchState.selectedCategory[0].replace(
        /\s/g,
        "_"
      )}`;
    } else if (searchType.random && searchState.selectedRandom[0]) {
      returnConfig["url"] = `/random?number=${searchState.selectedRandom[0]}`;
    } else if (searchType.ingredient && searchState.selectedIngredient[0]) {
      returnConfig[
        "url"
      ] = `/ingredient?ingredient=${searchState.selectedIngredient[0].replace(
        /\s/g,
        "_"
      )}`;
    } else if (searchType.glass && searchState.selectedGlass[0]) {
      returnConfig[
        "url"
      ] = `/glass?glass=${searchState.selectedGlass[0].replace(/\s/g, "_")}`;
    } else {
      //TODO: Handle error when empty  request made.
      console.log('handling error')
    }
    return returnConfig;
  };

  const handlerOnSubmit = () => {
    if (
      (searchState.searchType.name ||
        searchState.searchType.category ||
        searchState.searchType.ingredient ||
        searchState.searchType.glass ||
        searchState.searchType.random) &&
      (searchState.selectedName ||
        searchState.selectedCategory ||
        searchState.selectedIngredient ||
        searchState.selectedGlass ||
        searchState.selectedRandom)
    ) {
      getIdTokenClaims().then((res) => {
        //get authentication to use in request
        let jwt = res.__raw;
        let config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "get",
          baseURL: process.env.REACT_APP_SERVER,
        };
        //make new config object with proper url
        let newConfig = configureConfigObject(config);
        // console.log(newConfig);

        axios(newConfig)
          .then((res) => {
            let searchResults = res.data.drinks;
            props.dispatch({type:'updateSearchResults',payload:{value:searchResults}})
          })
          //TODO: Handle error
          .catch((err) => console.log(err));
      });
    } else {
      //TODO: Handle error if search criteria isn't meet.
      console.log("search criteria wasnt meet");
    }
  };

  console.log(props.searchResults);
  return (
    <div className="search-container">
      <p>How do you want to search for your next cocktail?</p>
      <Form>
        <Form.Group>
          {Object.entries(searchState.searchType)
            .filter(pair => pair[0]!=='id')
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

      {props.searchResults &&
        
      <Accordion defaultActiveKey="null">
        {props.searchResults.map((cocktail, idx) => {
          return (
            <Accordion.Item
              key={idx}
              eventKey={idx}
              onClick={() =>
                setSearchState((prevState) => ({
                  ...prevState,
                  activeKey: prevState.activeKey === idx ? null : idx,
                }))
              }
            >
              <Accordion.Header>{cocktail.strDrink}</Accordion.Header>
              <Accordion.Body>
                <Image src={cocktail.strDrinkThumb} thumbnail />
                <Button onClick={handlerOnSubmit}>View In Detail</Button>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>}
    </div>
  );
}
