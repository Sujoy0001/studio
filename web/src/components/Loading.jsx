import React, { useEffect, useState } from 'react';
import "../App2.css"

const Loader = () => {
  const phrases = ['Loading...', 'Preparing files...', 'Almost there...'];
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setText('Loading...');
      return;
    }

    const fullText = phrases[index];

    let timer;
    if (!deleting) {
      if (charIndex < fullText.length) {
        timer = setTimeout(() => {
          setText(fullText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        timer = setTimeout(() => setDeleting(true), 1000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setText(fullText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        setDeleting(false);
        setIndex((index + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, index]);

  return (
    <div className="fixed inset-0 flex items-center min-h-screen justify-center text-black">
      <div className="flex flex-col items-center gap-5 p-8">
        <div className="flex items-center gap-2 text-4xl md:text-8xl font-semibol sujoy font-mono">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
