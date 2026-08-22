import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { sampleBooks } from '@/contants';

const myProfile = () => {
  return (
    <>
      <BookList title="Borrowed books" books={sampleBooks} />
    </>
  );
};

export default myProfile;
