import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Note from './Materials/Note';

const MOVE_INTERVAL = 100; // ノーツの移動間隔を短くする（ミリ秒）
const MOVE_DISTANCE = 15; // ノーツの1回の移動距離を大きくする（ピクセル）

const GameContainer = styled.div`
  position: relative;
  width: 350px; // レーン数に応じて幅を調整
  height: 500px;
  border: 1px solid black;
  background: #000;
  overflow: hidden;
`;

const JudgeLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background: red;
  bottom: 100px;
`;

const KeyImage = styled.img`
  position: absolute;
  width: 700px; // レーン数に応じて幅を調整
  bottom: 0;
  pointer-events: none;
`;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);

  // ノーツ生成
  useEffect(() => {
    const interval = setInterval(() => {
      setNotes(notes => [
        ...notes,
        {
          id: Date.now(),
          position: Math.floor(Math.random() * 7), 
          y: 0
        }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ノーツの移動
  useEffect(() => {
    const interval = setInterval(() => {
      setNotes(notes => notes.map(note => ({ ...note, y: note.y + MOVE_DISTANCE })));
    }, MOVE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // キーボード入力
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyToPosition = {
        'a': 0,
        's': 1,
        'd': 2,
        'f': 3,
        'j': 4,
        'k': 5,
        'l': 6,
      };

      if (keyToPosition.hasOwnProperty(e.key)) {
        const hitPosition = keyToPosition[e.key];
        setNotes(notes => notes.filter(note => {
          if (note.position === hitPosition && note.y > 380 && note.y < 420) {
            setScore(score => score + 1);
            return false;
          }
          return true;
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <GameContainer ref={containerRef}>
      {notes.map(note => (
        <Note
          key={note.id}
          position={note.position}
          y={note.y}
          color={note.position % 2 === 0 ? '#fff' : '#00f'}
          width={50} // レーン数に応じて幅を調整
          height={10}
        />
      ))}
      <JudgeLine />
      <KeyImage src="/mnt/data/image.png" alt="key image" />
      <div>Score: {score}</div>
    </GameContainer>
  );
};

export default App;
