import React from 'react';
import CourseForm from './CourseForm';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

function setup(saving = false) {
  let props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();
  
  return {
    output,
    props,
    renderer
  };
}

describe('Course Form via React Test Utils',  () => {
  it('renders form and h1', () => {
    const {output} = setup();
    expect(output.type).toBe('form');
    let [ h1 ] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('has its save button labelled \'Save\' when not saving', () => {
    const {output} = setup();
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('has its save button labelled \'Saving\' when saving', () => {
    const {output} = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  })
});