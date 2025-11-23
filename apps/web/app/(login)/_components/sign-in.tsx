'use client';

import { userSchema } from '@/app/(login)/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@selge/auth/client';
import { Button } from '@selge/ui/components/button';
import { FieldGroup } from '@selge/ui/components/field';
import { FormField } from '@selge/ui/components/form-field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@selge/ui/components/input-group';
import { Password } from '@selge/ui/components/password';
import { toast } from '@selge/ui/components/sonner';
import { Spinner } from '@selge/ui/components/spinner';
import { MailIcon } from 'lucide-react';
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
            <InputGroup>
              <InputGroupInput
                type="email"
                placeholder="Enter your email"
                {...field}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
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
