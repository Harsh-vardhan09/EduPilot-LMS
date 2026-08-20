import BookForm from '@/components/admin/forms/BookForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <>
      <Button
        nativeButton={false}
        render={<Link href={'/admin/books'} />}
        className={'back-btn'}
      >
        Go back
      </Button>
      <section className='w-full max-w-2xl'>
        <BookForm/>
      </section>
    </>
  );
};

export default page;
