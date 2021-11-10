import Big from 'big.js';

type TaxJsValueTypeString = "number" | "Big";
type TaxJsValueType = number | Big;
type TaxJsDirection = "input" | "output";
type TaxJsDictionary = Readonly<Partial<Record<string, Readonly<TaxJsTypeDescription>>>>;
type TaxJsOutputGroup = "STANDARD" | "DBA";

interface TaxJs<IN_BIG, IN_NUMBER, OUT> {
    calculate() : void;
    initInputs() : void;
    set(name: IN_BIG | IN_NUMBER, value : number) : void;
    get(name: IN_BIG | IN_NUMBER | OUT) : TaxJsValueType;
    getDirectory() : TaxJsDictionary;
    toType(name: string, value: TaxJsValueType): TaxJsValueType;
}

interface TaxJsTypeDescription {
    type: TaxJsValueTypeString,
    direction: TaxJsDirection,
    group?: TaxJsOutputGroup
}
