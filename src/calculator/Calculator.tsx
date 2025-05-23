import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";
import { calculateBreakEvenTime, calculatePotentialSavedTime } from "./calculations";
import { Card, CardContent } from "@/components/ui/card";

function Calculator() {
  const [timeCalculationInput, setTimeCalculationInput] = useState<TimeCalculationInput>({
    horizonValue: 5,
    horizonUnit: TimeUnit.Year,
    frequencyValue: 1,
    frequencyUnit: TimeUnit.Day,
    taskDuration: 15,
    taskDurationUnit: TimeUnit.Minute,
    resultUnit: TimeUnit.Day,
    timeToAutomate: 1,
    timeToAutomateUnit: TimeUnit.Hour,
  });

  const [savedTimeResult, setSavedTimeResult] = useState<number>(0);
  const [breakEvenTime, setBreakEvenTime] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const result = calculatePotentialSavedTime(timeCalculationInput);
      setSavedTimeResult(result);

      const breakEven = calculateBreakEvenTime(timeCalculationInput);
      setBreakEvenTime(breakEven);
      setError(false)
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, [timeCalculationInput]);

  const handleInputChange = (field: keyof TimeCalculationInput, value: string | number) => {
    setTimeCalculationInput((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

  return (
    <div className="calculator flex flex-col items-center gap-6 w-full">
      <Card className="w-full">
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
                  className="input border rounded px-2 py-1 w-24"
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
                  className="input border rounded px-2 py-1 w-24"
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
                  className="input border rounded px-2 py-1 w-24"
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
              <label htmlFor="automation-estimate" className="mb-1 text-left font-semibold">How much effort to automate?</label>
              <div className="flex items-center gap-4">

                <input
                  id="automation-estimate"
                  type="number"
                  min="1"
                  placeholder="15"
                  className="input border rounded px-2 py-1 w-24"
                  value={timeCalculationInput.timeToAutomate}
                  onChange={(e) => handleInputChange("timeToAutomate", e.target.value)}
                />
                <Select
                  onValueChange={(value) => handleInputChange("timeToAutomateUnit", value as TimeUnit)}
                  value={timeCalculationInput.timeToAutomateUnit}
                >
                  <SelectTrigger className="w-44 border rounded px-2 py-1">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
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

          <div className="input-group flex items-center gap-4 mb-4">
            <div className="flex flex-col items-start">
              <p className="mb-1 text-left font-semibold">Show results in which unit?</p>
              <div className="flex items-center gap-4">

                <Select
                  onValueChange={(value) => handleInputChange("resultUnit", value as TimeUnit)}
                  value={timeCalculationInput.resultUnit}
                >
                  <SelectTrigger className="w-72 border rounded px-2 py-1">
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


      {error ? (
        <Card className="w-full h-[110px]">
          <CardContent>
            <p className="text-xl text-red-500 mt-1">
              It's not possible to do a {timeCalculationInput.taskDuration} {timeCalculationInput.taskDurationUnit.slice(0, -1)} task {timeCalculationInput.frequencyValue} times per {timeCalculationInput.frequencyUnit.slice(0, -1)}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardContent>
            <p className="text-2xl font-semibold">
              {`${savedTimeResult.toLocaleString()} ${timeCalculationInput.resultUnit}`}
            </p>
            <p className="text-gray-500 mt-1">
              saved over {timeCalculationInput.horizonValue} {timeCalculationInput.horizonUnit}(s)
            </p>
          </CardContent>
        </Card>
      )}


      <Card className={"w-full " + (error ? "invisible" : "visible")} >
        <CardContent>
          <p className="text-2xl font-semibold">
            {`${breakEvenTime} ${timeCalculationInput.frequencyUnit}`}
          </p>
          <p className="text-gray-500 mt-1">
            for time investment to break even
          </p>
        </CardContent>
      </Card>

    </div>
  );
}

export default Calculator;