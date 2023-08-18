import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Update(props) {
  let navigate = useNavigate();
  let { getIdTokenClaims } = useAuth0();

  const [stateUpdate, setStateUpdate] = React.useState({
    ...props.reviewCocktail,
  });

  const submitCocktail = (e) => {
    e.preventDefault();


    //formate results from form into object to be put or posted
    let _id = stateUpdate._id || null;
    let idDrink = stateUpdate.idDrink;
    let strDrink = e.target.strDrinkInput.value;
    let strGlass = e.target.strGlassInput.value;
    let strDrinkThumb = stateUpdate.strDrinkThumb;
    let strNotes = e.target.strNotesInput.value;

    let arrayInstructions = [];
    arrayInstructions =
      updateArray(e, "instruction") ||
      stateUpdate.arrayInstructions.forEach((item) =>
        arrayInstructions.push(item)
      );

    let arrayMeasuredIngredients = [];
    arrayMeasuredIngredients =
      updateArray(e, "ingredient") ||
      stateUpdate.arrayMeasuredIngredients.forEach((item) =>
        arrayMeasuredIngredients.push(item)
      );

    let formatedCocktail = {
      idDrink: idDrink,
      strDrink: strDrink,
      strGlass: strGlass,
      strDrinkThumb: strDrinkThumb,
      arrayInstructions: arrayInstructions,
      arrayMeasuredIngredients: arrayMeasuredIngredients,
      strNotes: strNotes,
    };

    let method = _id ? "put" : "post";
    let url = _id ? `/updateCocktail/${_id}` : `/createCocktail`;
    if (_id) {
      formatedCocktail["_id"] = _id;
    }

    // console.log(formatedCocktail, method, url);
    //make put or post request
    getIdTokenClaims()
      .then((res) => {
        let jwt = res.__raw;
        let userEmail = res.email;
        formatedCocktail['strUserEmail']=userEmail;
        let config = {
          headers: { authorization: `Bearer ${jwt}`, email: `${userEmail}` },
          method: method,
          data: formatedCocktail,
          baseURL: process.env.REACT_APP_SERVER,
          url: url,
        };
        // console.log(formatedCocktail,config);
        axios(config)
          .then((res) => {
            let savedCocktail = res.data;
            props.dispatch({
              type: "updateRevewCocktail",
              payload: { value: savedCocktail },
            });
            navigate("/review");
          })
          .catch((err) => {
            //TODO: handle error when request fails
          });
      })
      .catch((err) => {
        //TODO: handle error when auth0 token request fails
      });

    // this.props.closeEditForm();
  };

  const updateArray = (e, string) => {
    let returnArray = [];
    for (let i = 0; i < 1000; i++) {
      if (e.target[`${string}${i}Input`]) {
        returnArray.push(e.target[`${string}${i}Input`].value);
      } else {
        break;
      }
    }
    return returnArray;
  };

  // console.log(stateUpdate);
  // console.log(props.reviewCocktail);
  return (
    <div className="update-container">
      <Card className="update-card" style={{ width: "30rem" }}>
        <Card.Img variant="top" src={stateUpdate.strDrinkThumb} />
        <Card.Body>
          <h3>Customize your cocktail recipe!</h3>

          <Form onSubmit={(e) => submitCocktail(e)}>
            <Card.Title className="card-title">
              <Form.Group className="mb-3" controlId="strDrinkInput">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" defaultValue={stateUpdate.strDrink} />
              </Form.Group>
            </Card.Title>

            <div>
              <div className="update-head">
                <Form.Group className="mb-3" controlId="strGlassInput">
                  <Form.Label>Serving Container:</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={stateUpdate.strGlass}
                  />
                </Form.Group>
              </div>

              <div className="update-list">
                <h4>Instructions:</h4>
                <AiOutlinePlusCircle
                  onClick={() =>
                    setStateUpdate((prevState) => ({
                      ...prevState,
                      arrayInstructions: prevState.arrayInstructions.concat([
                        "",
                      ]),
                    }))
                  }
                />
                {stateUpdate.arrayInstructions && (
                  <ul>
                    {stateUpdate.arrayInstructions.map((instruction, idx) => {
                      return (
                        <li className="instruction-li" key={idx}>
                          <Form.Group
                            key={idx}
                            className="mb-3 instruction-field"
                            controlId={`instruction${idx}Input`}
                          >
                            <Form.Label>{idx + 1}:</Form.Label>
                            <Form.Control
                              className="instruction-control"
                              type="text"
                              defaultValue={instruction}
                            />
                          </Form.Group>
                          <AiOutlinePlusCircle
                            onClick={() =>
                              setStateUpdate((prevState) => ({
                                ...prevState,
                                arrayInstructions: [
                                  ...prevState.arrayInstructions.slice(
                                    0,
                                    idx + 1
                                  ),
                                  ...[""],
                                  ...prevState.arrayInstructions.slice(idx + 1),
                                ],
                              }))
                            }
                          />
                          <AiOutlineMinusCircle
                            onClick={() => {
                              setStateUpdate((prevState) => ({
                                ...prevState,
                                arrayInstructions:
                                  prevState.arrayInstructions.filter(
                                    (item, index) => idx !== index
                                  ),
                              }));
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="update-list">
                <h4>Ingredients:</h4>
                <AiOutlinePlusCircle
                  onClick={() =>
                    setStateUpdate((prevState) => ({
                      ...prevState,
                      arrayMeasuredIngredients:
                        prevState.arrayMeasuredIngredients.concat([""]),
                    }))
                  }
                />
                {stateUpdate.arrayMeasuredIngredients && (
                  <ul>
                    {stateUpdate.arrayMeasuredIngredients.map(
                      (ingredient, idx) => {
                        return (
                          <li className="ingredient-li" key={idx}>
                            <Form.Group
                              key={idx}
                              className="mb-3 ingredient-field"
                              controlId={`ingredient${idx}Input`}
                            >
                              <Form.Label>{idx + 1}:</Form.Label>
                              <Form.Control
                                className="ingredient-control"
                                type="text"
                                defaultValue={ingredient}
                              />
                            </Form.Group>
                            <AiOutlinePlusCircle
                              onClick={() =>
                                setStateUpdate((prevState) => ({
                                  ...prevState,
                                  arrayMeasuredIngredients: [
                                    ...prevState.arrayMeasuredIngredients.slice(
                                      0,
                                      idx + 1
                                    ),
                                    ...[""],
                                    ...prevState.arrayMeasuredIngredients.slice(
                                      idx + 1
                                    ),
                                  ],
                                }))
                              }
                            />
                            <AiOutlineMinusCircle
                              onClick={() => {
                                setStateUpdate((prevState) => ({
                                  ...prevState,
                                  arrayMeasuredIngredients:
                                    prevState.arrayMeasuredIngredients.filter(
                                      (item, index) => idx !== index
                                    ),
                                }));
                              }}
                            />
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}
              </div>

              <Form.Group className="mb-3" controlId="strNotesInput">
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  defaultValue={stateUpdate.strNotes}
                />
              </Form.Group>
            </div>

            <div className="recipe-buttons-container">
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="primary" onClick={() => navigate("/review")}>
                Discard
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
