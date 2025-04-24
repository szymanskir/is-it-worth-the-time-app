import "./App.css";
import Calculator from "./calculator/Calculator";

function App() {
  return (
    <div className="app flex flex-col items-center gap-6 p-4">
      <header className="flex items-center gap-2 text-2xl font-bold">
        <h1>Is It Worth The Time?</h1>
      </header>

      <Calculator />
    </div>
  );
}

export default App;
