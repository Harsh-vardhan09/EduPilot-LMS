'use client';

import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/validation';

// ponytail: no auth backend wired yet — swap for a server action once db/auth lands.
const SignUp = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: '',
      email: '',
      password: '',
      universityId: 0,
      universityCard: '',
    }}
    onSubmit={async () => ({
      success: false,
      error: 'Sign up is not wired up yet',
    })}
  />
);

export default SignUp;
