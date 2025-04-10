import { useState } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { TimeCalculationInput, HorizonUnit, FrequencyUnit, TaskDurationUnit } from "./TimeCalculationInput";

function Calculator() {
  const [timeCalculationInput, setTimeCalculationInput] = useState<TimeCalculationInput>({
    horizonValue: 1,
    horizonUnit: HorizonUnit.Days,
    frequencyValue: 1,
    frequencyUnit: FrequencyUnit.PerDay,
    taskDuration: 1,
    taskDurationUnit: TaskDurationUnit.Minutes,
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
          onValueChange={(value) => handleInputChange("horizonUnit", value as HorizonUnit)}
          value={timeCalculationInput.horizonUnit}
        >
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={HorizonUnit.Days}>Days</SelectItem>
            <SelectItem value={HorizonUnit.Weeks}>Weeks</SelectItem>
            <SelectItem value={HorizonUnit.Months}>Months</SelectItem>
            <SelectItem value={HorizonUnit.Years}>Years</SelectItem>
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
          onValueChange={(value) => handleInputChange("frequencyUnit", value as FrequencyUnit)}
          value={timeCalculationInput.frequencyUnit}
        >
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FrequencyUnit.PerDay}>Per Day</SelectItem>
            <SelectItem value={FrequencyUnit.PerWeek}>Per Week</SelectItem>
            <SelectItem value={FrequencyUnit.PerMonth}>Per Month</SelectItem>
            <SelectItem value={FrequencyUnit.PerYear}>Per Year</SelectItem>
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
          onValueChange={(value) => handleInputChange("taskDurationUnit", value as TaskDurationUnit)}
          value={timeCalculationInput.taskDurationUnit}
        >
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TaskDurationUnit.Seconds}>Seconds</SelectItem>
            <SelectItem value={TaskDurationUnit.Minutes}>Minutes</SelectItem>
            <SelectItem value={TaskDurationUnit.Hours}>Hours</SelectItem>
            <SelectItem value={TaskDurationUnit.Days}>Days</SelectItem>
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