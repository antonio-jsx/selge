import { SignIn } from '@/app/(login)/_components/sign-in';
import Card from '@/components/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function Login() {
  return (
    <Card
      title="Login to your account"
      description="Welcome back you've been missed!"
      className="min-w-sm"
    >
      <SignIn />
    </Card>
  );
}
