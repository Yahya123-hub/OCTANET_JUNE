import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Herosection from './components/herosection';
import FeatureSection from './components/features';
import Workflow from './components/workflow';
import Techstack from './components/techstack';
import Benefits from './components/benefits';
import Footer from './components/footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/overview" component={Herosection} />
          <Route path="/features" component={FeatureSection} />
          <Route path="/enhancement" component={Workflow} />
          <Route path="/tech-stack" component={Techstack} />
          <Route path="/benefits" component={Benefits} />
          <Route path="/contact" component={Footer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
