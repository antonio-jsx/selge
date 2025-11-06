'use client';

import { registerSchema } from '../schema';
import { signUp } from '@bakan/auth/client';
import { Button } from '@bakan/ui/components/button';
import { FieldGroup } from '@bakan/ui/components/field';
import { FormField } from '@bakan/ui/components/form-field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@bakan/ui/components/input-group';
import { Password } from '@bakan/ui/components/password';
import { toast } from '@bakan/ui/components/sonner';
import { Spinner } from '@bakan/ui/components/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function SignUp() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', name: '', password: '', repassword: '' },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: `/verify-email?e=${data.email}`,
    });

    if (error) {
      return toast.error(error.message);
    }

    toast.success('Account created successfully');
    form.reset();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <FieldGroup className="gap-4">
        <FormField
          control={form.control}
          name="name"
          label="Name"
          render={(field) => (
            <InputGroup>
              <InputGroupInput type="text" placeholder="jhon doe" {...field} />
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>
          )}
        />
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
        <FormField
          control={form.control}
          name="repassword"
          label="Repeat password"
          render={(field) => <Password field={field} />}
        />
      </FieldGroup>
      <p>
        Already have an account?{' '}
        <Link className="font-bold hover:underline" href="/signin">
          Sign In
        </Link>
      </p>
      <Button type="submit">
        {form.formState.isSubmitting && <Spinner />} Create account
      </Button>
    </form>
  );
}
