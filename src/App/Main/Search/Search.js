import React from "react";
import Form from "react-bootstrap/Form";
import uniqueObject from "../../../Data/UniqueArrays.js";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Search() {
  let [searchState, setSearchState] = React.useState({
    selectedName: [],
    selectedIngredient: [],
    selectedGlass: [],
    selectedCategory: [],
    selectedRandom: [],
    searchType: {
      name: false,
      category: false,
      ingredient: false,
      glass: false,
      random: false,
      clear: false,
    },
  });

  const handlerSearchType = (e) => {
    e.persist();
    // console.log(e.target.value);
    switch (e.target.value) {
      case "name":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            name: true,
            category: false,
            ingredient: false,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "ingredient":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            ...prevState.searchType,
            ingredient: !prevState.searchType.ingredient,
            name: false,
            category: false,
            random: false,
            clear: false,
          },
        }));

      case "glass":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            ...prevState.searchType,
            glass: !prevState.searchType.glass,
            name: false,
            category: false,
            random: false,
            clear: false,
          },
        }));

      case "category":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: true,
            ingredient: false,
            glass: false,
            random: false,
            clear: false,
          },
        }));

      case "random":
        return setSearchState((prevState) => ({
          ...prevState,
          searchType: {
            name: false,
            category: false,
            ingredient: false,
            glass: false,
            random: true,
            clear: false,
          },
        }));

      case "clear":
        return setSearchState((prevState) => ({
          ...prevState,
          selectedName: [],
          selectedIngredient: [],
          selectedGlass: [],
          selectedCategory: [],
          selectedRandom: [],
          searchType: {
            name: false,
            category: false,
            ingredient: false,
            glass: false,
            random: false,
            clear: true,
          },
        }));

      default:
        return;
    }
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   alert(`${kindOfStand}`);
  // };

  console.log([searchState.selectedName[0], searchState.selectedCategory[0],searchState.selectedIngredient[0],searchState.selectedGlass[0],searchState.selectedRandom[0]]);

  return (
    <div className="search-container">
      <p>
        Search advise: Start with one criteria. If no results, check spelling
        and unselect one or more criteria.
      </p>
      <Form>
        {Object.entries(searchState.searchType).map((pair, idx) => {
          return (
            <Form.Check
              key={idx}
              type="radio"
              id="default-radio"
              label={`${pair[0]}`}
              onClick={handlerSearchType}
              value={`${pair[0]}`}
              checked={pair[1]}
              inline
            />
          );
        })}

        {searchState.searchType.name && (
          <Typeahead
            placeholder="Cocktail name?"
            id="name-search"
            onChange={(selected) => {
              setSearchState((prevState) => ({
                ...prevState,
                selectedName: selected,
              }));
            }}
            options={uniqueObject.uniqueNames}
            selected={searchState.selectedName}
          />
        )}

        {searchState.searchType.category && (
          <Typeahead
            placeholder="Cocktail category?"
            id="cocktail-search"
            onChange={(selected) => {
              setSearchState((prevState) => ({
                ...prevState,
                selectedCategory: selected,
              }));
            }}
            options={uniqueObject.uniqueCategories}
            selected={searchState.selectedCategory}
          />
        )}

        {searchState.searchType.ingredient && (
          <Typeahead
            placeholder="Cocktail ingredient?"
            id="ingredient-search"
            onChange={(selected) => {
              setSearchState((prevState) => ({
                ...prevState,
                selectedIngredient: selected,
              }));
            }}
            options={uniqueObject.uniqueIngredients}
            selected={searchState.selectedIngredient}
          />
        )}

        {searchState.searchType.glass && (
          <Typeahead
            placeholder="Glass type?"
            id="glass-search"
            onChange={(selected) => {
              setSearchState((prevState) => ({
                ...prevState,
                selectedGlass: selected,
              }));
            }}
            options={uniqueObject.uniqueGlasses}
            selected={searchState.selectedGlass}
          />
        )}

        {searchState.searchType.random && (
          <Typeahead
            placeholder="How many?"
            id="random-search"
            onChange={(selected) => {
              setSearchState((prevState) => ({
                ...prevState,
                selectedRandom: selected,
              }));
            }}
            options={uniqueObject.uniqueRandom}
            selected={searchState.selectedRandom}
          />
        )}
      </Form>
    </div>
  );
}
