import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import oneCocktail from "../../../Data/data_one-cocktail.json";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useNavigate } from "react-router-dom";

export default function Review(props) {
  let navigate = useNavigate();

  let viewCocktail = props.reviewCocktail || oneCocktail;
  // console.log(props.reviewCocktail);
  // console.log(props.userCocktails);
  return (
    <div className="review-container">
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src={viewCocktail.strDrinkThumb} />
        <Card.Body>
          <Card.Title className="reviewCardTitle">{`Name: ${viewCocktail.strDrink}`}</Card.Title>
          <div>
            {/* if there is a glass add here... */}
            {viewCocktail.strGlass && (
              <>
                <h4 className="reviewGlass H4">Glass:</h4>
                <ul>
                  <li className="reviewGlassLi">{viewCocktail.strGlass}</li>
                </ul>
              </>
            )}
            {/* if there is a category add here... */}
            {viewCocktail.strCategory && (
              <>
                <h4 className="reviewCategory H4">Category:</h4>
                <ul>
                  <li className="reviewCategoryLi">
                    {viewCocktail.strCategory}
                  </li>
                </ul>
              </>
            )}
            {/* if there are ingredients display... */}
            {viewCocktail.arrayMeasuredIngredients && (
              <>
                <h4 className="reviewIngredients H4">Ingredients:</h4>
                <ul>
                  {viewCocktail.arrayMeasuredIngredients.map((item, idx) => {
                    return (
                      <li key={idx} className="reviewIngredientsLi">
                        {item.replace("_", " ")}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {/* if there are instructions display... */}
            {viewCocktail.arrayInstructions && (
              <>
                <h4 className="reviewInstructions H4">Instructions:</h4>
                <ul>
                  {viewCocktail.arrayInstructions.map((item, idx) => {
                    return (
                      <li key={idx} className="reviewInstructionLi">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {/* if there are notes display here... */}
            {viewCocktail.strNotes && (
              <>
                <h4 className="reviewNotes H4">Notes:</h4>
                <ul>
                  <li className="reviewNotesLi">{viewCocktail.strNotes}</li>
                </ul>
              </>
            )}
          </div>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip">
                Click button to save cocktail to your personal records.
              </Tooltip>
            }
          >
            <Button
              variant="primary"
              onClick={() => props.submitReviewCocktail()}
            >
              Save
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip">
                Click button to edit record before anything else.
              </Tooltip>
            }
          >
            <Button variant="primary" onClick={() => navigate("/update")}>
              Edit
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    </div>
  );
}
