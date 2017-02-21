import expect from 'expect';
import { createStore } from 'redux';
import rootReducers  from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    // setup
    const store = createStore(rootReducers, initialState);
    const course = {
      title: 'Clean Code'
    };

    // exercise
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const actual = store.getState().courses[0];
    const expected = {
      title: 'Clean Code'
    };
    expect(actual).toEqual(expected);
  });
});