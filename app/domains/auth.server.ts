import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/framework/session.server";
import { FormStrategy } from "remix-auth-form";
import { makeDomainFunction } from "domain-functions";
import { prisma } from "~/db.server";

import * as z from "zod";

export const authenticator = new Authenticator<User>(sessionStorage);

const authUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

const userSchema = authUserSchema.extend({
  name: z.string().nullable(),
});

type User = z.infer<typeof userSchema>;

// const getUserById = makeDomainFunction(z.object({ id: z.string() }))(
//   async ({ id }) => {
//     return prisma.user.findUnique({ where: { id } });
//   }
// );

const login = makeDomainFunction(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
)(async ({ email, password }) => {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }
  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  authenticator.use(
    new FormStrategy(async ({ form }) => {
      let user = await login(email, password);
      return user;
    }),
    "user-pass"
  );

  return await authenticator.authenticate("form", request, {
    context: { formData },
  });

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
});

//export { getUserById };
