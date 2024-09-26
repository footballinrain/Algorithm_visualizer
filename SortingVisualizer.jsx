import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { mergeSort } from '../algorithms/mergeSort';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import { selectionSort } from '../algorithms/selectionSort';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [speed, setSpeed] = useState(100); // Speed of the animation

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 400) + 50);
    setArray(newArray);
    document.querySelectorAll('.array-bar').forEach((bar) => {
      bar.style.backgroundColor = 'turquoise';
    });
  };

  const handleSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    let animations = [];

    switch (algorithm) {
      case 'Merge Sort':
        animations = mergeSort([...array]);
        break;
      case 'Bubble Sort':
        animations = bubbleSort([...array]);
        break;
      case 'Insertion Sort':
        animations = insertionSort([...array]);
        break;
      case 'Selection Sort':
        animations = selectionSort([...array]);
        break;
      default:
        break;
    }

    animateSorting(animations);
  };

  const animateSorting = (animations) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, isSwap, heightOne, heightTwo] = animation;

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        barOneStyle.backgroundColor = 'red';
        barTwoStyle.backgroundColor = 'red';

        if (isSwap) {
          barOneStyle.height = `${heightOne}px`;
          barTwoStyle.height = `${heightTwo}px`;
        }

        setTimeout(() => {
          barOneStyle.backgroundColor = 'turquoise';
          barTwoStyle.backgroundColor = 'turquoise';
        }, speed);
      }, index * speed);
    });

    setTimeout(() => {
      setIsSorting(false);
      document.querySelectorAll('.array-bar').forEach((bar) => {
        bar.style.backgroundColor = 'green'; // Mark completion
      });
    }, animations.length * speed);
  };

  return (
    <div className="sorting-visualizer">
      <div className="controls">
        <button onClick={generateNewArray} disabled={isSorting}>Generate New Array</button>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isSorting}>
          <option>Merge Sort</option>
          <option>Bubble Sort</option>
          <option>Insertion Sort</option>
          <option>Selection Sort</option>
        </select>
        <button onClick={handleSort} disabled={isSorting}>Sort</button>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
