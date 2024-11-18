import Matches from '@/pages/accueil/matches'
import SideBar from '@/pages/accueil/sideBar'
import { useDispatch, useSelector } from 'react-redux'
import styles from '@/styles/Layout.module.css'
import Messages from '@/pages/accueil/messages'
import { useEffect } from 'react'
// import { setSocket } from '@/redux/features/socketSlice'
// import { useSocket } from '@/redux/context/SocketContext'
import { getTest } from '@/redux/features/sideBarSlice'
import Loading from './ui/loading'
import ProfileDetails from '@/pages/accueil/ProfileDetails'
import Profile from '@/pages/accueil/profile'

export default function Layout({ children }: any) {
    const loading = useSelector((state: any) => state.loading.loading)
    const activeTab = useSelector((state: any) => state.sideBar.tab)
    const isSidebarVisible = useSelector((state: any) => state.sideBar.isSidebarVisible)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTest())
    }, [dispatch, isSidebarVisible])

    if (loading) return <Loading />
    return (
        <div className={styles.container}>
            <div className={`${styles.sidebarFrame} ${isSidebarVisible ? `${styles.sidebarVisible}` : ''}`}>
                <SideBar />
            </div>
            <main className={styles.mainContent}>
                {activeTab === 'matches' && <Matches />}
                {activeTab === 'messages' && <Messages />}
                {activeTab === 'details' && <Profile />}
                {activeTab === 'default' && children}
            </main>
        </div>
    )
}
