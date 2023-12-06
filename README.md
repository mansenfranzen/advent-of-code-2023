# Advent of Code 2023

This repository contains solutions for the [Advent of Code 2023](https://adventofcode.com/2023) as a daily practice to learn JavaScript and its ecosystem (node.js, npm, eslint) while testing github Copilot for the first time.

## Comparison to Python

- Value (Python) vs reference (JS) equality tests
- Lack of builtin functionality such as `range`, or set operations like `difference`, `intersection` in JS
- Inheritance via classes (Python) vs prototypes (JS)
- Seeminlgy error prone implicit type conversions in JS:
  ```javascript
  1 + 2 + " foo" // => "3 foo"
  1 + (2 + " foo") // => "12 foo"
  1 + {} // => "1[object Object]"
  ```
- `undefined` everywhere instead raising proper exceptions in JS (e.g. access to non existing property)
- missing type hints in JS (though available in TypeScript)