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
import { loginSchema, loginSchemaType } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const [isGoogleSignin, setIsGoogleSignin] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const searchParams = useSearchParams();

  const handleGoogleSignin = () => {
    setIsGoogleSignin(true);
    signIn('google', {
      callbackUrl: searchParams.get('next')
        ? (searchParams.get('next') as string)
        : '/',
    });
  };

  const loginForm = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: loginSchemaType) {
    console.log(values);
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
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
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
          <p className="text-right mt-2 text-sm text-muted-foreground">
            Forgot Password?{' '}
            <Link
              href="/reset-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Reset
            </Link>
          </p>
          <Button
            type="submit"
            size={'lg'}
            className="w-full"
            disabled={isGoogleSignin}
          >
            Log In
          </Button>
          <p className="text-sm text-muted-foreground">
            Don&apos; have an account?{' '}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
