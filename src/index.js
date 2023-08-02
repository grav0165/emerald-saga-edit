import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import axios from 'axios';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put, takeLatest} from 'redux-saga/effects';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();


// all the students from the DB
const studentList = (state = [], action) => {
    if(action.type === 'SET_STUDENT_LIST') {
        return action.payload;
    }

    return state;
}

// hold only the single student object being edited
const studentToEdit = (state  = {}, action) => {

    return state;
}

function* fetchStudents() {
    try {
        const response = yield axios.get('/students')
        yield put({ type: 'SET_STUDENT_LIST', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}

function* addStudent(action) {
    try {
        yield axios.post('/students', action.payload)
        yield put({ type: 'FETCH_STUDENTS' })
    } catch (err) {
        console.log(err)
    }
}





function* rootSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchStudents);
    yield takeLatest('ADD_STUDENT', addStudent);
}




// The store is the big JavaScript Object that holds all of the information for our application
const store = createStore(
    combineReducers({
        studentList
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

// Wrap our App in a Provider, this makes Redux available in
// our entire application
const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)