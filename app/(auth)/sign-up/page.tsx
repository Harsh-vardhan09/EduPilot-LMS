'use client';

import AuthForm from '@/components/AuthForm';
import { signUp } from '@/lib/actions/auth';
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
    onSubmit={signUp}
  />
);

export default SignUp;
