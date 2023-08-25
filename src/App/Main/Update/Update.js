import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import nanoid from "nanoid";

export default function Update(props) {
  let navigate = useNavigate();

  const [stateUpdate, setStateUpdate] = React.useState({
    ...props.reviewCocktail,
  });

  // React.useEffect(() => {
  //   // console.log("update page: on load ");
  //   setStateUpdate({...props.reviewCocktail});
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);

  return (
    <div className="update-container">
      <Card className="update-card" style={{ width: "30rem" }}>
        <Card.Img variant="top" src={stateUpdate.strDrinkThumb} />
        <Card.Body>
          <h3>Customize your cocktail recipe!</h3>

          <Form onSubmit={(e) => props.submitUpdatedCocktail(e,stateUpdate)}>
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

              <div className="update-second-head">
                <Form.Group className="mb-3" controlId="strCategoryInput">
                  <Form.Label>Category:</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={stateUpdate.strCategory}
                  />
                </Form.Group>
              </div>

              <div className="update-list">
                <h4>Ingredients:</h4>

                <ul>
                  {stateUpdate.arrayMeasuredIngredients.map(
                    (ingredient, idx) => {
                      return (
                        <li className="ingredient-li" key={ingredient.id}>
                            <AiOutlinePlusCircle
                              onClick={() =>
                                setStateUpdate((prevState) => ({
                                  ...prevState,
                                  arrayMeasuredIngredients: [
                                    ...prevState.arrayMeasuredIngredients.slice(
                                      0,
                                      idx
                                    ),
                                    ...[
                                      {
                                        id: nanoid(),
                                        unit: "",
                                        ingredient: "",
                                      },
                                    ],
                                    ...prevState.arrayMeasuredIngredients.slice(
                                      idx
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
                                      (item, index) => {
                                        // console.log(idx, index);
                                        return idx !== index;
                                      }
                                    ),
                                }));
                              }}
                            />
                          <Form.Group
                            key={`measurement${ingredient.id}`}
                            className="mb-3 ingredient-field"
                            controlId={`measurement${ingredient.id}Input`}
                          >
     
                            <Form.Label>{idx + 1}:</Form.Label>

                            <Form.Control
                              className="ingredient-control"
                              type="text"
                              defaultValue={ingredient.unit}
                            />
                          </Form.Group>
                          <Form.Group
                            key={`ingredient${idx}`}
                            className="mb-3 ingredient-field"
                            controlId={`ingredient${ingredient.id}Input`}
                          >
                            <Form.Control
                              className="ingredient-control"
                              type="text"
                              defaultValue={ingredient.ingredient}
                            />
                          </Form.Group>
                        </li>
                      );
                    }
                  )}
                </ul>
                <AiOutlinePlusCircle
                  onClick={() =>
                    setStateUpdate((prevState) => ({
                      ...prevState,
                      arrayMeasuredIngredients:
                        prevState.arrayMeasuredIngredients.concat([
                          { id: nanoid(), unit: "", ingredient: "" },
                        ]),
                    }))
                  }
                />
              </div>

              <div className="update-list">
                <h4>Instructions:</h4>

                <ul>
                  {stateUpdate.arrayInstructions.map((instruction, idx) => {
                    return (
                      <li
                        className="instruction-li"
                        key={`li${instruction.id}`}
                      >
                          <AiOutlinePlusCircle
                            onClick={() =>
                              setStateUpdate((prevState) => ({
                                ...prevState,
                                arrayInstructions: [
                                  ...prevState.arrayInstructions.slice(0, idx),
                                  ...[{ id: nanoid(), instruction: "" }],
                                  ...prevState.arrayInstructions.slice(idx),
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
                        <Form.Group
                          key={`instruction form ${instruction.id}`}
                          className="mb-3 instruction-field"
                          controlId={`instruction${instruction.id}Input`}
                        >

                          <Form.Label>{idx + 1}:</Form.Label>
  
                          <Form.Control
                            className="instruction-control"
                            type="text"
                            defaultValue={instruction.instruction}
                          />
                        </Form.Group>
                      </li>
                    );
                  })}
                </ul>
                <AiOutlinePlusCircle
                  onClick={() =>
                    setStateUpdate((prevState) => ({
                      ...prevState,
                      arrayInstructions: prevState.arrayInstructions.concat([
                        { id: nanoid(), instruction: "" },
                      ]),
                    }))
                  }
                />
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
