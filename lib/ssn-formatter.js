/* -------------- SSN --------------- */
class SSN {

  constructor( ssn = new Array(9).fill('*') ){
    this.ssn = ssn;
  }

  format( fmt ){
    return SSNFormatter.format( this.ssn, fmt );
  }

  get area(){
    return this.ssn.slice(0,3).join('');
  }

  get group(){
    return this.ssn.slice(3,5).join('');
  }

  get serial(){
    return this.ssn.slice(5,10).join('');
  }

  get value(){ 
    return this.ssn.join('');
  }

}


/* ---------- SSNFormatter ---------- */
class SSNFormatter {

  static getIndex( char ){
    const format = {
      'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8
    };
    return format[char];
  }

  static validateInputFormat( ssn, format ){
    // Validate lenghts match
    if( ssn.length != format.length ) {
      throw new Error(`Unable to parse ssn. Format ${format} does not match value ${ssn}.`);
    }
    // Validate number of values match
    if( ssn.match(/[0-9]/g).length != format.match(/[ABCDEFGHI]/g).length ){
      throw new Error(`Unable to parse ssn. Format ${format} does not match value ${ssn}. Make sure you provided the correct format characters "ABCDEFGHI"`);
    }
    // Validate there are no duplicates and the values are in correct order
    if( ! format.match(/[ABCDEFGHI]/g).join('').match(/^A{0,1}B{0,1}C{0,1}D{0,1}E{0,1}F{0,1}G{0,1}H{0,1}I{0,1}$/) ){ 
      throw new Error(`Unable to parse ssn. Format ${format} does not match value ${ssn}. Make sure you provided the correct format characters "ABCDEFGHI"`);
    }
  }

  static validateOutputFormat( format ){
    // Validate output format includes 9 conversion characters
    if( format.match(/[MNV]/g).length != 9 ) {
      throw new Error(`Unable to format ssn. Format ${format} does not include all conversion characters`);
    }
  }

  // Parses ssn from given format
  static parse( str , format = 'ABCDEFGHI' ){
    // Validate format
    SSNFormatter.validateInputFormat( str, format );
    // Remove any non numeric characters
    const numbers = str.replace(/[^0-9]/g, '');
    // Remove any non format characters
    const letters = format.replace(/[^ABCDEFGHI]/g, '');
    // Fill in the SSN based on the format
    const ssn = new SSN();
    letters.split('').forEach( ( val, index ) => {
      ssn.ssn[ SSNFormatter.getIndex( val ) ] = numbers[index];
    });
    return ssn;
  }

  static format( ssn, format ){
    // Validate output format
    SSNFormatter.validateOutputFormat( format );
    // Iterate through format and replace values
    let count = 0;
    return format.split('').map( ( val, i ) => {
      if( val === 'M' ){
        // Incriment bevause we encountered a format variable
        count++;
        return "*";
      }
      if( val === 'V' ){
        // Return ssn value if there is one otherwise return mask
        return ssn[count++] || '*';
      }
      if( val === 'N' ){
        // Return ssn value if there is one otherwise return mask
        count++;
        return '';
      }
      return val;
    }).join('');
  }

}

module.exports = SSNFormatter;
