import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from '@/auth';
import { Button } from './ui/button';
const Header = () => {

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex  items-center text-4xl gap-2">
        <Image src={'/icons/logo.svg'} alt="logo" width={40} height={40} />
        <h1>EduPilot</h1>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        {/* <li>
          <Link
            href="/library"
            className={cn(
              'text-base cursor-pointer capitalize',
              pathname === '/library' ? 'text-light-200' : 'text-light-100'
            )}
          >
            Library
          </Link>
        </li> */}
        {/* <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className=" bg-amber-100">
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li> */}

        <li>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
            className="mb-10 self-center"
          >
            <Button type="submit">Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
