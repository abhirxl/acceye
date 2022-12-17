import { DashboardOutlined } from '@ant-design/icons';

export  const navItems = [
    {
        id: 'dashboard',
        title: 'Navigation',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/admin/dashboard',
                icon: DashboardOutlined,
                breadcrumbs: false
            },
            {
                id: 'about',
                title: 'About',
                type: 'item',
                url: '/about',
                icon: DashboardOutlined,
                breadcrumbs: false
            }
        ]
    }
]