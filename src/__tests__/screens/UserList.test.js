import React from 'react';
import renderer from 'react-test-renderer';

import UsersList from '../../screens/UsersList';

test('renders correctly', () => {
    const tree = renderer.create(<UsersList />).toJSON();
    expect(tree).toMatchSnapshot();
  });