import { describe, it, expect } from 'vitest';
import { FrequencyUnit, HorizonUnit, TaskDurationUnit } from './TimeCalculationInput';
import { calculatePotentialSavedTime } from './calculations';

describe('calculatePotentialSavedTime', () => {
    it("should return 0 if task takes 0 time", () => {
        const input = {
            horizonValue: 1,
            horizonUnit: HorizonUnit.Days,
            frequencyValue: 1,
            frequencyUnit: FrequencyUnit.PerDay,
            taskDuration: 0,
            taskDurationUnit: TaskDurationUnit.Seconds
        };
        const result = calculatePotentialSavedTime(input);
        expect(result).toBe(0);
    })

    it("should return the task duration if it will be performed only once", () => {
        const input = {
            horizonValue: 1,
            horizonUnit: HorizonUnit.Days,
            frequencyValue: 1,
            frequencyUnit: FrequencyUnit.PerDay,
            taskDuration: 30,
            taskDurationUnit: TaskDurationUnit.Seconds
        };
        const result = calculatePotentialSavedTime(input);
        expect(result).toBe(30);
    })

    it("should return results in seconds", () => {
        const input = {
            horizonValue: 1,
            horizonUnit: HorizonUnit.Days,
            frequencyValue: 1,
            frequencyUnit: FrequencyUnit.PerDay,
            taskDuration: 1,
            taskDurationUnit: TaskDurationUnit.Minutes
        };
        const result = calculatePotentialSavedTime(input);
        expect(result).toBe(60);
    })

    it("should return 5 minutes for a 1 minute task done every day for 5 days", () => {
        const input = {
            horizonValue: 5,
            horizonUnit: HorizonUnit.Days,
            frequencyValue: 1,
            frequencyUnit: FrequencyUnit.PerDay,
            taskDuration: 1,
            taskDurationUnit: TaskDurationUnit.Minutes
        };
        const result = calculatePotentialSavedTime(input);
        expect(result).toBe(300);
    })
});