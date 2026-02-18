// Redux Store
export { store, type RootState, type AppDispatch } from './store';

// Hooks
export { useAppDispatch, useAppSelector } from './hooks';

// UI Slice
export {
  setLoading,
  setError,
  clearError,
  setSearchQuery,
  clearSearchQuery,
  toggleSearch,
  setSearchOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
} from './uiSlice';
export type { UIState } from './uiSlice';

// Navigation Slice
export {
  setActiveNavItem,
  setHoveredNavItem,
  resetNavigation,
} from './navigationSlice';
export type { NavigationState, NavItem } from './navigationSlice';

// Selectors
export {
  selectIsLoading,
  selectError,
  selectSearchQuery,
  selectIsSearchOpen,
  selectIsMobileMenuOpen,
  selectPrimaryNavItems,
  selectSecondaryNavItems,
  selectActiveNavItem,
  selectHoveredNavItem,
  selectActivePrimaryNavItem,
  selectHeaderState,
} from './selectors';
