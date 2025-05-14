// app/admin/dashboard/page.jsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getSession() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

async function getRole(userId) {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching role:', error);
    return null;
  }
  return data?.role;
}

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const role = await getRole(session.user.id);
  if (role !== 'admin') {
    redirect('/unauthorized');
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin {session?.user?.email}!</p>
    </div>
  );
}