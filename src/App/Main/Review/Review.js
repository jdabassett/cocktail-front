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
  // console.log("review page",props.reviewCocktail);
  // console.log("review page",props.userCocktails);
  return (
    <div 
      className="review-container">
      <Card 
        className="review-card">
        <div 
          className="review-card-image-container">
          <Card.Img 
            variant="top" 
            className="review-card-image"
            src={viewCocktail.strDrinkThumb} />
        </div>
        <Card.Body
          className="review-card-body">
          <Card.Title 
            className="review-card-title">{`Name: ${viewCocktail.strDrink}`}</Card.Title>
          <div>
            {/* if there is a glass add here... */}
            {viewCocktail.strGlass && (
              <>
                <h4 
                  className="review-card-glass-title">Glass:</h4>
                <ul
                  className="review-card-glass-ul">
                  <li 
                    className="review-card-glass-li">{viewCocktail.strGlass}</li>
                </ul>
              </>
            )}
            {/* if there is a category add here... */}
            {viewCocktail.strCategory && (
              <>
                <h4 
                  className="review-card-category-title">Category:</h4>
                <ul
                  className="review-card-category-ul">
                  <li 
                    className="review-card-category-li">
                    {viewCocktail.strCategory}
                  </li>
                </ul>
              </>
            )}
            {/* if there are ingredients display... */}

                <h4 
                  className="review-card-ingredient-title">Ingredients:</h4>
                <ul
                  className="review-card-ingredient-ul">
                  {viewCocktail.arrayMeasuredIngredients.map((item, idx) => {
                    return (
                      <li 
                        key={item.id} 
                        className="review-card-ingredient-li">
                        {`${item.unit?`${item.unit} `:""} ${item.ingredient}`}
                      </li>
                    );
                  })}
                </ul>

            {/* if there are instructions display... */}
            {viewCocktail.arrayInstructions && (
              <>
                <h4 
                  className="review-card-instruction-title">Instructions:</h4>
                <ul
                  className="review-card-instruction-li">
                  {viewCocktail.arrayInstructions.map((item, idx) => {
                    return (
                      <li 
                        key={item.id} 
                        className="review-card-instruction-li">
                        {item.instruction}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {/* if there are notes display here... */}
            {viewCocktail.strNotes && (
              <>
                <h4 className="review-card-note-title">Notes:</h4>
                <ul
                  className="review-card-note-ul">
                  <li 
                    className="review-card-note-li">{viewCocktail.strNotes}</li>
                </ul>
              </>
            )}
          </div>
          <div className="review-card-button-container">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip 
                  id="button-tooltip">
                  Click button to save cocktail to your personal records.
                </Tooltip>
              }
            >
              <Button
                variant="light"
                className="dark-button save-button rounded-0"
                onClick={() => props.submitReviewCocktail(viewCocktail)}
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
              <Button 
                className="dark-button edit-button rounded-0"
                variant="light" 
                onClick={() => navigate("/update")}>
                Edit
              </Button>
            </OverlayTrigger>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
