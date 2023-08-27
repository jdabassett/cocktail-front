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
        setStateProfile((prevState) => ({
          ...localStateProfile,
          searchUserCocktails: props.userCocktails,
        }));
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
        props.dispatch({
          type: "updateError",
          payload: {
            value: {
              bool: true,
              message: "Cannot filter your records with an empty search field.",
            },
          },
        });
      }
    } else if (stateProfile.searchType.category) {
      if (stateProfile.selectedCategory[0]) {
        searchUserCocktails = props.userCocktails.filter(
          (cocktail) =>
            cocktail.strCategory === stateProfile.selectedCategory[0]
        );
      } else {
        props.dispatch({
          type: "updateError",
          payload: {
            value: {
              bool: true,
              message: "Cannot filter your records with an empty search field.",
            },
          },
        });
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
        props.dispatch({
          type: "updateError",
          payload: {
            value: {
              bool: true,
              message: "Cannot filter your records with an empty search field.",
            },
          },
        });
      }
    } else if (stateProfile.searchType.glass) {
      if (stateProfile.selectedGlass[0]) {
        searchUserCocktails = props.userCocktails.filter(
          (cocktail) => cocktail.strGlass === stateProfile.selectedGlass[0]
        );
      } else {
        props.dispatch({
          type: "updateError",
          payload: {
            value: {
              bool: true,
              message: "Cannot filter your records with an empty search field.",
            },
          },
        });
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
        props.dispatch({
          type: "updateError",
          payload: {
            value: {
              bool: true,
              message: "Cannot filter your records with an empty search field.",
            },
          },
        });
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
      <Form className="search-form profile-form">
        <h1 className="search-form-title profile-form-title">
          Search your records for the perfect cocktail!
        </h1>
        <Form.Group className="search-form-group radio-group profile-form-group">
          {Object.entries(stateProfile.searchType)
            .filter((pair) => pair[0] !== "id")
            .map((pair, idx) => {
              return (
                <Form.Check
                  className="search-radio-buttons profile-radio-buttons"
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
          <Form.Group className="search-form-group name-group rounded-0 profile-form-group">
            <Typeahead
              className="typehead name-typehead"
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
          <Form.Group className="search-form-group category-group rounded-0 profile-form-group">
            <Typeahead
              className="typehead category-typehead"
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
          <Form className="search-form-group ingredient-group rounded-0">
            <Typeahead
              className="typehead ingredient-typehead"
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
          </Form>
        )}

        {stateProfile.searchType.glass && (
          <Form.Group className="search-form-group glass-group rounded-0 profile-form-group">
            <Typeahead
              className="typehead glass-typehead"
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
          <Form.Group className="search-form-group glass-group rounded-0 profile-form-group">
            <Typeahead
              className="typehead random-typehead"
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
        {stateProfile.searchType.clear && (
          <Form.Group className="search-form-group random-group rounded-0">
            <Typeahead
              className="typehead random-typehead"
              placeholder=""
              id="clear-search"
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
              <Tooltip id="button-tooltip">
                Click to find cocktails with the above search criteria from your
                records.
              </Tooltip>
            }
          >
            <Button
              variant="dark"
              className="button search-buttons rounded-0"
              onClick={handlerOnSubmit}
            >
              Refresh
            </Button>
          </OverlayTrigger>
        </div>
      </Form>

      <div className="user-cocktails-container">
        {stateProfile.searchUserCocktails.length ? (
          stateProfile.searchUserCocktails.map((cocktail) => {
            return (
              <Card className="card profile-card" key={`card${cocktail._id}`}>
                <div className="card-image-container profile-card-image-container">
                  <Card.Img
                    className="card-image profile-image"
                    key={`card-img${cocktail._id}`}
                    variant="top"
                    src={cocktail.strDrinkThumb}
                  />
                </div>
                <Card.Body className="card-body">
                  <div>
                    {cocktail.strDrink && (
                      <div
                        className="card-body-div-nonli"
                        key={`card-title${cocktail._id}`}
                      >
                        <h4 className="card-name-title card-title">Name:</h4>
                        <p className="card-name-p card-p">
                          {cocktail.strDrink}
                        </p>
                      </div>
                    )}
                  

                  {cocktail.strGlass && (
                    <div className="card-body-div-nonli">
                      <h4 className="card-glass-title card-title">Glass:</h4>

                      <p className="card-glass-p card-p">{cocktail.strGlass}</p>
                    </div>
                  )}

                  {cocktail.strCategory && (
                    <div className="card-body-div-nonli">
                      <h4 className="card-category-title card-title">
                        Category:
                      </h4>
                      <p className="card-category-p  card-p">
                        {cocktail.strCategory}
                      </p>
                    </div>
                  )}
       

                  {cocktail.arrayMeasuredIngredients && (
                    <div className="card-body-div-li">
                      <h4 className="card-ingredient-title card-title">
                        Ingredients:
                      </h4>
                      <ul className="card-ingredient-ul  card-ul">
                        {cocktail.arrayMeasuredIngredients.map((item, idx) => {
                          return (
                            <li
                              key={item.id}
                              className="card-ingredient-li card-li"
                            >
                              {`${item.unit ? `${item.unit} ` : ""} ${
                                item.ingredient
                              }`}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {cocktail.arrayInstructions && (
                    <div className="card-body-div-li">
                      <h4 className="card-instruction-title card-title">
                        Instructions:
                      </h4>
                      <ul className="card-instruction-li  card-ul">
                        {cocktail.arrayInstructions.map((item, idx) => {
                          return (
                            <li
                              key={item.id}
                              className="card-instruction-li card-li"
                            >
                              {item.instruction}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {cocktail.strNotes && (
                    <>
                      <h4 className="card-note-title card-title">Notes:</h4>
                      <ul className="card-note-ul card-ul">
                        <li className="card-note-li  card-li">
                          {cocktail.strNotes}
                        </li>
                      </ul>
                    </>
                  )}
                  </div>

                  <div className="card-button-container">
                    <Button
                      variant="dark"
                      className="dark-button edit-button rounded-0"
                      onClick={() => handlerOnEdit(cocktail)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="dark"
                      className="dark-button delete-button rounded-0"
                      onClick={() => {
                        props.handlerOnDelete(cocktail);
                        makeAndSetUniqueLists(
                          props.userCocktails.filter(
                            (item) => item._id !== cocktail._id
                          )
                        );
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

                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Card className="card profile-card" key={`card${oneCocktail._id}`}>
          <div className="profile-card-image-container card-image-container">
            <Card.Img
              className="card-image profile-image"
              key={`card-img${oneCocktail._id}`}
              variant="top"
              src={oneCocktail.strDrinkThumb}
            />
          </div>
          <Card.Body className="card-body">
            <div>
              {oneCocktail.strDrink && (
                <div
                  className="card-body-div-nonli"
                  key={`card-title${oneCocktail._id}`}
                >
                  <h4 className="card-name-title card-title">Name:</h4>
                  <p className="card-name-p card-p">
                    {oneCocktail.strDrink}
                  </p>
                </div>
              )}
            

            {oneCocktail.strGlass && (
              <div className="card-body-div-nonli">
                <h4 className="card-glass-title card-title">Glass:</h4>

                <p className="card-glass-p card-p">{oneCocktail.strGlass}</p>
              </div>
            )}

            {oneCocktail.strCategory && (
              <div className="card-body-div-nonli">
                <h4 className="card-category-title card-title">
                  Category:
                </h4>
                <p className="card-category-p  card-p">
                  {oneCocktail.strCategory}
                </p>
              </div>
            )}
 

            {oneCocktail.arrayMeasuredIngredients && (
              <div className="card-body-div-li">
                <h4 className="card-ingredient-title card-title">
                  Ingredients:
                </h4>
                <ul className="card-ingredient-ul  card-ul">
                  {oneCocktail.arrayMeasuredIngredients.map((item, idx) => {
                    return (
                      <li
                        key={item.id}
                        className="card-ingredient-li card-li"
                      >
                        {`${item.unit ? `${item.unit} ` : ""} ${
                          item.ingredient
                        }`}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {oneCocktail.arrayInstructions && (
              <div className="card-body-div-li">
                <h4 className="card-instruction-title card-title">
                  Instructions:
                </h4>
                <ul className="card-instruction-li  card-ul">
                  {oneCocktail.arrayInstructions.map((item, idx) => {
                    return (
                      <li
                        key={item.id}
                        className="card-instruction-li card-li"
                      >
                        {item.instruction}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {oneCocktail.strNotes && (
              <>
                <h4 className="card-note-title card-title">Notes:</h4>
                <ul className="card-note-ul card-ul">
                  <li className="card-note-li  card-li">
                    {oneCocktail.strNotes}
                  </li>
                </ul>
              </>
            )}
            </div>

          </Card.Body>
        </Card>
        )}
      </div>
    </div>
  );
}
