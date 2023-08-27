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
        className="card">
        <div 
          className="card-image-container">
          <Card.Img 
            variant="top" 
            className="card-image"
            src={viewCocktail.strDrinkThumb} />
        </div>
        <Card.Body
          className="card-body">
          <div>
             {viewCocktail.strDrink && 
             <div className="card-body-div-nonli">
                <h4 
                  className="card-name-title card-title">Name:</h4>
                  <p
                    className="card-name-p card-p">{viewCocktail.strDrink}</p>
              </div>}
            {/* if there is a glass add here... */}
            {viewCocktail.strGlass && (
              <div className="card-body-div-nonli">
                <h4 
                  className="card-glass-title card-title">Glass:</h4>
              
                  <p
                    className="card-glass-p card-p">{viewCocktail.strGlass}</p>
              </div>
            )}
            {/* if there is a category add here... */}
            {viewCocktail.strCategory && (
              <div className="card-body-div-nonli">
                <h4 
                  className="card-category-title card-title">Category:</h4>
                  <p
                    className="card-category-p  card-p">
                    {viewCocktail.strCategory}
                  </p>
              </div>
            )}
            {/* if there are ingredients display... */}
            {viewCocktail.arrayMeasuredIngredients && (
            <div className="card-body-div-li">
                <h4 
                  className="card-ingredient-title card-title">Ingredients:</h4>
                <ul
                  className="card-ingredient-ul  card-ul">
                  {viewCocktail.arrayMeasuredIngredients.map((item, idx) => {
                    return (
                      <li 
                        key={item.id} 
                        className="card-ingredient-li card-li">
                        {`${item.unit?`${item.unit} `:""} ${item.ingredient}`}
                      </li>
                    );
                  })}
                </ul>
              </div>)}
            {/* if there are instructions display... */}
            {viewCocktail.arrayInstructions && (
              <div className="card-body-div-li">
                <h4 
                  className="card-instruction-title card-title">Instructions:</h4>
                <ul
                  className="card-instruction-li  card-ul">
                  {viewCocktail.arrayInstructions.map((item, idx) => {
                    return (
                      <li 
                        key={item.id} 
                        className="card-instruction-li card-li">
                        {item.instruction}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* if there are notes display here... */}
            {viewCocktail.strNotes && (
              <>
                <h4 className="card-note-title card-title">Notes:</h4>
                <ul
                  className="card-note-ul card-ul">
                  <li 
                    className="card-note-li  card-li">{viewCocktail.strNotes}</li>
                </ul>
              </>
            )}
          </div>
          <div className="card-button-container">
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
