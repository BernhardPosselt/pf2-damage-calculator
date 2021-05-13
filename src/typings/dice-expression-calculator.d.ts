declare module 'dice-expression-evaluator' {

    declare class DiceExpression {
        constructor(formula: string);
        min(): number;
        max(): number;
    }

    export default DiceExpression;
}
