import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage"
import DetailVideoPage from "./views/DetailVideoPage/DetailVideoPage"
import EditVideoPage from "./views/EditVideoPage/EditVideoPage"
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"
import EditVideoPage from "./views/EditVideoPage/EditVideoPage"
import ResultPage from "./views/ResultPage/ResultPage"

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(DetailVideoPage, null)} />
          {/* <Route exact path="/video/:videoId" component={Auth(EditVideoPage, null)} /> */}
          <Route exact path="/edit/:videoId" component={Auth(EditVideoPage, null)} />
          <Route exact path="/result/:videoId" component={Auth(ResultPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}




export default App;
