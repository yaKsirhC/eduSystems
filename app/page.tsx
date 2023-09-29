import AdminLayout from './admin/AdminLayout'
import AdminHome from './admin/Admin.home'
import { cookies } from 'next/headers'
import { redirect, useRouter } from 'next/navigation';

export default function Home() {
  if(!cookies().get('auth2')?.value) return redirect('/auth/student')

  return (
    <AdminLayout>
      {/* @ts-ignore */}
      <AdminHome />
    </AdminLayout>
  )
}
 