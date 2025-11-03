import { SignUp } from '@/app/(login)/_components/sign-up';
import Card from '@/components/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function Register() {
  return (
    <Card
      title="Create your account"
      description="Just a few quick things to get started"
      className="min-w-sm"
    >
      <SignUp />
    </Card>
  );
}
