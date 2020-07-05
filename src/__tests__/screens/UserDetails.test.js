import React from 'react';
import renderer from 'react-test-renderer';
// import '../../__mocks__/UsersContext.mock';
import { useContext } from 'react';

import UserDetails from '../../screens/UserDetails';

test('renders correctly', () => {
    jest.mock('react');
    const contextValues = [{ id: 1, userName: "user1@xyz.com", password: "pass" },
    { id: 2, userName: "user2@xyz.com", password: "passs" }];
    jest.spyOn(useContext(), 'useContext').mockImplementationOnce(() =>contextValues);
    const tree = renderer.create(<UserDetails route={{ params: { id: 5 } }}  />).toJSON();
    expect(tree).toMatchSnapshot();
  });