import { hash } from '@/lib/hash';
import { registerSchema } from '@/schemas/register';
import { createUser, getUserByEmail } from '@/services/user';

export const POST = async (req: Request) => {
  const body = await req.json();
  const validatedFields = registerSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ message: 'Invalid fields!' }, { status: 400 });
  }

  const { email, password } = validatedFields.data;

  const userExists = await getUserByEmail(email);

  if (userExists) {
    return Response.json({ message: 'User already exists!' }, { status: 400 });
  }

  const hashedPassword = await hash(password);

  const newUser = await createUser({ email, password: hashedPassword });

  return Response.json({ userId: newUser.id }, { status: 200 });
};
