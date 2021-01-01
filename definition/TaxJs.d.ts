
interface TaxJs {
    calculate() : void;
    initInputs() : void;
    setBig(name: String, value : Big) : void;
    setNumber(name: String, value : number) : void;
    getBig(name: String) : Big;
    getNumber(name: String) : number;
    getInputs() : String[];
    getOutputs() : String[];
}
