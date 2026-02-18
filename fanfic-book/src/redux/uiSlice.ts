import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * UI State interface for managing UI-related state
 */
export interface UIState {
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
}

/**
 * Initial state for UI slice
 */
const initialState: UIState = {
  isLoading: false,
  error: null,
  searchQuery: '',
  isSearchOpen: false,
  isMobileMenuOpen: false,
};

/**
 * UI Slice for managing global UI state
 * Handles loading states, errors, search functionality, and mobile menu
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    /**
     * Set error message
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    /**
     * Clear error message
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Set search query
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    /**
     * Clear search query
     */
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
    /**
     * Toggle search modal
     */
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    /**
     * Set search modal visibility
     */
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    /**
     * Set mobile menu visibility
     */
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSearchQuery,
  clearSearchQuery,
  toggleSearch,
  setSearchOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
