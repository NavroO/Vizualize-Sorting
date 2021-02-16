import React from 'react';
import './SortingVizualize.css';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export class SortingVizualize extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
        this.resetArray = this.resetArray.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        // I use this method to generate new array and reset
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomInt(5, 750)); // Min and Max value of number in array
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array } = this.state;

        return (
            <>
                <header>
                    <nav>
                        <button onClick={() => this.resetArray()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    </nav>
                </header>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
            </>

        );
    }
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}

export default SortingVizualize;