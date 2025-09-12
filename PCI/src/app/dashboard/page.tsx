import { redirect } from 'next/navigation';
import { requireAuth } from '~/lib/auth';
import LogoutButton from '~/components/modules/LogoutButton';

export default async function DashboardPage() {
  const user = await requireAuth();
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Dashboard
        </h1>
        
        <div className="bg-white/10 p-6 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h2>
          <p className="mb-6">You have successfully logged in to the protected area.</p>
          
          <div className="flex gap-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  );
}