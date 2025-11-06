'use client';

import { userSchema } from '@/app/(login)/schema';
import { signIn } from '@bakan/auth/client';
import { Button } from '@bakan/ui/components/button';
import { FieldGroup } from '@bakan/ui/components/field';
import { FormField } from '@bakan/ui/components/form-field';
import { Input } from '@bakan/ui/components/input';
import { Password } from '@bakan/ui/components/password';
import { toast } from '@bakan/ui/components/sonner';
import { Spinner } from '@bakan/ui/components/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function SignIn() {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: '/dashboard',
    });

    if (error) {
      toast.error(error.message);
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FieldGroup className="gap-4">
        <FormField
          control={form.control}
          name="email"
          label="Email"
          render={(field) => (
            <Input type="email" placeholder="Enter your email" {...field} />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          label="Password"
          render={(field) => <Password field={field} />}
        />
      </FieldGroup>

      <Button type="submit">
        {form.formState.isSubmitting && <Spinner />} Login
      </Button>

      <p>
        Don't have an account?{' '}
        <Link className="font-bold hover:underline" href="/signup">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
