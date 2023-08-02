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
    if(action.type === 'SET_EDIT_STUDENT') {
        // represents a student object
        return action.payload
    }
    if(action.type === 'EDIT_ONCHANGE') {
        return {
            ...state, 
            // This is a 'Computed Property Name'
            // 
            [action.payload.property]: action.payload.value
        }
    }

    return state;
}

const loadingSpinner = (state = false, action) => {
    if (action.type == 'SHOW_SPINNER') {
        return true;
    }
    if (action.type == 'HIDE_SPINNER') {
        return false;
    }
    return state;
}

function* fetchStudents() {
    try {
        yield put({ type: 'SHOW_SPINNER '})
        const response = yield axios.get('/students')
        yield put({ type: 'SET_STUDENT_LIST', payload: response.data })
        yield put({ type: 'HIDE_SPINNER'})
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

function* editStudent(action) {
    // update selected student in the database
    try{
        yield put({ type: 'SHOW_SPINNER '})
        yield axios.put(`/students/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_STUDENTS'})
        yield put({ type: 'HIDE_SPINNER'})
    } catch ( error ) {
        console.log( error )
    }
}



function* rootSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchStudents);
    yield takeLatest('ADD_STUDENT', addStudent);
    yield takeLatest('SUBMIT_EDIT_STUDENT', editStudent)
}




// The store is the big JavaScript Object that holds all of the information for our application
const store = createStore(
    combineReducers({
        studentList,
        studentToEdit,
        loadingSpinner
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