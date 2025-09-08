import React, { useState, useEffect } from 'react';

const TypewriterText = ({ words, speed = 70, deleteSpeed = 50, delay = 1500 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentWord = words[currentWordIndex];

            if (!isDeleting) {
                if (currentText.length < currentWord.length) {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delay);
                    return;
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delay]);

    return (
        <span>
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default TypewriterText;