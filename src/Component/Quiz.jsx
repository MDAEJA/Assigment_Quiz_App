import React, { useEffect, useState } from 'react';
import "../Component/quizStyle.css";
import data from '../Data.js';

function Quiz() {
    const [index, setIndex] = useState(0);
    const [buttonValue, setButtonValue] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [answer, setAnswer] = useState(0);
    const [result, setResult] = useState(false);
    const [time, setTime] = useState(0);
    const [setTimeShow, setSetTimeShow] = useState(true); // Example state for determining opacity

    useEffect(() => {
        const questionTimer = setTimeout(() => {
            if (index >= 4) {
                setButtonValue(true);
                setIndex(4);
                setSetTimeShow(false); // Example usage to hide timer at the last question
            } else {
                setIndex(prevIndex => prevIndex + 1);
                setSelectedOption(null);
                setIsCorrect(null);
                setIsOptionSelected(false);
            }
        }, 6000);

        return () => clearTimeout(questionTimer);
    }, [index]);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(countdownTimer);
    }, []);

    useEffect(() => {
        if (time >= 6) {
            setTime(0);
        }
    }, [time]);

    const clickHandler = () => {
        if (index >= 4) {
            setButtonValue(true);
            setIndex(4);
            setSetTimeShow(false); // Example usage to hide timer at the last question
        } else {
            setIndex(prevIndex => prevIndex + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            setIsOptionSelected(false);
        }
        setTime(0); // Reset the time for each new question
    };

    const checkQuikHandler = (value) => {
        if (isOptionSelected) return;
        const correctAnswer = data[index].correctOption;
        if (correctAnswer === data[index].options[value]) {
            setAnswer(prevAnswer => prevAnswer + 1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setSelectedOption(value);
        setIsOptionSelected(true);
    };

    const resultHandler = () => {
        setResult(true);
    };

    const resetHandler = () => {
        setResult(false);
        setIndex(0);
        setButtonValue(false);
        setAnswer(0);
        setTime(0);
        setSetTimeShow(true); // Reset the time show state
    };

    return (
        <>
            {
                (!result) ? (
                    <div className='quiz-div'>
                        <h1>Quiz App</h1>
                        <span style={{ float: 'right', marginTop: '-40px', opacity: setTimeShow ? 1 : 0 }}>{time} of 6 sec</span>
                        <hr style={{ margin: '10px 0px' }} />
                        <h3>{index + 1}{"."}{data[index].question}</h3>
                        <ul style={{ listStyle: "none", margin: "20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            {
                                data[index].options.map((item, idx) => (
                                    <li className='quiz-hover'
                                        style={{
                                            border: "1px solid white",
                                            padding: "10px 15px",
                                            borderRadius: "10px",
                                            cursor: 'pointer',
                                            backgroundColor: selectedOption === idx
                                                ? isCorrect ? 'green' : 'red'
                                                : 'transparent'
                                        }}
                                        key={idx}
                                        onClick={() => checkQuikHandler(idx)}
                                    >
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                        {
                            (buttonValue) ? <button className='button-div' onClick={resultHandler}>Done</button> : <button className='button-div' onClick={clickHandler}>Next</button>
                        }

                        <span>{index + 1} of 5 Questions</span>
                    </div>
                ) : (
                    <div className='result-div'>
                        <h1 style={{ textAlign: "center", textDecoration: "underline", textTransform: "uppercase" }}>Performance Report</h1>
                        <span>You answered {answer} out of 5 questions correctly.</span>
                        <button className='button-div' onClick={resetHandler}>Reset</button>
                    </div>
                )
            }
        </>
    );
}

export default Quiz;
