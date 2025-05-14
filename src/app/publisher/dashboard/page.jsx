// app/publisher/dashboard/page.jsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getSession() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

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

export default async function PublisherDashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  const role = await getRole(session.user.id);

  if (role !== 'publisher') {
    redirect('/unauthorized');
  }

  return (
    <div>
      <h1>Publisher Dashboard</h1>
      <p>Role: {role}</p>
      {/* You can still access user info from the session if needed later */}
      {/* <p>Welcome, {session?.user?.email}!</p> */}
      {/* Your publisher dashboard content */}
    </div>
  );
}