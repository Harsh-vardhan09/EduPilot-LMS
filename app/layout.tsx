import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toast';


const ibmPlexSans = localFont({
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    {
      path: '/fonts/IBMPlexSans-semiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '400', style: 'normal' },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--bebas-neue',
});

export const metadata: Metadata = {
  title: 'EduPilot',
  description: 'EduPilot is a book LMS for university',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        ibmPlexSans.className,
        bebasNeue.variable,
        'font-sans',
      )}
    >
      <body className="min-h-full flex flex-col">{children}
        <Toaster/>
      </body>
    </html>
  );
}
