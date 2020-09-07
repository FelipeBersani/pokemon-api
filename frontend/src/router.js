import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Pokemon from './pages/Pokemon';

export default function Routes(){
    return(
        <BrowserRouter>{/* Gerencia as rotas */}
            <Switch> {/* Garante que uma rota somente será chamada*/}
                <Route path="/" exact component={Home} />
                <Route path="/pokemon/:id" exact component={Pokemon} />
            </Switch>
        </BrowserRouter>
    );
}