# SSN Formatter

## Installation

```
npm install --save ssn-formatter
```

## Usage

The ssn formatter accepts an ssn string and an optional format string as parameters.

### SSN

`SSNFormatter.parse( ... )` will return an SSN object.

You can get the parts of the SSN as follows

```
const SSNFormatter = require('ssn-formatter');

var ssn = SSNFormatter.parse( '123444444' );

console.log( ssn.value );  // output: 123444444
console.log( ssn.area );   // output: 123
console.log( ssn.group );  // output: 44
console.log( ssn.serial ); // output: 4444
```

### Parsing

The second argument describes the format of the ssn string you provide as the first argument. It must contain a subset of the following strings `ABCDEFGHI`.

```
const SSNFormatter = require('ssn-formatter');

var a = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' );
var b = SSNFormatter.parse( '3-44-4', 'C-DE-F' );
var c = SSNFormatter.parse( '3 44 4', 'C DE F' );
var d = SSNFormatter.parse( '123444444', 'ABCDEFGHI' );
var e = SSNFormatter.parse( '123444444' );

console.log( a.value );
console.log( b.value );
console.log( c.value );
console.log( d.value );
console.log( e.value );

// Produces
123444444
**3444***
**3444***
123444444
123444444

```

### Formating Example

```
const SSNFormatter = require('ssn-formatter');

var a = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' ).format( 'MMM-MM-VVVV' );
var b = SSNFormatter.parse( '3-44-4', 'C-DE-F' ).format( 'VVV-MM-VVVV' );
var c = SSNFormatter.parse( '3 44 4', 'C DE F' ).format( 'MMM-VV-MMMM' );
var d = SSNFormatter.parse( '123444444', 'ABCDEFGHI' ).format( 'VVV-VV-MMMM' );
var e = SSNFormatter.parse( '123444444' );

console.log( a );
console.log( b );
console.log( c );
console.log( d );
console.log( e.format( 'VVV-VV-VVVV' ) );
console.log( e.format( 'NNNNNVVVV' ) );

// Produces

***-**-4444
**3-**-4***
***-44-****
123-44-****
123-44-4444
1234

```
