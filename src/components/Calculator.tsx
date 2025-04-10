import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

function Calculator() {
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
        />
        <Select>
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Days</SelectItem>
            <SelectItem value="weeks">Weeks</SelectItem>
            <SelectItem value="months">Months</SelectItem>
            <SelectItem value="years">Years</SelectItem>
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
        />
        <Select>
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Per Day</SelectItem>
            <SelectItem value="week">Per Week</SelectItem>
            <SelectItem value="month">Per Month</SelectItem>
            <SelectItem value="year">Per Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="input-group flex items-center gap-4 mb-4">
      <label htmlFor="task-duriation" className="w-2xs text-left">How long does it take?</label>
        <input
          id="task-duration"
          type="number"
          min="1"
          placeholder="15"
          className="input border rounded px-2 py-1 w-32"
        />
        <Select>
          <SelectTrigger className="w-44 border rounded px-2 py-1">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="second">Seconds</SelectItem>
            <SelectItem value="minute">Minutes</SelectItem>
            <SelectItem value="hour">Hours</SelectItem>
            <SelectItem value="day">Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-right justify-end gap-4 mb-4">
        <Button variant="outline">Calculate</Button>
      </div>
    </div>
  )
}

export default Calculator