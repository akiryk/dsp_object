import React from "react";
import BrowsePage from "./Browse/BrowsePage";
import ManagePage from "./Manage/ManagePage";
import OverviewPage from "./OverviewTabProducts/OverviewPage";
import ModalProvider from "./Modal/ModalProvider";
import DataSubscriptionProvider from "./DSP";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";

const logger = {
  warn() {},
  error() {},
  info() {},
  set() {}
};

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/overviewPage">Registry Overview</Link>
            </li>
            <li>
              <Link to="/browsePage">Browse With Buttons</Link>
            </li>
            <li>
              <Link to="/managePage">Manage Items</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <DataSubscriptionProvider logger={logger}>
          <Switch>
            <Route path="/overviewPage">
              <OverviewPageTab />
            </Route>
            <Route path="/browsePage">
              <BrowseTab />
            </Route>
            <Route path="/managePage">
              <ManageTab />
            </Route>
          </Switch>
          <ModalProvider />
        </DataSubscriptionProvider>
      </div>
    </Router>
  );
}

function ManageTab() {
  return (
    <div className="FavoritesButtons">
      <h2>Manage Items Example</h2>
      <ManagePage />
    </div>
  );
}

function BrowseTab() {
  return (
    <div className="FavoritesButtons">
      <h2>Browse Example</h2>
      <BrowsePage />
    </div>
  );
}

function OverviewPageTab() {
  return (
    <div className="FavoritesButtons">
      <h2>Overview Tab Example</h2>
      <OverviewPage />
    </div>
  );
}
