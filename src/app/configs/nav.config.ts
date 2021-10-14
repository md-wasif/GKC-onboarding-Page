import { NavMenu } from '@app/shared/types/nav-menu.interface';

const dashboard: NavMenu[] = [
    {
        path: '/dashboard/home',
        title: 'Dashboard',
        translateKey: 'NAV.DASHBOARD',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-home',
        key: 'dashboard',
        submenu: []
    },
    {
        path: '/dashboard/usermanagement',
        title: 'User Management',
        translateKey: 'NAV.USER_MANAGEMENT',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-user',
        key: 'user_management',
        submenu: []
    },
    {
        path: '/dashboard/brandmanagement',
        title: 'Brand Management',
        translateKey: 'NAV.BRAND_MANAGEMENT',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-home',
        key: 'brand_management',
        submenu: []
    },
]

export const navConfiguration: NavMenu[] = [
    ...dashboard
]