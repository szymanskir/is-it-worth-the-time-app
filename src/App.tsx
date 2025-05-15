import "./App.css";
import Calculator from "./calculator/Calculator";

function App() {
  return (
    <div className="p-4 app flex flex-col items-center gap-6 ">
      <header className="text-xl font-bold">
        <h1>Is It Worth The Time?</h1>
      </header>
      <div className="w-full max-w-[360px]">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
