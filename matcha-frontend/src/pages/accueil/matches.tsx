import SwiperComponent from '@/components/accueil/SwiperComponent'
import Loading from '@/components/ui/loading'
import { useSelector } from 'react-redux'

const Matches = () => {

    const loading = useSelector((state: any) => state.sideBar.loading)

    if (loading) {
        <Loading/>
    }
    return (
        <div className="matches">
            <SwiperComponent />
        </div>
    )
}

export default Matches
