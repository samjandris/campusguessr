import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-secondary p-6 rounded-lg shadow-lg justify-center">
        <h1 className="text-center">404 - Page Not Found</h1>
        <div className="mt-2 mb-5">
          <h4 className="text-center">
            Oops! The page you are looking for does not exist.
          </h4>
          <h4 className="text-center">It might have been moved or deleted.</h4>
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
