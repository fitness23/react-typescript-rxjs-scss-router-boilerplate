import React, { useState, useEffect } from "react";
import { map } from "rxjs/operators";
import ApiService from "./services/api.service";
import './App.scss';
import { Route, Routes, NavLink } from 'react-router-dom';
import Water from './pages/Water';
import All from './pages/All';
import Add from './pages/Add';
import logo from './assets/logo.png';

interface Pokemon {
  url: string;
  name: string;
}

const App = () => {
  const [employees, setEmployees] = useState<Pokemon[]>([]);

  useEffect(() => {
    const subscription = new ApiService("/pokemon")
      .get()
      .pipe(
        map((res: any) => res.results)
      )
      .subscribe((employees: Pokemon[]) => {
        setEmployees(employees);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>

    <header id="header">

      <div id="logo"><img src={logo} /></div>

      <p>No useless To Do List examples here! Here's a proper useful <strong>async</strong> example to get you going.</p>

      <nav id="mainNav">
        <ul>
          <li>
            <NavLink to='/water'>Water Pokemon</NavLink>
          </li>
          <li>
            <NavLink to='/all'>All Pokemon</NavLink>
          </li>
          <li>
            <NavLink to='/add'>Add</NavLink>
          </li>
        </ul>
      </nav>
      
    </header>

    <Routes>
      <Route path="/water" element={<Water />} />
      <Route path="/all" element={<All />} />
      <Route path="/add" element={<Add />} />
    </Routes>
      
    </>
  );
};



export default App;
