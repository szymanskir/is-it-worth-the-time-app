import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";
import { Duration } from "luxon";

function getTimeUnitMultiplier(from: TimeUnit, to: TimeUnit): number {
    const assumendDaysInMonth = 30;
    const assumedDaysInYear = 365;
    const timeUnitInSeconds: Record<TimeUnit, number> = {
        [TimeUnit.Second]: 1,
        [TimeUnit.Minute]: 60,
        [TimeUnit.Hour]: 3600,
        [TimeUnit.Day]: 86400,
        [TimeUnit.Week]: 86400 * 7,
        [TimeUnit.Month]: 86400 * assumendDaysInMonth,
        [TimeUnit.Year]: 86400 * assumedDaysInYear
    };

    const fromInSeconds = timeUnitInSeconds[from];
    const toInSeconds = timeUnitInSeconds[to];

    if (fromInSeconds === undefined || toInSeconds === undefined) {
        throw new Error(`Unknown time unit: from=${from}, to=${to}`);
    }

    return fromInSeconds / toInSeconds;
}

function taskDurationtoDuration(taskDurationValue: number, taskDurationUnit: TimeUnit): Duration {
    switch(taskDurationUnit) {
        case TimeUnit.Second:
            return Duration.fromObject({ seconds: taskDurationValue });
        case TimeUnit.Minute:
            return Duration.fromObject({ minutes: taskDurationValue });
        case TimeUnit.Hour:   
            return Duration.fromObject({ hours: taskDurationValue });
        case TimeUnit.Day:
            return Duration.fromObject({ days: taskDurationValue });
        default:
            throw new Error(`Unknown task duration unit: ${taskDurationUnit}`)
    }
}


export function calculatePotentialSavedTime(calculationInput: TimeCalculationInput): number {
    const horizonInFrequencyUnits = calculationInput.horizonValue * getTimeUnitMultiplier(calculationInput.horizonUnit, calculationInput.frequencyUnit);
    const taskOccurenceCount = horizonInFrequencyUnits * calculationInput.frequencyValue;
    return taskDurationtoDuration(calculationInput.taskDuration, calculationInput.taskDurationUnit).as("seconds") * taskOccurenceCount;
}
