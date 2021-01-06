import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import DashBoard from './views/DashBoard/DashBoard';
import BookAll from './views/Book/BookAll';
import BookWithTag from './views/Book/BookWithTag'
import BookDetail from './views/Book/BookDetail';
import CourseDetail from './views/Course/CourseDetail';
import ErrorPage from './views/Error/ErrorPage';

const App = () => {
  return (
    <Router>
       <Switch>
         <Route path="/" exact component={Home}/>
         <Route path="/login/ad" exact component={Login}/>
         <Route path="/dashboard" exact component={DashBoard}/>
         <Route path="/ebooks/category" exact component={BookAll}/>
         <Route path="/ebooks/category/:nameTag" exact component={BookWithTag}/>
         <Route path="/book/:name" exact component={BookDetail}/>
         <Route path="/course/:name" exact component={CourseDetail}/>
         
         <Route path="/*"  component={ErrorPage}/>
       </Switch>
    </Router>
  )
}

export default App
