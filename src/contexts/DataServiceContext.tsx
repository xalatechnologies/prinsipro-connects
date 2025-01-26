import React, { createContext } from 'react';
import { IDataService } from '@services/interfaces/IDataService';
import { MockDataService } from '@services/MockDataService';

export const DataServiceContext = createContext<IDataService | null>(null);

interface DataServiceProviderProps {
  service?: IDataService;
  children: React.ReactNode;
}

export const DataServiceProvider: React.FC<DataServiceProviderProps> = ({ 
  service = new MockDataService(),
  children 
}) => {
  return (
    <DataServiceContext.Provider value={service}>
      {children}
    </DataServiceContext.Provider>
  );
};