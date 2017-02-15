import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving = false) {
  let props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
}

describe('Course Form test using Enzyme', () => {
  it('render form and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Courses');
  });

  it('has its save button labelled \'Save\' when not saving', () => {
    const wrapper = setup();
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('has its save button labelled \'Save\' when not saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});