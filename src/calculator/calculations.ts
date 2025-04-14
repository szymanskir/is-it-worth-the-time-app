import { TimeCalculationInput, TimeUnit } from "./TimeCalculationInput";
import { Duration } from "luxon";

function formDurationToLuxonDuration(formDurationValue: number, formDurationUnit: TimeUnit): Duration {
    switch(formDurationUnit) {
        case TimeUnit.Second:
            return Duration.fromObject({ seconds: formDurationValue });
        case TimeUnit.Minute:
            return Duration.fromObject({ minutes: formDurationValue });
        case TimeUnit.Hour:   
            return Duration.fromObject({ hours: formDurationValue });
        case TimeUnit.Day:
            return Duration.fromObject({ days: formDurationValue });
        case TimeUnit.Week:
            return Duration.fromObject({ weeks: formDurationValue });
        case TimeUnit.Month:
            return Duration.fromObject({ months: formDurationValue });
        case TimeUnit.Year:
            return Duration.fromObject({ years: formDurationValue });
        default:
            throw new Error(`Unknown task duration unit: ${formDurationUnit}`)
    }
}


export function calculatePotentialSavedTime(calculationInput: TimeCalculationInput, outputUnit: TimeUnit = TimeUnit.Second): number {
    const horizonInFrequencyUnits = formDurationToLuxonDuration(calculationInput.horizonValue, calculationInput.horizonUnit).as(calculationInput.frequencyUnit);
    const taskOccurenceCount = horizonInFrequencyUnits * calculationInput.frequencyValue;
    const taskDurationInResultUnits = formDurationToLuxonDuration(calculationInput.taskDuration, calculationInput.taskDurationUnit).as(outputUnit)
    return Math.trunc(taskDurationInResultUnits * taskOccurenceCount);
}
