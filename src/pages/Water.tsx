import React, { useState, useEffect } from "react";
import { map } from "rxjs/operators";
import ApiService from "../services/api.service";
import './Water.scss';

interface Pokemon {
  url: string;
  name: string;
}

const Water = () => {

  const [creatures, setCreatures] = useState<Pokemon[]>([]);

  useEffect(() => {
    const subscription = new ApiService("/type/5")
      .get()
      .pipe(
        map((clients: any) => clients.pokemon.map((client: any) => client.pokemon))
      )
      .subscribe((creatures: Pokemon[]) => {
        setCreatures(creatures);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
    <h1>Here are all the Water based Pokemon:</h1>
      <ol>
        {creatures.map((e) => (
          <li key={e.url} className="pokemonItem">
            {e.name}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Water;