import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import MyProfile from './pages/MyProfile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/game',
        element: <Game />,
    },
    {
        path: '/profile',
        element: <MyProfile />,
    },
]);

export default router;
