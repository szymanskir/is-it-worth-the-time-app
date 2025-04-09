import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

function Calculator() {
  return (
    <div className="calculator">
      <div className="input-group flex items-center gap-4 mb-4">
        <label htmlFor="horizon-value" className="w-1/3">Task Horizon:</label>
        <input
          id="horizon-value"
          type="number"
          min="1"
          placeholder="Enter a positive number"
          className="input border rounded px-2 py-1 w-1/3"
        />
        <Select>
          <SelectTrigger className="w-1/3 border rounded px-2 py-1">
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

      <div className="input-group flex items-center gap-4 mb-4">
        <label htmlFor="frequency-value" className="w-1/3">How Often You Do the Task:</label>
        <input
          id="frequency-value"
          type="number"
          min="1"
          placeholder="Enter a positive number"
          className="input border rounded px-2 py-1 w-1/3"
        />
        <Select>
          <SelectTrigger className="w-1/3 border rounded px-2 py-1">
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
        <label htmlFor="task-duration" className="w-1/3">Task Duration:</label>
        <input
          id="task-duration"
          type="number"
          min="1"
          placeholder="Enter time in minutes"
          className="input border rounded px-2 py-1 w-2/3"
        />
      </div>
      <div className="flex items-right justify-end gap-4 mb-4">
        <Button variant="outline">Calculate</Button>
      </div>
    </div>
  )
}

export default Calculator