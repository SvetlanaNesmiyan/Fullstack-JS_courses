import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

/**
 * UI Selectors
 */
// Base selector for UI state
const selectUIState = (state: RootState) => state.ui;

/**
 * Select loading state
 */
export const selectIsLoading = createSelector(
  [selectUIState],
  (ui) => ui.isLoading
);

/**
 * Select error message
 */
export const selectError = createSelector(
  [selectUIState],
  (ui) => ui.error
);

/**
 * Select search query
 */
export const selectSearchQuery = createSelector(
  [selectUIState],
  (ui) => ui.searchQuery
);

/**
 * Select search modal state
 */
export const selectIsSearchOpen = createSelector(
  [selectUIState],
  (ui) => ui.isSearchOpen
);

/**
 * Select mobile menu state
 */
export const selectIsMobileMenuOpen = createSelector(
  [selectUIState],
  (ui) => ui.isMobileMenuOpen
);

/**
 * Navigation Selectors
 */
// Base selector for Navigation state
const selectNavigationState = (state: RootState) => state.navigation;

/**
 * Select primary navigation items
 */
export const selectPrimaryNavItems = createSelector(
  [selectNavigationState],
  (navigation) => navigation.primaryNavItems
);

/**
 * Select secondary navigation items
 */
export const selectSecondaryNavItems = createSelector(
  [selectNavigationState],
  (navigation) => navigation.secondaryNavItems
);

/**
 * Select active navigation item ID
 */
export const selectActiveNavItem = createSelector(
  [selectNavigationState],
  (navigation) => navigation.activeNavItem
);

/**
 * Select hovered navigation item ID
 */
export const selectHoveredNavItem = createSelector(
  [selectNavigationState],
  (navigation) => navigation.hoveredNavItem
);

/**
 * Select active primary navigation item with full details
 */
export const selectActivePrimaryNavItem = createSelector(
  [selectPrimaryNavItems],
  (items) => items.find((item) => item.isActive)
);

/**
 * Combined selector for header state
 * Useful for debugging or comprehensive header state
 */
export const selectHeaderState = createSelector(
  [selectUIState, selectNavigationState],
  (ui, navigation) => ({
    isLoading: ui.isLoading,
    isMobileMenuOpen: ui.isMobileMenuOpen,
    isSearchOpen: ui.isSearchOpen,
    activeNavItem: navigation.activeNavItem,
    primaryNavItems: navigation.primaryNavItems,
    secondaryNavItems: navigation.secondaryNavItems,
  })
);
