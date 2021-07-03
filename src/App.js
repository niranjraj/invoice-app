import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/shared/Sidebar";
import Login from "./pages/Login";
import { FormProvider } from "./contexts/FormContext";
import { InvoiceProvider } from "./contexts/InvoiceContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./pages/Loading";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
function App() {
  const { loading, user } = useAuth();
  return (
    <FormProvider>
      <div className="container">
        <Sidebar />
        <div className="wrapper-main">
          {loading ? (
            <Loading />
          ) : (
            <Router>
              <Switch>
                <InvoiceProvider>
                  <PrivateRoute exact path="/" component={Home} />
                </InvoiceProvider>
                <Route exact path="/login" component={Login} />
              </Switch>
            </Router>
          )}
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
