import React from 'react';
import { Home, NotFound } from 'pages';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import AnimatedSwitch from 'components/AnimatedSwitch';
import { NavigationWrapper, NotifyWrapper } from 'components';
import { ModelWrapper } from 'components/wrappers/ModelWrapper';

const HomeModel = () => (
  <ModelWrapper>
    <Home />
  </ModelWrapper>
)

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <NotifyWrapper>
        <NavigationWrapper>
          <AnimatedSwitch>
            <Route exact path={`/`} component={HomeModel} />
            <Route exact path={`/home`} component={HomeModel} />
            <Redirect from='/' exact to={`/404`} />
            <Route component={NotFound} />
          </AnimatedSwitch>
        </NavigationWrapper>
      </NotifyWrapper>
    </BrowserRouter>
  );
}

export default App;
