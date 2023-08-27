import React from 'react';
import UniqueObject from '../../../Data/UniqueArrays.js';
import Carousel from "react-bootstrap/Carousel";
// import image from '../../../images/';

export default function Landing () {

  // let userVerb = <div className="user-verb-container"><h1 className="user-verb">deplorable</h1></div>;

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     userVerb=generateLandingTitle(UniqueObject.uniqueUserVerbs);
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);


  const generateLandingTitle = (arrayStrings,arrayColors) => {
    let randomIndex = Math.floor(Math.random()*arrayStrings.length);
    let randomColorIndex = Math.floor(Math.random()*arrayColors.length);
    // console.log(randomColorIndex);
    // console.log('landing page: generateLandingTitle Triggered');
    return (<div className="user-verb-container"><h1 style={{color:`${arrayColors[randomColorIndex]}`}} className="user-verb  landing-text">{`{${arrayStrings[randomIndex]}}`}</h1></div>)
  }

  let imageElements = UniqueObject.imagesAndAttribution
      .sort((a, b) => 0.5 - Math.random())
      .map((object, idx) => {
        return (
          <Carousel.Item className="carousel-item" key={idx} interval={`${4000+(4000 * Math.random())}`}>
            <img
              className="landing-image"
              src={require(`../../../images/${object.image}`)}
              alt={object.author}
              // onClick={() => this.props.handlerAttribution(object, true)}
            />
            <Carousel.Caption className="landing-carousel-caption">
            <h1 className="landing-title landing-text">i made this site for all you  {generateLandingTitle(UniqueObject.uniqueUserVerbs,UniqueObject.colorsUserVerb)} cocktail lovers.</h1> <h1 className="landing-title landing-text">enjoy yourselves!</h1>
            </Carousel.Caption>

          </Carousel.Item>
        );
      });

  return (
    <div className="landing-container">
      

      <Carousel
          className="landing-carousel"
          indicators={false}
          controls={false}
          fade
        >
          {imageElements}
        </Carousel>



    </div>
  )
}