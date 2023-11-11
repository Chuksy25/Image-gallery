import { useState } from "react";
import { useGesture } from "@use-gesture/react";
import "./App.css";

const images = [
  "/images/Nft-1.jpg",
  "/images/Nft-2.png",
  "/images/Nft-3.jpg",
  "/images/Nft-4.jpg",
  "/images/Nft-5.jpg",
  "/images/Nft-6.jpg",
  "/images/Nft-7.png",
  "/images/Nft-8.jpg",
];

const App = () => {
  const [position, setPosition] = useState([0, 0]);
  const [hovered, setHovered] = useState(false);

  const handlers = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      setPosition([x, y]);
    },
    onWheel: ({ delta: [, dy] }) => {
      // Implement your logic for zooming or other actions with the wheel event
      // For example, you can adjust the scale of the component
      // based on the wheel scroll direction (dy).
      // Here's a simple zoom example:
      setPosition((prevPosition) => [prevPosition[0], prevPosition[1] - dy]);
    },
    onHover: ({ hovering }) => {
      setHovered(hovering);
    },
    onScroll: ({ delta: [, dy] }) => {
      // Implementing logic for additional scroll functionality
      setPosition((prevPosition) => [prevPosition[0], prevPosition[1] - dy]);
    },
    onPinch: ({ offset: [s], memo }) => {
      // Implementing pinch gesture logic for scaling
      const scale = memo * s;
      setPosition((prevPosition) => [
        prevPosition[0] * scale,
        prevPosition[1] * scale,
      ]);
      return s;
    },
    onMove: ({ offset: [mx, my] }) => {
      // Implementing logic for additional move functionality
      setPosition([mx, my]);
    },
  });

  return (
    <div className="container">
      <div className="wrapper">
        {images.map((image, index) => (
          <div key={index} className="image-container" {...handlers()}>
            <img
              style={{
                transform: `translate(${position[0]}px, ${position[1]}px)`,
                backgroundColor: hovered ? "lightblue" : "white", // Change background color on hover
              }}
              src={image}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


