import React, { useState, useContext, createContext, useEffect } from 'react';
import { getStaticData } from './db/queries/site';
import { StaticData } from './db/models/staticData';

const staticDataContext = createContext();

export function StaticDataProvider({ children }) {
  const staticData = useProvideStaticData();
  return <staticDataContext.Provider value={staticData}>{children}</staticDataContext.Provider>;
}

export const useStaticData = () => {
  return useContext(staticDataContext);
};

function useProvideStaticData() {
  const [staticData, setStaticData] = useState(null);

  useEffect(() => {
    initializeStaticData();
  }, []);

  const initializeStaticData = async () => {
    const [staticData, error] = await getStaticData();

    if (staticData) {
      const newStaticData = new StaticData(staticData);
      setStaticData(newStaticData);
    }
  };

  const getRandomAvatar = () => {
    if (staticData instanceof StaticData) {
      const {
        images: { avatar },
      } = staticData.getData();

      return avatar[Math.floor(Math.random() * avatar.length)];
    }
  };

  const getRandomCoverImage = () => {
    if (staticData instanceof StaticData) {
      const {
        images: { cover },
      } = staticData.getData();

      return cover[Math.floor(Math.random() * cover.length)];
    }
  };

  return {
    staticData: staticData && new StaticData(staticData),
    setStaticData,
    getRandomAvatar,
    getRandomCoverImage,
  };
}
