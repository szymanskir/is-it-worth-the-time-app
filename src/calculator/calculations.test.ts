import { describe, it, expect } from 'vitest';
import { TimeCalculationInput, TimeUnit } from './TimeCalculationInput';
import { calculatePotentialSavedTime } from './calculations';


type CalculationScenario = TimeCalculationInput & {
    expected: number;
};


describe('calculatePotentialSavedTime', () => {
    it.each`
        horizonValue | horizonUnit     | frequencyValue | frequencyUnit     | taskDuration | taskDurationUnit   | expected
        ${1}         | ${TimeUnit.Day} | ${1}           | ${TimeUnit.Day}   | ${0}         | ${TimeUnit.Minute} | ${0}
        ${1}         | ${TimeUnit.Day} | ${1}           | ${TimeUnit.Day}   | ${30}        | ${TimeUnit.Second} | ${30}
        ${1}         | ${TimeUnit.Day} | ${1}           | ${TimeUnit.Day}   | ${1}         | ${TimeUnit.Minute} | ${60}
        ${5}         | ${TimeUnit.Day} | ${1}           | ${TimeUnit.Day}   | ${1}         | ${TimeUnit.Minute} | ${300}
        ${14}        | ${TimeUnit.Day} | ${2}           | ${TimeUnit.Week}  | ${1}         | ${TimeUnit.Minute} | ${240}
    `(`should return $expected seconds for a $taskDuration $taskDurationUnit 
        task done $frequencyValue per $frequencyUnit for $horizonValue $horizonUnit`, (calculationScenario : CalculationScenario) => {
        const { expected, ...calculationInput  } = calculationScenario;
        const result = calculatePotentialSavedTime(calculationInput);
        expect(result).toBe(expected);
    });
});