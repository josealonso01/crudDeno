// deno-lint-ignore-file
import { Context, helpers } from '../deps.ts';
import type { User } from '../types/user.ts';
import * as db from '../db/user.ts';

export const findAllUsers = async (ctx: Context) => {
  const users: User[] = db.find();
  ctx.response.body = users;
};

export const findUser = async (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  try {
    const user: User = db.findUserById(userId);
    ctx.response.body = user;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createUser = async (ctx: Context) => {
  try {
    const { name, birthDate } = await ctx.request.body().value;
    const createdUser: User = db.createUser({
      name,
      birthDate /* convertirlo a fecha*/,
    });
    ctx.response.body = createdUser;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const updateUser = async (ctx: Context) => {
  {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const { name, birthDate } = await ctx.request.body().value;
    if (!userId) {
      ctx.response.status = 400;
      ctx.response.body = { msg: 'Invalid user id' };
      return;
    }
    await db.updateUser(userId, { name, birthDate });

    ctx.response.body = { msg: 'User updated' };
  }
};

export const deleteUser = async (ctx: Context) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });

    db.deleteUser(userId);

    ctx.response.status = 201;
    ctx.response.body = {
      success: true,
      msg: 'user deleted',
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
