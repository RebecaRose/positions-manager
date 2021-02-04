import { Home, Positions, Users } from "./pages";

const routes = [
    {
        path: '/',
        component: Home,
        title: 'Home',
    },
    {
        path: '/users',
        component: Users,
        title: 'Funcionários',
    },
    {
        path: '/position',
        component: Positions,
        title: 'Cargos',
    }
]

export default routes;