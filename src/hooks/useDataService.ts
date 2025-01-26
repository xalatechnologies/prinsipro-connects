import { useContext } from 'react';
import { DataServiceContext } from '../contexts/DataServiceContext';

export const useDataService = () => {
  const context = useContext(DataServiceContext);
  if (!context) {
    throw new Error('useDataService must be used within a DataServiceProvider');
  }
  return context;
};