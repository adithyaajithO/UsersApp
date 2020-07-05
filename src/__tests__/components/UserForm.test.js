import React from 'react';
import renderer from 'react-test-renderer';

import UserForm from '../../components/UserForm';

test('renders correctly', () => {
    const tree = renderer.create(<UserForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });