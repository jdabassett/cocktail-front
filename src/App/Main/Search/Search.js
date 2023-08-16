import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function Search(props) {
  let { getIdTokenClaims } = useAuth0();
  let [stateSearch, setStateSearch] = React.useState({
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
        return setStateSearch((prevState) => ({
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
        return setStateSearch((prevState) => ({
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
        return setStateSearch((prevState) => ({
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
        return setStateSearch((prevState) => ({
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
        return setStateSearch((prevState) => ({
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
        return setStateSearch((prevState) => ({
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
    let searchType = stateSearch.searchType;
    let returnConfig = config;
    if (searchType.name && stateSearch.selectedName[0]) {
      returnConfig["url"] = `/name?name=${stateSearch.selectedName[0].replace(
        /\s/g,
        "_"
      )}`;
    } else if (searchType.category && stateSearch.selectedCategory[0]) {
      returnConfig[
        "url"
      ] = `/category?category=${stateSearch.selectedCategory[0].replace(
        /\s/g,
        "_"
      )}`;
    } else if (searchType.random && stateSearch.selectedRandom[0]) {
      returnConfig["url"] = `/random?number=${stateSearch.selectedRandom[0]}`;
    } else if (searchType.ingredient && stateSearch.selectedIngredient[0]) {
      returnConfig[
        "url"
      ] = `/ingredient?ingredient=${stateSearch.selectedIngredient[0].replace(
        /\s/g,
        "_"
      )}`;
    } else if (searchType.glass && stateSearch.selectedGlass[0]) {
      returnConfig[
        "url"
      ] = `/glass?glass=${stateSearch.selectedGlass[0].replace(/\s/g, "_")}`;
    } else {
      //TODO: Handle error when empty  request made.
      console.log("handling error");
    }
    return returnConfig;
  };

  const handlerOnSubmit = () => {
    if (
      (stateSearch.searchType.name ||
        stateSearch.searchType.category ||
        stateSearch.searchType.ingredient ||
        stateSearch.searchType.glass ||
        stateSearch.searchType.random) &&
      (stateSearch.selectedName ||
        stateSearch.selectedCategory ||
        stateSearch.selectedIngredient ||
        stateSearch.selectedGlass ||
        stateSearch.selectedRandom)
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
            props.dispatch({
              type: "updateSearchResults",
              payload: { value: searchResults },
            });
          })
          //TODO: Handle error
          .catch((err) => console.log(err));
      });
    } else {
      //TODO: Handle error if search criteria isn't meet.
      console.log("search criteria wasnt meet");
    }
  };

  console.log(props.displayHints);
  return (
    <div className="search-container">
      <p>Search for cocktails by...?</p>
      <Form>
        <Form.Group>
          {Object.entries(stateSearch.searchType)
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

        {stateSearch.searchType.name && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail name?"
              id="name-search"
              onChange={(selected) => {
                setStateSearch((prevState) => ({
                  ...prevState,
                  selectedName: selected,
                }));
              }}
              options={uniqueObject.uniqueNames}
              selected={stateSearch.selectedName}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.category && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail category?"
              id="cocktail-search"
              onChange={(selected) => {
                setStateSearch((prevState) => ({
                  ...prevState,
                  selectedCategory: selected,
                }));
              }}
              options={uniqueObject.uniqueCategories}
              selected={stateSearch.selectedCategory}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.ingredient && (
          <Form.Group>
            <Typeahead
              placeholder="Cocktail ingredient?"
              id="ingredient-search"
              onChange={(selected) => {
                setStateSearch((prevState) => ({
                  ...prevState,
                  selectedIngredient: selected,
                }));
              }}
              options={uniqueObject.uniqueIngredients}
              selected={stateSearch.selectedIngredient}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.glass && (
          <Form.Group>
            <Typeahead
              placeholder="Glass type?"
              id="glass-search"
              onChange={(selected) => {
                setStateSearch((prevState) => ({
                  ...prevState,
                  selectedGlass: selected,
                }));
              }}
              options={uniqueObject.uniqueGlasses}
              selected={stateSearch.selectedGlass}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.random && (
          <Form.Group>
            <Typeahead
              placeholder="How many?"
              id="random-search"
              onChange={(selected) => {
                setStateSearch((prevState) => ({
                  ...prevState,
                  selectedRandom: selected,
                }));
              }}
              options={uniqueObject.uniqueRandom}
              selected={stateSearch.selectedRandom}
            />
          </Form.Group>
        )}
      </Form>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        show ={!props.displayHints.disable && props.displayHints.component==="search"}
        onToggle={()=>{props.dispatch({type:'updateDisplayHints',payload:{value:{component:props.displayHints.component==="search"?"":"search"}}})}}
        overlay={
          <Tooltip id="button-tooltip">
            Click to find a cocktail with the above search criteria.
          </Tooltip>
        }
      >
        <Button className="button search-buttons" onClick={handlerOnSubmit}>Search</Button>
      </OverlayTrigger>


      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        show ={!props.displayHints.disable && props.displayHints.component==="clear"}
        onToggle={()=>{props.dispatch({type:'updateDisplayHints',payload:{value:{component:props.displayHints.component==="clear"?"":"clear"}}})}}
        overlay={
          <Tooltip className="tooltip" id="button-tooltip">
            Click to clear all search results below.
          </Tooltip>
        }
      >
        <Button
          className="button search-buttons"
          onClick={() =>
            props.dispatch({
              type: "updateSearchResults",
              payload: { value: null },
            })
          }
        >
          Clear
        </Button>
      </OverlayTrigger>

      {props.searchResults && (
        <Accordion defaultActiveKey="null">
          {props.searchResults.map((cocktail, idx) => {
            return (
              <Accordion.Item
                key={idx}
                eventKey={idx}
                onClick={() =>
                  setStateSearch((prevState) => ({
                    ...prevState,
                    activeKey: prevState.activeKey === idx ? null : idx,
                  }))
                }
              >
                <Accordion.Header>{cocktail.strDrink}</Accordion.Header>
                <Accordion.Body>
                  <Image src={cocktail.strDrinkThumb} thumbnail />
                  <Button
                    onClick={() => props.handlerGetById(cocktail.idDrink)}
                  >
                    View In Details
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
