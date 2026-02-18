import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Navigation item interface
 */
export interface NavItem {
  id: string;
  label: string;
  url: string;
  isActive: boolean;
}

/**
 * Navigation State interface
 */
export interface NavigationState {
  primaryNavItems: NavItem[];
  secondaryNavItems: NavItem[];
  activeNavItem: string;
  hoveredNavItem: string | null;
}

/**
 * Primary navigation items
 */
const primaryNavItems: NavItem[] = [
  { id: 'recommendations', label: 'Рекомендации', url: '/recommendations', isActive: false },
  { id: 'fanfics', label: 'Фанфики', url: '/fanfics', isActive: false },
  { id: 'authors', label: 'Авторы', url: '/authors', isActive: false },
  { id: 'top', label: 'ТОП', url: '/top', isActive: false },
  { id: 'requests', label: 'Заявки', url: '/requests', isActive: false },
  { id: 'helpers', label: 'Помощники', url: '/helpers', isActive: false },
  { id: 'contests', label: 'Конкурсы', url: '/contests', isActive: false },
];

/**
 * Secondary navigation items
 */
const secondaryNavItems: NavItem[] = [
  { id: 'faq', label: 'FAQ', url: '/faq', isActive: false },
  { id: 'rules', label: 'Правила', url: '/rules', isActive: false },
];

/**
 * Initial state for Navigation slice
 */
const initialState: NavigationState = {
  primaryNavItems,
  secondaryNavItems,
  activeNavItem: 'recommendations',
  hoveredNavItem: null,
};

/**
 * Navigation Slice for managing navigation state
 * Handles active navigation items and hover states
 */
const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    /**
     * Set active navigation item
     */
    setActiveNavItem: (state, action: PayloadAction<string>) => {
      state.activeNavItem = action.payload;
      // Update isActive for all primary nav items
      state.primaryNavItems = state.primaryNavItems.map((item) => ({
        ...item,
        isActive: item.id === action.payload,
      }));
    },
    /**
     * Set hovered navigation item
     */
    setHoveredNavItem: (state, action: PayloadAction<string | null>) => {
      state.hoveredNavItem = action.payload;
    },
    /**
     * Reset navigation to default state
     */
    resetNavigation: (state) => {
      state.activeNavItem = 'recommendations';
      state.hoveredNavItem = null;
      state.primaryNavItems = state.primaryNavItems.map((item) => ({
        ...item,
        isActive: item.id === 'recommendations',
      }));
    },
  },
});

export const {
  setActiveNavItem,
  setHoveredNavItem,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer;
