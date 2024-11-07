import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Lock } from 'lucide-react';

const LevelNavigator = ({ 
  levels, 
  currentLevel, 
  completedLevels, 
  onLevelSelect,
  className = "" 
}) => {
  return (
    <Card className={`${className} overflow-hidden`}>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {levels.map((level, index) => {
            const isCompleted = completedLevels.includes(index);
            const isCurrentLevel = currentLevel === index;
            const isLocked = !isCompleted && index > Math.min(currentLevel, ...completedLevels) + 1;

            return (
              <Button
                key={index}
                variant={isCurrentLevel ? "default" : "outline"}
                className={`
                  w-10 h-10 p-0 relative
                  ${isCompleted ? 'bg-green-100 hover:bg-green-200 border-green-500' : ''}
                  ${isCurrentLevel ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                onClick={() => !isLocked && onLevelSelect(index)}
                disabled={isLocked}
              >
                <span className="text-sm font-medium">{index + 1}</span>
                {isCompleted && (
                  <Check 
                    className="w-3 h-3 text-green-500 absolute top-0.5 right-0.5" 
                  />
                )}
                {isLocked && (
                  <Lock 
                    className="w-3 h-3 text-gray-400 absolute top-0.5 right-0.5" 
                  />
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelNavigator;