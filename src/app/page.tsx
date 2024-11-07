'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LightbulbIcon } from 'lucide-react';
import LevelNavigator from '@/components/ui/levelnavigator';
import lvls from '../lib/levels.json';

const CodeBuilderGame = () => {


  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [droppedItems, setDroppedItems] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [fishSize, setFishSize] = useState(30);
  const [completedSequences, setCompletedSequences] = useState([]);
  const [currentHint, setCurrentHint] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const { levels } = lvls;

  const renderFish = (x, y, size) => (
    <g transform={`translate(${x},${y})`}>
      <path
        d={`
          M ${-size} 0
          C ${-size * 0.8} ${-size * 0.5}, ${size * 0.8} ${-size * 0.5}, ${size} 0
          C ${size * 0.8} ${size * 0.5}, ${-size * 0.8} ${size * 0.5}, ${-size} 0
          Z
        `}
        fill="#FF6B6B"
      />
      <circle cx={size * 0.5} cy={-size * 0.2} r={size * 0.15} fill="white" />
      <circle cx={size * 0.5} cy={-size * 0.2} r={size * 0.07} fill="black" />
      <path
        d={`
          M ${-size} 0
          L ${-size * 1.3} ${-size * 0.3}
          L ${-size * 1.3} ${size * 0.3}
          Z
        `}
        fill="#FF6B6B"
      />
    </g>
  );

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text', item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text');
    if (droppedItems.length < levels[currentLevel].correctSequence.length) {
      setDroppedItems([...droppedItems, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(droppedItems) === 
                     JSON.stringify(levels[currentLevel].correctSequence);
    
    if (isCorrect) {
      setScore(score + 100);
      setFeedback('Correct! ' + levels[currentLevel].effect);
      setCompletedSequences([...completedSequences, {
        level: currentLevel,
        sequence: droppedItems
      }]);
      
      // Add level to completed levels if not already included
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }
      
      if (currentLevel === 2) setFishSize(fishSize + 10);
      
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setDroppedItems([]);
          setFeedback('');
          setShowHint(false);
          setCurrentHint(0);
        } else {
          setFeedback('Congratulations! You\'ve mastered var declarations! 🎉');
        }
      }, 2000);
    } else {
      setFeedback('Try again! ' + levels[currentLevel].hint);
    }
  };

  const resetCode = () => {
    setDroppedItems([]);
    setFeedback('');
  };

  const handleHint = () => {
    setShowHint(true);
    if (currentHint < levels[currentLevel].hints.length - 1) {
      setCurrentHint(currentHint + 1);
    } else {
      setCurrentHint(0);
    }
  };

  // Add handler for level selection
  const handleLevelSelect = (levelIndex) => {
    setCurrentLevel(levelIndex);
    setDroppedItems([]);
    setFeedback('');
    setShowHint(false);
    setCurrentHint(0);
  };


  const renderPreviousCode = () => {
    if (!levels[currentLevel]?.showPrevious || completedSequences.length === 0) return null;

    const previousCode = completedSequences[completedSequences.length - 1];
    return (
      <div className="bg-gray-100 p-4 rounded mb-4">
        <div className="text-sm text-gray-600 mb-2">{levels[currentLevel].previousContext}</div>
        <div className="flex gap-2">
          {previousCode.sequence.map((item, index) => (
            <span key={index} className="px-3 py-1 bg-gray-300 rounded">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Learn JavaScript var with Fish!</span>
          <span>Score: {score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
        <LevelNavigator
            levels={levels}
            currentLevel={currentLevel}
            completedLevels={completedLevels}
            onLevelSelect={handleLevelSelect}
          />
          {/* Ocean View */}
          <div className="border-4 border-blue-200 rounded-lg overflow-hidden">
            <svg width="400" height="200" viewBox="0 0 400 200">
              <rect width="400" height="200" fill="#E3F2FD" />
              
              {/* Animated waves */}
              <path d="M 0 180 Q 100 160, 200 180 Q 300 200, 400 180" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.5)" 
                    strokeWidth="2">
                <animate 
                  attributeName="d" 
                  values="M 0 180 Q 100 160, 200 180 Q 300 200, 400 180;
                         M 0 180 Q 100 200, 200 180 Q 300 160, 400 180;
                         M 0 180 Q 100 160, 200 180 Q 300 200, 400 180"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              
              {renderFish(200, 100, fishSize)}
              
              {/* Bubbles */}
              <circle cx="50" cy="150" r="10" fill="rgba(255,255,255,0.5)">
                <animate 
                  attributeName="cy" 
                  values="150;50;150" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </circle>
              <circle cx="80" cy="120" r="8" fill="rgba(255,255,255,0.5)">
                <animate 
                  attributeName="cy" 
                  values="120;40;120" 
                  dur="3s" 
                  repeatCount="indefinite" 
                />
              </circle>
            </svg>
          </div>

          {/* Challenge Description */}
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-bold mb-2">Level {currentLevel + 1}: {levels[currentLevel].title}</h3>
            <p>{levels[currentLevel].description}</p>
          </div>

          {/* Hint System */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleHint}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LightbulbIcon className="w-4 h-4" />
              Need a Hint?
            </Button>
            {showHint && (
              <div className="flex-1 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                {levels[currentLevel].hints[currentHint]}
              </div>
            )}
          </div>

          {/* Previous Code Context */}
          {renderPreviousCode()}

          {/* Code Construction Area */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600">Your Answer:</div>
            <div 
              className="min-h-20 p-4 bg-gray-800 rounded flex gap-2 items-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {droppedItems.map((item, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {item}
                </span>
              ))}
              {droppedItems.length === 0 && (
                <span className="text-gray-400">Drag and drop code pieces here...</span>
              )}
            </div>
          </div>

          {/* Code Elements */}
          <div className="space-y-4">
      {Object.entries(levels[currentLevel].codeItems).map(([category, items]) => (
        items.length > 0 && (
          <div key={category} className="space-y-2">
            <h4 className="font-medium capitalize">{category}:</h4>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="px-3 py-1 bg-gray-200 rounded cursor-move hover:bg-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )
      ))}
    </div>

          <div className="flex gap-4">
            <Button onClick={checkAnswer} className="w-full">
              Check Answer
            </Button>
            <Button onClick={resetCode} variant="outline" className="w-full">
              Clear Code
            </Button>
          </div>

          {feedback && (
            <div className={`p-4 rounded text-center ${
              feedback.includes('Correct') ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeBuilderGame;