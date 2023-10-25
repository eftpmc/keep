import Image from 'next/image';
import AuthForm from '@/components/auth/auth-form';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <AuthForm />
    </div>
  );
}
