import Header from '../components/Header'
import '../styles/adminHome.scss'
import AdminsSidebar from '../components/Admin.sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
	<>
		{children}
	</>
  )
}
