import React, { useState, useEffect } from "react";
import { map } from "rxjs/operators";
import ApiService from "../services/api.service";
import './All.scss';

interface Pokemon {
  url: string;
  name: string;
}

const All = () => {

  const [creatures, setCreatures] = useState<Pokemon[]>([]);

  useEffect(() => {
    const subscription = new ApiService("/pokemon")
      .get()
      .pipe(
        map((res: any) => res.results)
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
      <h1>Here are All Pokemon:</h1>
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
  
export default All;
  