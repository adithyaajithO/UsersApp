import * as UsersContext from '../context/UsersContext';

const contextValues = [{ id: 1, userName: "user1@xyz.com", password: "pass" },
    { id: 2, userName: "user2@xyz.com", password: "passs" },
]

export default jest.spyOn(UsersContext, 'UsersContext').mockImplementationOnce(() =>contextValues);