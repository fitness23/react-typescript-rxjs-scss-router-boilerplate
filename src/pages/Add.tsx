import React, { useState, useEffect } from "react";
import ApiService from "../services/api.service";
import './Add.scss';
import { Body } from "../utils/types";

interface Pokemon {
  url: string;
  name: string;
}

const Add = () => {

  const [creatures, setCreatures] = useState<Pokemon[]>([]);

  const addPokemon = (event: React.MouseEvent) => {
    event.preventDefault();
    const creature: Pokemon = {
      url: "http://www.myurl.com",
      name: "My Pokemon Name"
    };
    new ApiService("/create", (creature as unknown) as Body)
      .post()
      .subscribe((r) => {
        setCreatures([creature, ...creatures]);
      });
  };

  return (
    <>
      <p>Press below button to send some data to a POST api.</p>
      <p>The Pokeapi doesn't allow adding, but check your Network tab to see the request being sent.</p>
      <button className="addButton" type="button" onClick={addPokemon}>Add a Pokemon</button>
    </>
  );
};

export default Add;