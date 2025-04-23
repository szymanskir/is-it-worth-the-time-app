import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";
import { calculatePotentialSavedTime } from "./calculations";
import { Card, CardContent } from "@/components/ui/card";

function Calculator() {
  const [timeCalculationInput, setTimeCalculationInput] = useState<TimeCalculationInput>({
    horizonValue: 5,
    horizonUnit: TimeUnit.Year,
    frequencyValue: 1,
    frequencyUnit: TimeUnit.Day,
    taskDuration: 15,
    taskDurationUnit: TimeUnit.Minute,
    resultUnit: TimeUnit.Day
  });

  const [savedTimeResult, setSavedTimeResult] = useState<number>(0);

  useEffect(() => {
    try {
      const result = calculatePotentialSavedTime(timeCalculationInput);
      setSavedTimeResult(result);
    } catch (error) {
      console.log(error);
    }
  }, [timeCalculationInput]);

  const handleInputChange = (field: keyof TimeCalculationInput, value: string | number) => {
    setTimeCalculationInput((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

  return (
    <div className="calculator flex flex-col items-center gap-6">
      <Card className="w-[390px]">
        <CardContent>
          <div className="input-group flex justify-items-start items-center gap-4 mb-4">
            <div className="flex flex-col items-start">
              <label htmlFor="horizon-value" className="mb-1 text-left font-semibold">How long will you keep doing it?</label>
              <div className="flex items-center gap-4">
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
            </div>
          </div>

          <div className="input-group flex justify-items-start items-center gap-4 mb-4">
            <div className="flex flex-col items-start">
              <label htmlFor="frequency-value" className="mb-1 text-left font-semibold">How often do you do it?</label>
              <div className="flex items-center gap-4">
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
            </div>
          </div>

          <div className="input-group flex items-center gap-4 mb-4">
            <div className="flex flex-col items-start">
              <label htmlFor="task-duration" className="mb-1 text-left font-semibold">How long does it take?</label>
              <div className="flex items-center gap-4">

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
            </div>
          </div>

          <div className="input-group flex items-center gap-4 mb-4">
            <div className="flex flex-col items-start">
              <label htmlFor="task-duration" className="mb-1 text-left font-semibold">In what units do you want to see results?</label>
              <div className="flex items-center gap-4">

                <Select
                  onValueChange={(value) => handleInputChange("resultUnit", value as TimeUnit)}
                  value={timeCalculationInput.resultUnit}
                >
                  <SelectTrigger className="w-80 border rounded px-2 py-1">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TimeUnit.Second}>Seconds</SelectItem>
                    <SelectItem value={TimeUnit.Minute}>Minutes</SelectItem>
                    <SelectItem value={TimeUnit.Hour}>Hours</SelectItem>
                    <SelectItem value={TimeUnit.Day}>Days</SelectItem>
                    <SelectItem value={TimeUnit.Week}>Weeks</SelectItem>
                    <SelectItem value={TimeUnit.Month}>Months</SelectItem>
                    <SelectItem value={TimeUnit.Year}>Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-[390px]">
        <CardContent>
          <p className="text-2xl font-semibold">
            {`${savedTimeResult.toLocaleString()} ${timeCalculationInput.resultUnit}`}
          </p>
          <p className="text-gray-500 mt-1">
            saved over {timeCalculationInput.horizonValue} {timeCalculationInput.horizonUnit}(s)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Calculator;