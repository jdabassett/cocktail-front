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
      <Card className="card update-card">
        <div className="card-image-container update-card-image-container">
          <Card.Img
            className="card-image update-card-image"
            variant="top"
            src={stateUpdate.strDrinkThumb}
          />
        </div>
        <Card.Body className="card-body">
          <Form onSubmit={(e) => props.submitUpdatedCocktail(e, stateUpdate)}>
            <div className="form-group-container update-name">
              <Form.Group className="form-group mb-3" controlId="strDrinkInput">
                <Form.Label className="form-label">Name:</Form.Label>
                <Form.Control
                  className="form-control rounded-0"
                  type="text"
                  defaultValue={stateUpdate.strDrink}
                />
              </Form.Group>
            </div>

            <div className="form-group-container update-glass">
              <Form.Group className="form-group mb-3" controlId="strGlassInput">
                <Form.Label className="form-label">Container:</Form.Label>
                <Form.Control
                  className="form-control rounded-0"
                  type="text"
                  defaultValue={stateUpdate.strGlass}
                />
              </Form.Group>
            </div>

            <div className="form-group-container update-category">
              <Form.Group
                className="form-group mb-3"
                controlId="strCategoryInput"
              >
                <Form.Label className="form-label">Category:</Form.Label>
                <Form.Control
                  className="form-control rounded-0"
                  type="text"
                  defaultValue={stateUpdate.strCategory}
                />
              </Form.Group>
            </div>

            <div className="form-group-container update-ingredient">
              <h4 className="form-list-title">Ingredients:</h4>

              <ul className="form-list-ul update-form-list-ul-ingredient">
                {stateUpdate.arrayMeasuredIngredients.map((ingredient, idx) => {
                  return (
                    <li className="form-list-li" key={ingredient.id}>
                      <Form.Group
                        key={`measurement${ingredient.id}`}
                        className="mb-3 form-group measurement-group"
                        controlId={`measurement${ingredient.id}Input`}
                      >
                        <AiOutlinePlusCircle
                          className="form-plus-circle form-circle"
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
                          className="form-minus-circle  form-circle"
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
                        <Form.Label className="form-label measurement-label">
                          {idx + 1}:
                        </Form.Label>

                        <Form.Control
                          className="form-control measurement-control rounded-0"
                          type="text"
                          defaultValue={ingredient.unit}
                        />
                      </Form.Group>
                      <Form.Group
                        key={`ingredient${idx}`}
                        className="mb-3 form-group ingredient-group"
                        controlId={`ingredient${ingredient.id}Input`}
                      >
                        <Form.Control
                          className="form-control ingredient-control rounded-0"
                          type="text"
                          defaultValue={ingredient.ingredient}
                        />
                      </Form.Group>
                    </li>
                  );
                })}
                <li className="form-list-li update-form-list-li-instruction li-circle">
                    <AiOutlinePlusCircle
                    className="form-plus-circle-final  form-circle"
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
                </li>
              </ul>
            </div>

            <div className="form-group-container update-instruction">
              <h4 className="form-list-title">Instructions:</h4>

              <ul className="form-list-ul update-form-list-ul-instruction">
                {stateUpdate.arrayInstructions.map((instruction, idx) => {
                  return (
                    <li
                      className="form-list-li update-form-list-li-instruction"
                      key={`li${instruction.id}`}
                    >
                      <Form.Group
                        key={`instruction form ${instruction.id}`}
                        className="form-group mb-3 instruction-group"
                        controlId={`instruction${instruction.id}Input`}
                      >
                        <AiOutlinePlusCircle
                          className="form-plus-circle  form-circle"
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
                          className="form-minus-circle  form-circle"
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
                        <Form.Label className="form-label instruction-label">
                          {idx + 1}:
                        </Form.Label>

                        <Form.Control
                          className="form-control instruction-control rounded-0"
                          type="text"
                          defaultValue={instruction.instruction}
                        />
                      </Form.Group>
                    </li>
                  );
                })}
                <li className="form-list-li update-form-list-li-instruction li-circle">
                  <AiOutlinePlusCircle
                    className="form-plus-circle-final  form-circle"
                    onClick={() =>
                      setStateUpdate((prevState) => ({
                        ...prevState,
                        arrayInstructions: prevState.arrayInstructions.concat([
                          { id: nanoid(), instruction: "" },
                        ]),
                      }))
                    }
                  />
                </li>
              </ul>
            </div>

            <div className="form-group-container note-container">
              <Form.Group
                className="form-group mb-3 note-group"
                controlId="strNotesInput"
              >
                <Form.Label className="form-label note-control">
                  Notes:
                </Form.Label>
                <Form.Control
                  className="form-control rounded-0 note-control"
                  as="textarea"
                  rows={5}
                  defaultValue={stateUpdate.strNotes}
                />
              </Form.Group>
            </div>

            <div className="card-button-container">
              <Button
                className="save-button dark-button rounded-0"
                variant="light"
                type="submit"
              >
                Save
              </Button>
              <Button
                className="delete-button dark-button rounded-0"
                variant="light"
                onClick={() => navigate("/review")}
              >
                Discard
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
