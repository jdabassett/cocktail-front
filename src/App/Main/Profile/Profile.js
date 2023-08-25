import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import oneCocktail from "../../../Data/data_one-cocktail.json";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  let navigate = useNavigate();
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
    searchUserCocktails: props.userCocktails,
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
    getOrSetLocalStorage("setState", null);
    props.getUserCocktails();
    // setStateProfile(prevState=>({...prevState,searchUserCocktails:props.userCocktails}));
    makeAndSetUniqueLists(props.userCocktails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrSetLocalStorage = (type, newState = null) => {
    if (type === "setState") {
      console.log("profile page: update profile state from local storage");
      let localStateProfile = JSON.parse(localStorage.getItem("stateProfile"));
      // console.log("profile page",localStateProfile);
      if (
        localStateProfile &&
        Object.values(localStateProfile.searchType).includes(true)
      ) {
        setStateProfile((prevState) => ({...localStateProfile,searchUserCocktails:props.userCocktails }));
      }
    } else if (type === "setLocal" && newState) {
      console.log("profile page: update profile local storage");
      // console.log("profile page",stateProfile);
      localStorage.setItem("stateProfile", JSON.stringify(newState));
    }
  };

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
        b.arrayMeasuredIngredients.forEach((ingredientObject) => {
          if (!acc.includes(ingredientObject.ingredient)) {
            acc.push(ingredientObject.ingredient);
          }
        });
        return acc;
      }, [])
      .sort((a, b) => a.localeCompare(b));
    // console.log("profile page",uniqueIngredients);

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
        setStateProfile((prevState) => {
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
        setStateProfile((prevState) => {
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
        setStateProfile((prevState) => {
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
        setStateProfile((prevState) => {
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
        setStateProfile((prevState) => {
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
        setStateProfile((prevState) => {
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

  const handlerOnSubmit = () => {
    // console.log("profile page: handlerSubmit");
    let searchUserCocktails = props.userCocktails;

    if (stateProfile.searchType.name) {
      if (stateProfile.selectedName[0]) {
        searchUserCocktails = props.userCocktails.filter(
          (cocktail) => cocktail.strDrink === stateProfile.selectedName[0]
        );
      } else {
          props.dispatch({type:'updateError',payload:{value:{bool:true,message:"Cannot filter your records with an empty search field."}}});
     
      }
    } else if (stateProfile.searchType.category) {
      if (stateProfile.selectedCategory[0]) {
        searchUserCocktails = props.userCocktails.filter(
          (cocktail) =>
            cocktail.strCategory === stateProfile.selectedCategory[0]
        );
      } else {
        props.dispatch({type:'updateError',payload:{value:{bool:true,message:"Cannot filter your records with an empty search field."}}});
      }
    } else if (stateProfile.searchType.ingredient) {
      if (stateProfile.selectedIngredient[0]) {
        searchUserCocktails = props.userCocktails.filter(
          (cocktail) =>
            cocktail.arrayMeasuredIngredients.filter((string) =>
              string.ingredient.includes(stateProfile.selectedIngredient[0])
            ).length > 0
        );
      } else {
        props.dispatch({type:'updateError',payload:{value:{bool:true,message:"Cannot filter your records with an empty search field."}}});
      }
    } else if (stateProfile.searchType.glass) {
      if (stateProfile.selectedGlass[0]) {
        searchUserCocktails = props.userCocktails.filter(
          (cocktail) => cocktail.strGlass === stateProfile.selectedGlass[0]
        );
      } else {
        props.dispatch({type:'updateError',payload:{value:{bool:true,message:"Cannot filter your records with an empty search field."}}});
      }
    } else if (stateProfile.searchType.random) {
      if (stateProfile.selectedRandom[0]) {
        if (props.userCocktails.length > stateProfile.selectedRandom[0]) {
          searchUserCocktails = props.userCocktails
            .sort((a, b) => 0.5 - Math.random())
            .slice(0, stateProfile.selectedRandom[0]);
        } else {
          searchUserCocktails = props.userCocktails;
        }
      } else {
        props.dispatch({type:'updateError',payload:{value:{bool:true,message:"Cannot filter your records with an empty search field."}}});
      }
    } 

    setStateProfile((prevState) => ({
      ...prevState,
      searchUserCocktails: searchUserCocktails,
    }));
  };

  const handlerOnEdit = (cocktail) => {
    // console.log('profile page: handlerOnEdit Triggered');
    props.dispatch({
      type: "updateRevewCocktail",
      payload: { value: cocktail },
    });
    navigate("/update");
  };
  // console.log("profile page:", stateProfile.searchUserCocktails);
  // console.log("profile page:",stateProfile.searchUserCocktails);
  // console.log("profile rendered");
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
                  setStateProfile((prevState) => {
                    let newState = {
                      ...prevState,
                      selectedName: selected,
                    };
                    getOrSetLocalStorage("setLocal", newState);
                    return newState;
                  });
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
                  setStateProfile((prevState) => {
                    let newState = {
                      ...prevState,
                      selectedCategory: selected,
                    };
                    getOrSetLocalStorage("setLocal", newState);
                    return newState;
                  });
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
                  setStateProfile((prevState) => {
                    let newState = {
                      ...prevState,
                      selectedIngredient: selected,
                    };
                    getOrSetLocalStorage("setLocal", newState);
                    return newState;
                  });
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
                  setStateProfile((prevState) => {
                    let newState = {
                      ...prevState,
                      selectedGlass: selected,
                    };
                    getOrSetLocalStorage("setLocal", newState);
                    return newState;
                  });
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
                  setStateProfile((prevState) => {
                    let newState = {
                      ...prevState,
                      selectedRandom: selected,
                    };
                    getOrSetLocalStorage("setLocal", newState);
                    return newState;
                  });
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
            Refresh
          </Button>
        </OverlayTrigger>
      </div>
      <div className="user-cocktails-container">
        {stateProfile.searchUserCocktails.length ? (
          stateProfile.searchUserCocktails.map((cocktail) => {
            return (
              <Card key={`card${cocktail._id}`} style={{ width: "30rem" }}>
                <Card.Img key={`card-img${cocktail._id}`} variant="top" src={cocktail.strDrinkThumb} />
                <Card.Body>
                  <Card.Title key={`card-title${cocktail._id}`}>{cocktail.strDrink}</Card.Title>
                  <Card.Text key={`card-text-glass${cocktail._id}`}>{`Glass: ${cocktail.strGlass}`}</Card.Text>
                  <Card.Text key={`card-text-category${cocktail._id}`}>{`Category: ${cocktail.strCategory}`}</Card.Text>

                  <h4>Ingredients:</h4>
                  <ul>
                    {cocktail.arrayMeasuredIngredients.map((item, idx) => {
                      return (
                        <li key={`ingredients${item.id}${idx}`}>{`${
                          item.unit ? `${item.unit} ` : ""
                        }${item.ingredient}`}</li>
                      );
                    })}
                    {/* {<p>cocktail.arrayMeasuredIngredients</p>} */}
                  </ul>
                  <h4>Instructions</h4>
                  <ul>
                    {cocktail.arrayInstructions.map((item, idx) => {
                      return (
                        <li
                          key={`instructions${item.id}${idx}`}
                        >{`${item.instruction}`}</li>
                      );
                    })}
                    {/* {<p>cocktail.arrayInstructions</p>} */}
                  </ul>

                  <Card.Text>{`Notes: ${
                    cocktail.strNotes ? cocktail.strNotes : ""
                  }`}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handlerOnEdit(cocktail)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      props.handlerOnDelete(cocktail);
                      makeAndSetUniqueLists(props.userCocktails.filter(item=>item._id!==cocktail._id));
                      setStateProfile((prevState) => ({
                        ...prevState,
                        searchUserCocktails:
                          prevState.searchUserCocktails.filter(
                            (item) => item._id !== cocktail._id
                          ),
                      }));
                    }}
                  >
                    Delete
                  </Button>
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
                    return  <li key={`ingredients${item.id}`}>{`${
                      item.unit ? `${item.unit} ` : ""
                    }${item.ingredient}`}</li>})}
              </ul>
              <h4>Instructions</h4>
              <ul>
                {oneCocktail.arrayInstructions.map((item, idx) => {
                  return (
                    <li key={`instructions${item.id}`}>{`${item.instruction}`}</li>
                  );
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
