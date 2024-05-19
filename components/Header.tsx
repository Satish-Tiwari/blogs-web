import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" className="primary-blue-button" data-active={isActive('/')}>
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/" className="primary-green-button" data-active={isActive('/')}>
          Feed
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" data-active={isActive('/signup')} className='primary-green-button'>
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="flex gap-4">
        <Link href="/" className="primary-blue-button" data-active={isActive('/')}>
          Feed
        </Link>
        <Link href="/drafts" className="primary-blue-button" data-active={isActive('/drafts')}>
          My drafts
        </Link>
      </div>
    );
    right = (
      <div className="flex gap-4">
        <div className='h-10 w-10'>
          <Image
            src={session?.user?.image || 'http:/'}
            alt="Profile"
            className='rounded-full cursor-pointer'
            width={200}
            height={200}
            loading="lazy"
            layout="responsive"
          />
        </div>
        <Link href="/create" className="primary-blue-button">
          <button>New post</button>
        </Link>
        <button onClick={() => signOut()} className='primary-red-button'>Log out</button>
      </div>
    );
  }

  return (
    <nav className='flex items-center justify-between my-4 mx=4 py-4 px-12 md:px-8'>
      {left}
      {right}
    </nav>
  );
};

export default Header;
