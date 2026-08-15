'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/contants';
import ImageUpload from './ImageUpload';

interface Props<T extends FieldValues> {
  schema: ZodType<T, FieldValues>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === 'SIGN_IN';

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<T, unknown, T>({
    // ponytail: cast needed — RHF can't prove a generic ZodType<T> resolves to T.
    resolver: zodResolver(schema) as Resolver<T, unknown, T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const submit: SubmitHandler<T> = async () => {};

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'welcome back to EduPilot' : 'Create your Library account'}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated'
          : 'Please complete all field and upload a valid university ID to gain'}
      </p>
      <form onSubmit={handleSubmit(submit)} className="w-full space-y-6">
        {Object.keys(defaultValues).map((name) => (
          <Field key={name}>
            <FieldLabel htmlFor={name} className="text-light-100 capitalize">
              {FIELD_NAMES[name as keyof typeof FIELD_NAMES]}
            </FieldLabel>

            {name === 'universityCard' ? (
              <ImageUpload
                onFileChange={(filePath) =>
                  setValue(name as Path<T>, filePath as PathValue<T, Path<T>>)
                }
              />
            ) : (
              <Input
                id={name}
                required
                type={FIELD_TYPES[name as keyof typeof FIELD_TYPES]}
                {...register(name as Path<T>)}
                className="form-input"
              />
            )}
            <FieldError errors={[errors[name] as { message?: string }]} />
          </Field>
        ))}

        <FieldError errors={[errors.root]} />

        <Button type="submit" className="form-btn" disabled={isSubmitting}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to bookwise ' : 'Already have and account '}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-primary underline"
        >
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
