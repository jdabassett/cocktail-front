import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Update(props) {
  let navigate = useNavigate();


  const [stateUpdate, setStateUpdate] = React.useState({...props.reviewCocktail});




  return (
    <div className="update-container">
      <Card className="update-card" style={{ width: "30rem" }}>
        <Card.Img variant="top" src={stateUpdate.strDrinkThumb} />
        <Card.Body>
          <h3>Customize your cocktail recipe!</h3>

          <Form onSubmit={(e) => props.submitUpdatedCocktail(e)}>
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
