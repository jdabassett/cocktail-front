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

  //keep local storage up to date
  React.useEffect(() => {
    //retreive from localStorage
    getOrSetLocalStorage("setState", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrSetLocalStorage = (type, newState = null) => {
    if (type === "setState") {
      // console.log("search page: update search state from local storage");
      let localStateSearch = JSON.parse(localStorage.getItem("stateSearch"));
      // console.log("search page", localStateSearch);
      if (
        localStateSearch &&
        Object.values(localStateSearch.searchType).includes(true)
      ) {
        setStateSearch((prevState) => ({ ...localStateSearch }));
      }
    } else if (type === "setLocal" && newState) {
      // console.log('search page: update search local storage');
      // console.log("search page", stateSearch);
      localStorage.setItem("stateSearch", JSON.stringify(newState));
    }
  };

  const handlerSearchType = (e) => {
    e.persist();
    switch (e.target.value) {
      case "name":
        setStateSearch((prevState) => {
          let newState = {
            ...prevState,
            searchType: {
              name: !prevState.searchType.name,
              category: false,
              ingredient: false,
              glass: false,
              random: false,
              clear: false,
            },
          };
          getOrSetLocalStorage("setLocal", newState);
          return newState;
        });
        break;

      case "ingredient":
        setStateSearch((prevState) => {
          let newState = {
            ...prevState,
            searchType: {
              name: false,
              category: false,
              ingredient: !prevState.searchType.ingredient,
              glass: false,
              random: false,
              clear: false,
            },
          };
          getOrSetLocalStorage("setLocal", newState);
          return newState;
        });
        break;

      case "glass":
        setStateSearch((prevState) => {
          let newState = {
            ...prevState,
            searchType: {
              name: false,
              category: false,
              ingredient: false,
              glass: !prevState.searchType.glass,
              random: false,
              clear: false,
            },
          };
          getOrSetLocalStorage("setLocal", newState);
          return newState;
        });
        break;

      case "category":
        setStateSearch((prevState) => {
          let newState = {
            ...prevState,
            searchType: {
              name: false,
              category: !prevState.searchType.category,
              ingredient: false,
              glass: false,
              random: false,
              clear: false,
            },
          };
          getOrSetLocalStorage("setLocal", newState);
          return newState;
        });
        break;

      case "random":
        setStateSearch((prevState) => {
          let newState = {
            ...prevState,
            searchType: {
              name: false,
              category: false,
              ingredient: false,
              glass: false,
              random: !prevState.searchType.random,
              clear: false,
            },
          };
          getOrSetLocalStorage("setLocal", newState);
          return newState;
        });
        break;

      case "clear":
        setStateSearch((prevState) => {
          let newState = {
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
          };
          getOrSetLocalStorage("setLocal", newState);
          return newState;
        });
        break;
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
      // console.log("search page: when empty request is made");

      props.dispatch({
        type: "updateError",
        payload: {
          value: {
            bool: true,
            message:
              "Cannot perform search with empty search field. (Get Request)",
          },
        },
      });
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
        // console.log("search page:",newConfig);

        axios(newConfig)
          .then((res) => {
            let searchResults = res.data.drinks;
            props.dispatch({
              type: "updateSearchResults",
              payload: { value: searchResults },
            });
          })
          .catch((err) => {
            props.dispatch({
              type: "updateError",
              payload: {
                value: {
                  bool: true,
                  message: `${err.message}. Cannot perform this search. (Get Request)`,
                },
              },
            });
          });
      });
    } else {
      props.dispatch({
        type: "updateError",
        payload: {
          value: {
            bool: true,
            message:
              "Cannot perform search with empty search field. (Get Request)",
          },
        },
      });
    }
  };

  // console.log(props.displayHints);
  return (
    <div className="search-container">
      <Form className="search-form">
        <h1 className="search-form-title">Search for new cocktails by...?</h1>
        <Form.Group className="search-form-group radio-group">
          {Object.entries(stateSearch.searchType)
            .filter((pair) => pair[0] !== "id")
            .map((pair, idx) => {
              return (
                <Form.Check
                  className="search-radio-buttons"
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
          <Form.Group className="search-form-group name-group rounded-0">
            <Typeahead
              className="typehead name-typehead"
              placeholder="Cocktail name?"
              id="name-search"
              onChange={(selected) => {
                setStateSearch((prevState) => {
                  let newState = {
                    ...prevState,
                    selectedName: selected,
                  };
                  getOrSetLocalStorage("setLocal", newState);
                  return newState;
                });
              }}
              options={uniqueObject.uniqueNames}
              selected={stateSearch.selectedName}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.category && (
          <Form.Group className="search-form-group category-group rounded-0">
            <Typeahead
              className="typehead category-typehead"
              placeholder="Cocktail category?"
              id="cocktail-search"
              onChange={(selected) => {
                setStateSearch((prevState) => {
                  let newState = {
                    ...prevState,
                    selectedCategory: selected,
                  };
                  getOrSetLocalStorage("setLocal", newState);
                  return newState;
                });
              }}
              options={uniqueObject.uniqueCategories}
              selected={stateSearch.selectedCategory}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.ingredient && (
          <Form.Group className="search-form-group ingredient-group rounded-0">
            <Typeahead
              className="typehead ingredient-typehead"
              placeholder="Cocktail ingredient?"
              id="ingredient-search"
              onChange={(selected) => {
                setStateSearch((prevState) => {
                  let newState = {
                    ...prevState,
                    selectedIngredient: selected,
                  };
                  getOrSetLocalStorage("setLocal", newState);
                  return newState;
                });
              }}
              options={uniqueObject.uniqueIngredients}
              selected={stateSearch.selectedIngredient}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.glass && (
          <Form.Group className="search-form-group glass-group rounded-0">
            <Typeahead
              className="typehead glass-typehead"
              placeholder="Glass type?"
              id="glass-search"
              onChange={(selected) => {
                setStateSearch((prevState) => {
                  let newState = {
                    ...prevState,
                    selectedGlass: selected,
                  };
                  getOrSetLocalStorage("setLocal", newState);
                  return newState;
                });
              }}
              options={uniqueObject.uniqueGlasses}
              selected={stateSearch.selectedGlass}
            />
          </Form.Group>
        )}

        {stateSearch.searchType.random && (
          <Form.Group className="search-form-group random-group rounded-0">
            <Typeahead
              className="typehead random-typehead rounded-0"
              placeholder="How many?"
              id="random-search"
              onChange={(selected) => {
                setStateSearch((prevState) => {
                  let newState = {
                    ...prevState,
                    selectedRandom: selected,
                  };
                  getOrSetLocalStorage("setLocal", newState);
                  return newState;
                });
              }}
              options={uniqueObject.uniqueRandom}
              selected={stateSearch.selectedRandom}
            />
          </Form.Group>
        )}
        {stateSearch.searchType.clear && (
          <Form.Group className="search-form-group random-group rounded-0">
            <Typeahead
              className="typehead random-typehead"
              placeholder=""
              id="clear-search-typeahead"
              onChange={()=>{console.log('profile clear typeahead has been clicked')}}
              options={[""]}
            />
          </Form.Group>
        )}
        <div className="search-button-container">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip className="tooltip" id="button-tooltip">
                Click to find a cocktail with the above search criteria.
              </Tooltip>
            }
          >
            <Button
              variant="light"
              className="search-button dark-button rounded-0"
              onClick={handlerOnSubmit}
            >
              Search
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip className="tooltip" id="button-tooltip">
                Click to clear all search results below.
              </Tooltip>
            }
          >
            <Button
              variant="light"
              className="search-button dark-button rounded-0"
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
        </div>
      </Form>

      {props.searchResults && (
        <Accordion className="search-accordion" defaultActiveKey="null">
          {props.searchResults.map((cocktail, idx) => {
            return (
              <Accordion.Item
                className="accordion-item"
                key={idx}
                eventKey={idx}
                onClick={() =>
                  setStateSearch((prevState) => ({
                    ...prevState,
                    activeKey: prevState.activeKey === idx ? null : idx,
                  }))
                }
              >
                <Accordion.Header className="accordion-item-header">
                  {cocktail.strDrink}
                </Accordion.Header>
                <Accordion.Body className="accordion-item-body">
                  <Image
                    className="accordion-item-image"
                    src={cocktail.strDrinkThumb}
                    thumbnail
                  />
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip className="tooltip" id="button-tooltip">
                        Click here to review this cocktail in more detail.
                      </Tooltip>
                    }
                  >
                    <Button
                    variant="light"
                    className="accordion-item-button dark-button rounded-0"
                    onClick={() => props.handlerGetById(cocktail.idDrink)}
                  >
                    View In Details
                  </Button>
                  </OverlayTrigger>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
