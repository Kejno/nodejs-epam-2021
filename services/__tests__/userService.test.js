import { createUserService, getUsersService, getUserByIdService, updateUserService, deleteUserService } from '../userService';
import User from '../../models/User';
import UserGroup from '../../models/UserGroup';


const usersFromDb = [{
    id: '1111',
    age: 20,
    login: 'artem',
    password: 'hello!@#',
    is_deleted: false
}, {
    id: '2222',
    age: 34,
    login: 'dima',
    password: '22hello!@#',
    is_deleted: false
},
{
    id: '3333',
    age: 43,
    login: 'zhena',
    password: '33hello!@#',
    is_deleted: true
},
{
    id: '4444',
    age: 55,
    login: 'oleg',
    password: '44hello!@#',
    is_deleted: true
}];

describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should created user', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(undefined);
        jest.spyOn(User, 'create');
        await createUserService({
            age: 20,
            login: 'artem',
            password: 'hello!@#'
        });
        expect(User.create).toHaveBeenCalled();
    });
    test('should return users if is_deleted false', async () => {
        jest.spyOn(User, 'findAndCountAll').mockResolvedValue(usersFromDb.filter(u => u.is_deleted));
        const result = await getUsersService({ limit: 10 });
        expect(result.data).toHaveLength(2);
    });
    test('it should find a user by id', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({ dataValues: usersFromDb[0] });
        const result = await getUserByIdService('1111');
        expect(result).toEqual({ age: 20, id: '1111', login: 'artem' });
    });
    test('should return updated user', async () => {
        jest.spyOn(User, 'update').mockResolvedValue(['some_info', [{ age: 32, id: '111', login: 'ulya' }]]);
        const result = await updateUserService('1111', {
            age: 32,
            login: 'ulya'
        });
        expect(result).toEqual({ age: 32, id: '111', login: 'ulya' });
    });
    test('should soft delete', async () => {
        const deletedUser = { ...usersFromDb[0], ... { is_deleted: true } };
        delete deletedUser.is_deleted;
        delete deletedUser.password;
        jest.spyOn(User, 'update').mockResolvedValue(deletedUser);
        jest.spyOn(UserGroup, 'destroy').mockResolvedValue(null);
        const result = await deleteUserService('1111');
        expect(Object.keys(result)).toContain('id');
    });
});
