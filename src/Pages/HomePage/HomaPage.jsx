import "./HomePage.css";
import Counter from "../../Components/Counter/Counter";
import Background_04 from "./../../assets/Background_04.png";

export default function HomePage() {
  return (
    <div className="background-container">
      <div className="right-images">
        <div className="title-container">
          <h1>Empowering Every Step,Every Ability...</h1>
          <p>
            Track your progress and achieve your goals, no matter your
            abilities.
          </p>
        </div>
        <div className="image-container">
          <img
            src={Background_04}
            className="image image-01"
            alt="Background 1"
          />
          <div className="shadow-effect shadow-effect-01"></div>
        </div>
      </div>
      <div className="counter-container">
        <Counter />
      </div>
    </div>
  );
}
