"use client";

import { createContext, useContext } from 'react';

const DomainContext = createContext({
  domainType: 'main',
  siteName: 'Dr SNA Clinic',
  isPShot: false,
  isMain: true,
  getUrl: (path) => path,
});

export function DomainProvider({
  children,
  domainType = 'main',
  siteName = 'Dr SNA Clinic'
}) {
  const isPShot = domainType === 'pshot';
  const isMain = domainType === 'main';

  const getUrl = (path) => {
    // If on P-Shot domain, prefix paths with /pshot
    if (isPShot && !path.startsWith('/pshot')) {
      return `/pshot${path}`;
    }
    return path;
  };

  return (
    <DomainContext.Provider value={{
      domainType,
      siteName,
      isPShot,
      isMain,
      getUrl
    }}>
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain() {
  return useContext(DomainContext);
}
