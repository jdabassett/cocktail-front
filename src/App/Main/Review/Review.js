
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import oneCocktail from '../../../Data/data_one-cocktail.json';

export default function Review (props) {

  let viewCocktail = props.reviewCocktail || oneCocktail;
  // console.log(props.reviewCocktail);
  return (
    <div className="review-container">
      <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={viewCocktail.strDrinkThumb} />
        <Card.Body>
          <Card.Title className="reviewCardTitle">{viewCocktail.strDrink}</Card.Title>
          <div>
            {/* if there is a glass add here... */}
            {viewCocktail.arrayMeasuredIngredients &&
              <>
                <h4 className="reviewGlassH4">Glass:</h4>
                <ul>
                  <li className="reviewGlassLi">{viewCocktail.strGlass}</li>
                </ul>
              </>}
            {/* if there are ingredients display... */}
            {viewCocktail.arrayMeasuredIngredients &&
              <>
                <h4 className="reviewIngredientsH4">Ingredients:</h4>
                <ul>
                {viewCocktail.arrayMeasuredIngredients.map((item,idx)=>{
                return <li key={idx} className="reviewIngredientsLi">{item}</li>})}
                </ul>
              </>}
            {/* if there are instructions display... */}
            {viewCocktail.arrayInstructions &&
              <>
                <h4 className="reviewInstructionsH4">Instructions:</h4>
                <ul>
                {viewCocktail.arrayInstructions.map((item,idx)=>{
                return <li key={idx} className="reviewInstructionLi">{item}</li>})}
                </ul>
              </>}
              {/* if there are notes display here... */}
              {viewCocktail.strNotes &&
              <>
                <h4 className="reviewNotesH4">Notes:</h4>
                <ul>
                  <li className="reviewNotesLi">{viewCocktail.strNotes}</li>
                </ul>
              </>}
          </div>
          <Button variant="primary">Save</Button>
          <Button variant="primary">Edit</Button>
        </Card.Body>
      </Card>
    </div>
  )
}