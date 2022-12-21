# TaxJs [![Node.js CI](https://github.com/taxcalcs/taxjs/actions/workflows/node.js.yml/badge.svg)](https://github.com/taxcalcs/taxjs/actions/workflows/node.js.yml) [![CodeQL](https://github.com/taxcalcs/taxjs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/taxcalcs/taxjs/actions/workflows/codeql-analysis.yml) [![NPM](https://nodei.co/npm/taxjs.png?mini=true)](https://npmjs.org/package/taxjs)


TaxJs is a typescript and javascript library to calculate german tax.

The code is generated from pseudo code from https://www.bmf-steuerrechner.de/

Test page: https://taxcalcs.github.io/taxjs-test/

## Usage

```
let tax = new Lohnsteuer2021Big();
tax.initInputs();

tax.setLZZ(2); // Lohnzahlungszeitraum
tax.setKVZ(1.3); // Einkommensbezogener Zusatzbeitragssatz
tax.setSTKL(1); // Steuerklasse
tax.setPVZ(1); // Zuschlag soziale Pflegeversicherung
tax.setRE4(new Big(1234500)); // Steuerpflichtiger Arbeitslohn in Cent

tax.calculate();

tax.getLSTLZZ().toNumber(); // Lohnsteuer in Cent

```
You can find all fields on the [test page](https://taxcalcs.github.io/taxjs-test/).

## Dependencies

As replacement for the Java BigDecimal class the library [big.js](https://www.npmjs.com/package/big.js) and the typescript definition [@types/big.js](https://www.npmjs.com/package/@types/big.js) are used. 

## Development

For convert xslt file into xslt sef file you have to install [xslt3](https://www.npmjs.com/package/xslt3).

````
npm install -g  xslt3
````
and
````
npm run compile-xsl
````

For compile typscript into javascript you have to install [typescript](https://www.npmjs.com/package/typescript).

````
npm install -g  typescript
````
