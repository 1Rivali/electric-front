import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay, ...props }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);
  return <Text {...props}>{currentText}</Text>;
};

export default Typewriter;
