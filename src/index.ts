import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import DiceExpression from 'dice-expression-evaluator';
import {calculateDegreeOfSuccess, DegreeOfSuccess} from "./degree-of-success";

function getInputValue(id: string): string {
    const elem = document.getElementById(id) as HTMLInputElement;
    return elem.value;
}

function getInputNumber(id: string): number {
    return parseInt(getInputValue(id), 10);
}

interface State {
    atk: number;
    atkBonus: number;
    map1: number;
    map2: number;
    formula: string;
    ac: number;
    acBonus: number;
}

function calculateDamageModifier(dieValue: number, modifier: number, ac: number): 0 | 1 | 2 {
    const degree = calculateDegreeOfSuccess({
        modifier,
        dieValue,
    }, ac)
    if (degree === DegreeOfSuccess.CRITICAL_SUCCESS) {
        return 2;
    } else if (degree === DegreeOfSuccess.SUCCESS) {
        return 1;
    } else {
        return 0;
    }
}

function calculateDamage(atk: number, ac: number, damage: number): number {
    return Array.from({length: 20}, (_, i) => i + 1)
        .map(roll => calculateDamageModifier(roll, atk, ac) * damage)
        .reduce((a, b) => a + b, 0) / 20;
}

function calculateDamages(state: State): number[] {
    const atk = state.atk + state.atkBonus;
    const ac = state.ac + state.acBonus;
    const formula = new DiceExpression(state.formula);
    const damage = Math.ceil((formula.min() + formula.max()) / 2);
    return [atk, atk + state.map1, atk + state.map2]
        .map(atkBonus => calculateDamage(atkBonus, ac, damage));
}

function render() {
    const state = {
        atk: getInputNumber('atk'),
        atkBonus: getInputNumber('atk-bonus'),
        map1: getInputNumber('map1'),
        map2: getInputNumber('map2'),
        formula: getInputValue('formula'),
        ac: getInputNumber('ac'),
        acBonus: getInputNumber('ac-bonus')
    };
    const values = calculateDamages(state)
    const cells = Array.from(document.querySelectorAll('#result td')) as HTMLTableDataCellElement[];
    values.forEach((value, index) => cells[index].innerText = value.toString())
}

document.addEventListener("DOMContentLoaded", function () {
    render();
    Array.from(document.querySelectorAll('input'))
        .forEach(elem => elem.addEventListener('change', render));
});

