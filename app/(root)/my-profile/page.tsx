import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { sampleBooks } from '@/contants';

const myProfile = () => {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
        className="mb-10"
      >
        <Button type="submit">Logout</Button>
      </form>
      <BookList title="Borrowed books" books={sampleBooks} />
    </>
  );
};

export default myProfile;
