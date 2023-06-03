import HomePosts from '../HomePosts/HomePosts'
import Timer from '../Timer/Timer'
import useTitle from '../../customHooks/useTitle'

import './Home.css';

const Home = () => {
    useTitle('Inicio')
    return (
        <main className='home'>
            <Timer />
            <HomePosts />
        </main>
    )
}

export default Home