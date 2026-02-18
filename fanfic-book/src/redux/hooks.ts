import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed useDispatch hook for Redux dispatch
 * Use this instead of plain `useDispatch` for proper typing
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useSelector hook for Redux selectors
 * Use this instead of plain `useSelector` for proper typing
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
