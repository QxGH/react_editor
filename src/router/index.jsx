import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Editor from '../page/editor'
import Copy from '../page/copy';
import Copy2 from '../page/copy2';
import Copy3 from '../page/copy3';

const RouterConfig = () => (
 <HashRouter>
   <Switch>
     <Route exact path="/" component={Editor}></Route>
     <Route exact path="/copy" component={Copy}></Route>
     <Route exact path="/copy2" component={Copy2}></Route>
     <Route exact path="/copy3" component={Copy3}></Route>
   </Switch>
 </HashRouter> 
)

export default RouterConfig;