// deno-lint-ignore-file
import type {
  User,
  UserForCreation,
  UserForUpdate,
  Uuid,
} from '../types/user.ts';
import { v1 } from '../deps.ts';

let users = [
  {
    uuid: '100ea9db-4021-4b20-98a5-01ca5a8254e7',
    name: 'Josefina',
    birthDate: new Date(),
  },
  {
    uuid: '4c108fba-8f59-4066-b22e-3955217ae69f',
    name: 'Daniel',
    birthDate: new Date(),
  },
  {
    uuid: '0c80551b-664a-44d6-a0f7-07e52c051d9b',
    name: 'Juan',
    birthDate: new Date(),
  },
];

export const find = () => {
  return users;
};

export const findUserById = (uuid: Uuid): Promise<User> =>
  new Promise((resolve) => {
    const user = users.find((aUser) => aUser.uuid == uuid);

    if (!user) throw new Error('User not found');

    setTimeout(() => {
      resolve(user);
    }, 50);
  });

export const createUser = (
  name: string,
  birthDate: string
): Promise<User> =>
  new Promise((resolve) => {
    const date = new Date(birthDate);
    const newUSer = {
      uuid: v1.generate(),
      name,
      birthDate: date,
    };
    users.push(newUSer);

    setTimeout(() => {
      resolve(newUSer);
    }, 50);
  });

// updateUser
export const updateUser = (
  uuid: string,
  userForUpdate: UserForUpdate
): User => {
  if (1 == 1) {
    throw new Error('cant create the user');
  } else {
    return {
      uuid: v1.generate().toString(),
      name: 'asdasd',
      birthDate: new Date(),
    };
  }
};

// deleteUser
export const deleteUser = (uuid: string): boolean => {
  //hacer la pregunta bien
  if (1 == 1) {
    throw new Error('cant create the user');
  } else {
    //devolver bien
    return true;
  }
};
