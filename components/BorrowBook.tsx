'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from './ui/toast';
import { borrowBook } from '@/lib/actions/book';

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({ userId, bookId, borrowingEligibility }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!borrowingEligibility.isEligible) {
      toast.add({
        title: 'Error',
        description: borrowingEligibility.message,
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast.add({
          title: 'success',
          description: 'book borrowed successfully',
        });
        router.push('/my-profile');
      } else {
        toast.add({
          title: 'Error',
          description: result.error,
        });
      }
    } catch (error) {
      console.log(error);
      toast.add({
        title: 'Error',
        description: 'an error occured while borrowing an book',
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      onClick={handleBorrow}
      disabled={borrowing}
      className={'book-overview_btn  gap-2 px-2 rounded-lg'}
    >
      <Image src={'/icons/book.svg'} alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? 'Borrowing...' : 'Borrow Book'}
      </p>
    </Button>
  );
};

export default BorrowBook;
