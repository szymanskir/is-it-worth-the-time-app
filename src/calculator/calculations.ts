import { HorizonUnit, TaskDurationUnit, TimeCalculationInput } from "./TimeCalculationInput";
import { Duration } from "luxon";

function horizonToDuration(horizonValue: number, horizonUnit: HorizonUnit): Duration {
    switch (horizonUnit) {
        case HorizonUnit.Days:
            return Duration.fromObject({ days: horizonValue });
        case HorizonUnit.Weeks:
            return Duration.fromObject({ weeks: horizonValue })
        case HorizonUnit.Months:
            return Duration.fromObject({ months: horizonValue })
        case HorizonUnit.Years:
            return Duration.fromObject({ years: horizonValue })
        default:
            throw new Error(`Unknown horizon unit: ${horizonUnit}`)
    }
}

function taskDurationtoDuration(taskDurationValue: number, taskDurationUnit: TaskDurationUnit): Duration {
    switch(taskDurationUnit) {
        case TaskDurationUnit.Seconds:
            return Duration.fromObject({ seconds: taskDurationValue });
        case TaskDurationUnit.Minutes:
            return Duration.fromObject({ minutes: taskDurationValue });
        case TaskDurationUnit.Hours:   
            return Duration.fromObject({ hours: taskDurationValue });
        case TaskDurationUnit.Days:
            return Duration.fromObject({ days: taskDurationValue });
        default:
            throw new Error(`Unknown task duration unit: ${taskDurationUnit}`)
    }
}


export function calculatePotentialSavedTime(calculationInput: TimeCalculationInput): number {
    const taskOccurenceCount = calculationInput.horizonValue / calculationInput.frequencyValue;
    return taskDurationtoDuration(calculationInput.taskDuration, calculationInput.taskDurationUnit).as("seconds") * taskOccurenceCount;
}