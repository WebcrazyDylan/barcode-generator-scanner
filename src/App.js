import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from "react-router-dom";

import Home from "./pages/Home";
import Bargen from "./pages/BarcodeGenerator";
import Barscan from "./pages/BarcodeScanner";
import Barscan2 from "./pages/BarcodeScanner2";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/barcode_generator">
                <Bargen />
              </Route>
              <Route path="/barcode_scanner">
                <Barscan />
              </Route>
              <Route path="/barcode_scanner2">
                <Barscan2 />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
