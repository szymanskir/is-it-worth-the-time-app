import { useState } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";

function Calculator() {
  const [timeCalculationInput, setTimeCalculationInput] = useState<TimeCalculationInput>({
    horizonValue: 1,
    horizonUnit: TimeUnit.Day,
    frequencyValue: 1,
    frequencyUnit: TimeUnit.Day,
    taskDuration: 1,
    taskDurationUnit: TimeUnit.Minute,
  });

  const handleInputChange = (field: keyof TimeCalculationInput, value: string | number) => {
    setTimeCalculationInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("TimeCalculationInput:", timeCalculationInput);
  };

  return (
    <div className="calculator">
      <div className="input-group flex justify-items-start items-center gap-4 mb-4">
        <label htmlFor="horizon-value" className="w-2xs text-left">How long will you keep doing it?</label>
        <input
          id="horizon-value"
          type="number"
          min="1"
          placeholder="1"
          className="input border rounded px-2 py-1 w-32"
          value={timeCalculationInput.horizonValue}
          onChange={(e) => handleInputChange("horizonValue", e.target.value)}
        />
        <Select
          onValueChange={(value) => handleInputChange("horizonUnit", value as TimeUnit)}
          value={timeCalculationInput.horizonUnit}
        >
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TimeUnit.Day}>Days</SelectItem>
            <SelectItem value={TimeUnit.Week}>Weeks</SelectItem>
            <SelectItem value={TimeUnit.Month}>Months</SelectItem>
            <SelectItem value={TimeUnit.Year}>Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="input-group flex justify-items-start items-center gap-4 mb-4">
        <label htmlFor="frequency-value" className="w-2xs text-left">How often do you do it?</label>
        <input
          id="frequency-value"
          type="number"
          min="1"
          placeholder="1"
          className="input border rounded px-2 py-1 w-32"
          value={timeCalculationInput.frequencyValue}
          onChange={(e) => handleInputChange("frequencyValue", e.target.value)}
        />
        <Select
          onValueChange={(value) => handleInputChange("frequencyUnit", value as TimeUnit)}
          value={timeCalculationInput.frequencyUnit}
        >
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TimeUnit.Day}>Per Day</SelectItem>
            <SelectItem value={TimeUnit.Week}>Per Week</SelectItem>
            <SelectItem value={TimeUnit.Month}>Per Month</SelectItem>
            <SelectItem value={TimeUnit.Year}>Per Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="input-group flex items-center gap-4 mb-4">
        <label htmlFor="task-duration" className="w-2xs text-left">How long does it take?</label>
        <input
          id="task-duration"
          type="number"
          min="1"
          placeholder="15"
          className="input border rounded px-2 py-1 w-32"
          value={timeCalculationInput.taskDuration}
          onChange={(e) => handleInputChange("taskDuration", e.target.value)}
        />
        <Select
          onValueChange={(value) => handleInputChange("taskDurationUnit", value as TimeUnit)}
          value={timeCalculationInput.taskDurationUnit}
        >
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TimeUnit.Second}>Seconds</SelectItem>
            <SelectItem value={TimeUnit.Minute}>Minutes</SelectItem>
            <SelectItem value={TimeUnit.Hour}>Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-right justify-end gap-4 mb-4">
        <Button variant="outline" onClick={handleSubmit}>Calculate</Button>
      </div>
    </div>
  );
}


export default Calculator;