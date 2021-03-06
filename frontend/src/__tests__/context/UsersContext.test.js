import  '../../__mocks__/api/usersServer.mock';
// import { addUser, editUser, getUsers, deleteUser } from "../../context/UsersContext";
import usersServer from '../../api/usersServer';

const getUsers = async (token) => {
    const options = {
      headers: {
        Authorization: token
      }
    }
    return await usersServer.get('/users', options);
}

const editUser = async (id, { userName, password }, token) => {
    const options = {
      headers: {
        Authorization: token,
        user_id: id
      }
    }
    return await usersServer.put(`/users`, { userName, password }, options);
}

const deleteUser = async (id, token) => {
    const options = {
      headers: {
        Authorization: token,
        user_id: id
      }
    }
    return await usersServer.delete(`/users`, options);
}

const addUser = async ({ userName, password }) => {
    return await usersServer.post('/users', { userName, password });;
}

describe('getUsers', () => {
    test('fetches successfully result details from api', async () => {
        const data = [
            {
              "userName": "rajubhain@gmail.com",
              "password": "rajuspwd",
              "id": 3
            },
            {
              "userName": "ejjcu updated agina",
              "password": "fnjr37",
              "id": 12
            },
            {
              "userName": "jrjjcc updateds again",
              "password": "88483",
              "id": 13
            },
            {
              "userName": "rnjfj updated agin",
              "password": "dhje",
              "id": 14
            },
            {
              "userName": "iskicc updated",
              "password": "fbdbhc",
              "id": 16
            },
            {
              "userName": "ebhdu updated",
              "password": "xbbdc",
              "id": 17
            },
            {
              "userName": "yejjfs updated",
              "password": "27637r",
              "id": 21
            },
            {
              "userName": "chees updated",
              "password": "dnjdk",
              "id": 23
            },
            {
              "userName": "dakdjje",
              "password": "snnej82",
              "id": 24
            },
            {
              "userName": "jewel",
              "password": "djjd",
              "id": 25
            },
            {
              "userName": "joseph",
              "password": "smne",
              "id": 26
            },
            {
              "userName": "ysjjx",
              "password": "dbhd",
              "id": 27
            },
            {
              "userName": "jssd",
              "password": "627r",
              "id": 28
            },
            {
              "userName": "iwirujc",
              "password": "2663hHd",
              "id": 29
            },
            {
              "userName": "tippu updated",
              "password": "sjsj62",
              "id": 31
            },
            {
              "userName": "kuttanpil",
              "password": "w773",
              "id": 33
            },
            {
              "userName": "chuppan updated",
              "password": "2773",
              "id": 34
            },
            {
              "userName": "jammu updated",
              "password": "27744",
              "id": 36
            },
            {
              "userName": "goond",
              "password": "3773",
              "id": 37
            },
            {
              "userName": "jimbroot",
              "password": "snje",
              "id": 38
            },
            {
              "userName": "kkkkk",
              "password": "277r4",
              "id": 39
            },
            {
              "userName": "rajuweee",
              "password": "7273",
              "id": 40
            },
            {
              "userName": "keshu",
              "password": "s727r",
              "id": 41
            },
            {
              "userName": "lluduf",
              "password": "3774uf",
              "id": 42
            },
            {
              "userName": "adithyaajith3@gmail.com",
              "password": "yabdnb",
              "id": 44
            },
            {
              "userName": "jamboo",
              "password": "827r",
              "id": 45
            },
            {
              "userName": "rsjesh@gmail.com",
              "password": "3773",
              "id": 46
            }
          ]

        const options = {
          headers: {
            Authorization: 'token'
          }
        }

        usersServer.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(getUsers('token')).resolves.toEqual(data);

        expect(usersServer.get).toHaveBeenCalledWith(
            '/users', options
        );
    });
});

describe('editUser', () => {
    test('fetches successfully result details from api', async () => {
        const status = true

        const options = {
          headers: {
            Authorization: 'token',
            user_id: 5
          }
        }

        usersServer.put.mockImplementationOnce(() => Promise.resolve(status));

        await expect(editUser(5, { userName: 'jithu', password: 'jithupass' }, 'token')).resolves.toEqual(status);

        expect(usersServer.put).toHaveBeenCalledWith(
            '/users', {"password": "jithupass", "userName": "jithu"}, options
        );
    });
});

describe('deleteUser', () => {
    test('fetches successfully result details from api', async () => {
        const status = true

        const options = {
          headers: {
            Authorization: 'token',
            user_id: 5
          }
        }

        usersServer.delete.mockImplementationOnce(() => Promise.resolve(status));

        await expect(deleteUser(5, 'token')).resolves.toEqual(status);

        expect(usersServer.delete).toHaveBeenCalledWith(
            '/users', options
        );
    });
});

describe('addUser', () => {
    test('fetches successfully result details from api', async () => {
        const status = true


        usersServer.post.mockImplementationOnce(() => Promise.resolve(status));

        await expect(addUser({ userName: 'jithu', password: 'jithupass' })).resolves.toEqual(status);

        expect(usersServer.post).toHaveBeenCalledWith(
            '/users', {"password": "jithupass", "userName": "jithu"}
        );
    });
});