import { createContext, useState, useContext } from 'react';

type ScoreContextType = {
  score: number;
  addPoints: (points: number) => void;
  resetScore: () => void;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  const addPoints = (points: number) => {
    setScore((current) => current + points);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <ScoreContext.Provider value={{ score, addPoints, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}; 