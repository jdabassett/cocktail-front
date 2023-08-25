import React from 'react';
import UniqueObject from '../../../Data/UniqueArrays.js';
import Carousel from "react-bootstrap/Carousel";
// import image from '../../../images/';

export default function Landing () {

  let userVerb = <div className="user-verb-container"><h1 className="user-verb">deplorable</h1></div>;

  React.useEffect(() => {
    const interval = setInterval(() => {
      userVerb=generateLandingTitle(UniqueObject.uniqueUserVerbs);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  const generateLandingTitle = (arrayStrings) => {
    let randomIndex = Math.floor(Math.random()*arrayStrings.length);
    console.log('landing page: generateLandingTitle Triggered');
    return (<div className="user-verb-container"><h1 className="user-verb">{arrayStrings[randomIndex]}</h1></div>)
  }

  let imageElements = UniqueObject.imagesAndAttribution
      .sort((a, b) => 0.5 - Math.random())
      .map((object, idx) => {
        return (
          <Carousel.Item key={idx} interval={`${500+(15000 * Math.random())}`}>
            <img
              className="d-block w-100 landing-image"
              src={require(`../../../images/${object.image}`)}
              alt={object.author}
              // onClick={() => this.props.handlerAttribution(object, true)}
            />
            <Carousel.Caption>
            <h1 className="landing-title">i made this site for all you {userVerb} cocktail lovers.</h1> <h1 className="landing-title">enjoy yourselves!</h1>
            </Carousel.Caption>

          </Carousel.Item>
        );
      });

  return (
    <div className="landing-container">
      
      {/* <div className="landing-title-container">
      <h1 className="landing-title">i made this site for all you {generateLandingTitle(UniqueObject.uniqueUserVerbs)} cocktail lovers.</h1> <h1 className="landing-title">enjoy yourselves!</h1>
      </div> */}

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