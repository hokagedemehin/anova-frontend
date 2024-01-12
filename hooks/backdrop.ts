import { setBackdropClose } from '@/shared/store/slices/backdropSlice';
import { useAppDispatch } from '@/shared/store/store';
import { useEffect } from 'react';

export const useCloseBackdrop = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBackdropClose());
  }, [dispatch]);
};
