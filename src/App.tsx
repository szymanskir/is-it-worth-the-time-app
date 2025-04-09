import './App.css'
import { Button } from './components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'

function App() {

  return (
    <>
      <Button variant="outline">Button</Button>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

export default App
