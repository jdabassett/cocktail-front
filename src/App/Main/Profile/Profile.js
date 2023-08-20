import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import oneCocktail from "../../../Data/data_one-cocktail.json";

export default function Profile(props) {
  let [stateProfile, setStateProfile] = React.useState({
    selectedName: [],
    selectedIngredient: [],
    selectedGlass: [],
    selectedCategory: [],
    selectedRandom: [],
    uniqueNames: [],
    uniqueCategories: [],
    uniqueIngredients: [],
    uniqueGlasses: [],
    searchUserCocktails:props.userCocktails||[],
    searchType: {
      name: false,
      category: false,
      ingredient: false,
      glass: false,
      random: false,
      clear: false,
    },
  });

  React.useEffect(() => {
    console.log("profile page: on load");
    makeAndSetUniqueLists(props.userCocktails||[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeAndSetUniqueLists = (userCocktails) => {
    let uniqueNames = userCocktails
      .reduce((acc, b) => {
        acc.push(acc.includes(b["strDrink"]) ? null : b["strDrink"]);
        return acc;
      }, [])
      .filter((string) => string !== null)
      .sort((a, b) => a.localeCompare(b));

    //make list of unique categories from the userCocktails in state
    let uniqueCategories = userCocktails
      .reduce((acc, b) => {
        acc.push(acc.includes(b["strCategory"]) ? null : b["strCategory"]);
        return acc;
      }, [])
      .filter((string) => string !== null)
      .sort((a, b) => a.localeCompare(b));

    //make a list of unique ingredients from the userCocktails in state
    let uniqueIngredients = userCocktails
      .reduce((acc, b) => {
        b.arrayMeasuredIngredients.forEach((ingredient) => {
          let newIngredient = ingredient.split("_")[1];
          if (!acc.includes(newIngredient)) {
            acc.push(newIngredient);
          }
        });
        return acc;
      }, [])
      .sort((a, b) => a.localeCompare(b));

    //make a list of unique glass from the userCocktails in state
    let uniqueGlasses = userCocktails
      .reduce((acc, b) => {
        acc.push(acc.includes(b["strGlass"]) ? null : b["strGlass"]);
        return acc;
      }, [])
      .filter((string) => string !== null)
      .sort((a, b) => a.localeCompare(b));

    setStateProfile((prevState) => ({
      ...prevState,
      uniqueNames: uniqueNames,
      uniqueCategories: uniqueCategories,
      uniqueIngredients: uniqueIngredients,
      uniqueGlasses: uniqueGlasses,
    }));
  };

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
    console.log("handlerSubmit");
    let searchUserCocktails = props.userCocktails;

    if(stateProfile.searchType.name){
      if(stateProfile.selectedName[0]){
        searchUserCocktails=props.userCocktails.filter(cocktail=>cocktail.strDrink===stateProfile.selectedName[0]);
      } else {
        //TODO: handler error when search is empty
      }
    } else if (stateProfile.searchType.category){
      if(stateProfile.selectedCategory[0]){
        searchUserCocktails=props.userCocktails.filter(cocktail=>cocktail.strCategory===stateProfile.selectedCategory[0]);
      } else {
        //TODO: handler error when search is empty
      }
    } else if (stateProfile.searchType.ingredient){
      if(stateProfile.selectedIngredient[0]){
        searchUserCocktails=props.userCocktails.filter(cocktail=>cocktail.arrayMeasuredIngredients.filter(string => string.includes(stateProfile.selectedIngredient[0])).length>0);
      } else {
        //TODO: handler error when search is empty
      }
    } else if (stateProfile.searchType.glass){
      if(stateProfile.selectedGlass[0]){
        searchUserCocktails=props.userCocktails.filter(cocktail=>cocktail.strGlass===stateProfile.selectedGlass[0]);
      } else {
        //TODO: handler error when search is empty
      }
    } else if (stateProfile.searchType.random){
      if(stateProfile.selectedRandom[0]){
        if (props.userCocktails.length>stateProfile.selectedRandom[0]) {
          searchUserCocktails=props.userCocktails.sort((a,b)=> 0.5-Math.random()).slice(0,stateProfile.selectedRandom[0]);
        } else {
          searchUserCocktails=props.userCocktails;
        };
      } else {
        //TODO: handler error when search is empty
      }
    }

    setStateProfile(prevState=>({...prevState,searchUserCocktails:searchUserCocktails}))
  };

  console.log(stateProfile.searchUserCocktails);
  return (
    <div className="profile-container">
      <div className="profile-form">
        <p>Search your records for the perfect cocktail!</p>
        <Form>
          <Form.Group>
            {Object.entries(stateProfile.searchType)
              .filter((pair) => pair[0] !== "id")
              .map((pair, idx) => {
                return (
                  <Form.Check
                    key={`form${idx}`}
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
                options={stateProfile.uniqueNames}
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
                options={stateProfile.uniqueCategories}
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
                options={stateProfile.uniqueIngredients}
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
                options={stateProfile.uniqueGlasses}
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
              Click to find cocktails with the above search criteria from your
              records.
            </Tooltip>
          }
        >
          <Button className="button search-buttons" onClick={handlerOnSubmit}>
            Search
          </Button>
        </OverlayTrigger>
       

      </div>
      <div className="user-cocktails-container">
        {stateProfile.searchUserCocktails.length ? (
          stateProfile.searchUserCocktails.map((cocktail, idx0) => {
            return (
              <Card style={{ width: "30rem" }}>
                <Card.Img variant="top" src={cocktail.strDrinkThumb} />
                <Card.Body>
                  <Card.Title>{cocktail.strDrink}</Card.Title>
                  <Card.Text>{`Glass: ${cocktail.strGlass}`}</Card.Text>
                  <Card.Text>{`Category: ${cocktail.strCategory}`}</Card.Text>

                  <h4>Ingredients:</h4>
                  <ul>
                    {cocktail.arrayMeasuredIngredients.map((item, idx1) => {
                      let itemSplit = item.split("_");
                      if (itemSplit.length > 1) {
                        return (
                          <li
                            key={`ingredients${idx0}${idx1}`}
                          >{`${itemSplit[0]} ${itemSplit[1]}`}</li>
                        );
                      } else {
                        return (
                          <li key={`ingredients${idx0}${idx1}`}>{`${item}`}</li>
                        );
                      }
                    })}
                  </ul>
                  <h4>Instructions</h4>
                  <ul>
                    {cocktail.arrayInstructions.map((item, idx1) => {
                      return (
                        <li key={`instructions${idx0}${idx1}`}>{`${item}`}</li>
                      );
                    })}
                  </ul>

                  <Card.Text>{`Notes: ${cocktail.strNotes}`}</Card.Text>
                  <Button variant="primary">Edit</Button>
                  <Button variant="primary">Delete</Button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Card style={{ width: "30rem" }}>
            <Card.Img variant="top" src={oneCocktail.strDrinkThumb} />
            <Card.Body>
              <Card.Title>{oneCocktail.strDrink}</Card.Title>
              <Card.Text>{`Glass: ${oneCocktail.strGlass}`}</Card.Text>
              <Card.Text>{`Category: ${oneCocktail.strCategory}`}</Card.Text>
              <h4>Ingredients:</h4>
              <ul>
                {oneCocktail.arrayMeasuredIngredients.map((item, idx) => {
                  let itemSplit = item.split("_");
                  if (itemSplit.length > 1) {
                    return (
                      <li
                        key={`ingredients${idx}`}
                      >{`${itemSplit[0]} ${itemSplit[1]}`}</li>
                    );
                  } else {
                    return <li key={`ingredients${idx}`}>{`${item}`}</li>;
                  }
                })}
              </ul>
              <h4>Instructions</h4>
              <ul>
                {oneCocktail.arrayInstructions.map((item, idx) => {
                  return <li key={`instructions${idx}}`}>{`${item}`}</li>;
                })}
              </ul>
              <Card.Text>{`Notes: ${oneCocktail.strNotes}`}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}
