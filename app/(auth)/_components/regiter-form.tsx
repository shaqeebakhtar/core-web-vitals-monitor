'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema, registerSchemaType } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { SignInResponse, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [isGoogleSignin, setIsGoogleSignin] = useState(false);
  const [isCredentialsRegister, setIsCredentialsRegister] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleGoogleSignin = () => {
    setIsGoogleSignin(true);
    signIn('google', { callbackUrl: '/onboarding' });
  };

  const registerForm = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: registerSchemaType) {
    setIsCredentialsRegister(true);
    const res = (await signIn('register', {
      email: values.email,
      password: values.password,
      redirect: false,
    })) as SignInResponse;


    if (!res.ok) {
      setIsCredentialsRegister(false);
      toast.error(res.error);
    }

    if (res.ok && !res.error) {
      router.push('/onboarding');
    }
  }

  return (
    <>
      <Button
        variant={'outline'}
        size={'lg'}
        className="w-full"
        disabled={isGoogleSignin}
        onClick={handleGoogleSignin}
      >
        {isGoogleSignin ? (
          <Loader className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Icons.google className="w-5 h-5 mr-2" />
        )}
        Sign in with Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    {...field}
                    type="email"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      placeholder="********"
                      type={isPasswordShow ? 'text' : 'password'}
                      {...field}
                      required
                    />
                    <Button
                      type="button"
                      size={'icon'}
                      variant={'ghost'}
                      className="absolute right-1"
                      onClick={() => setIsPasswordShow(!isPasswordShow)}
                    >
                      {isPasswordShow ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={'lg'}
            className="w-full"
            disabled={isGoogleSignin || isCredentialsRegister}
          >
            {isCredentialsRegister && (
              <Loader className="w-4 h-4 animate-spin mr-2" />
            )}
            Continue
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
