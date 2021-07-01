import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/shared/Sidebar";
import Login from "./components/home/Login"
import {FormProvider} from './contexts/FormContext';
import {AuthProvider} from './contexts/AuthContext';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'; 
function App() {
  return (
    <AuthProvider>
    <FormProvider>
    <div className="container">
      <Sidebar />
      <div className="wrapper-main">
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route  path='/login' component={Login}/>
          </Switch>
        </Router>
      </div>
    </div>
    </FormProvider>
    </AuthProvider>
  );
}

export default App;
