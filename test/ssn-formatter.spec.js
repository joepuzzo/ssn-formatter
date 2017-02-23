const expect = require('chai').expect;
const assert = require('chai').assert;
const SSNFormatter = require('../lib/ssn-formatter.js');

describe('SSN Formatter', () => {


  describe( 'Parse', () => { 

    it('Parses SSN in default format', () => {
      const ssn = SSNFormatter.parse( '123444444' )
      expect( ssn.ssn ).to.deep.equal( ['1','2','3','4','4','4','4','4','4'] );
    });

    it('Parses SSN with dashes', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' )
      expect( ssn.ssn ).to.deep.equal( ['1','2','3','4','4','4','4','4','4'] );
    });

    it('Parses SSN when only a subset of values is provided', () => {
      const ssn = SSNFormatter.parse( '3-44-4', 'C-DE-F' )
      expect( ssn.ssn ).to.deep.equal( ['*','*','3','4','4','4','*','*','*'] );
    });

    it('Throws error when format length does not match ssn length', () => {
      const fn = () => { SSNFormatter.parse( '3-44-4', 'C-DE-FG' ) }
      assert.throws( fn, /Unable to parse ssn/ );
    });

    it('Throws error when ssn length does not match format length', () => {
      const fn = () => { SSNFormatter.parse( '3-44-', 'C-DE-F' ) }
      assert.throws( fn, /Unable to parse ssn/ );
    });

    it('Throws error when number of values does not mach number of format chars', () => {
      const fn = () => { SSNFormatter.parse( '3-44--', 'C-DE-F' ) }
      assert.throws( fn, /Unable to parse ssn/ );
    });

    it('Throws error when invaled format CHAR is provided', () => {
      const fn = () => { SSNFormatter.parse( '3-44-4', 'C-DE-K' ) }
      assert.throws( fn, /Unable to parse ssn.*Make sure/ );
    });

		it('Throws error when format string is in invalid order', () => {
      const fn = () => { 
        console.log( SSNFormatter.parse( '123-4', 'ABE-D' ) );
      } 
      assert.throws( fn, /Unable to parse ssn/ );
    });

		it('Throws error when duplicate format chars are provided', () => {
      const fn = () => { 
        console.log( SSNFormatter.parse( '123-44-4', 'ABC-DE-E' ) );
      } 
      assert.throws( fn, /Unable to parse ssn/ );
    });

    it('does NOT Throw error when invaled format CHAR is provided', () => {
      let ssn;
      const fn = () => { ssn = SSNFormatter.parse( '3-44-4', 'C-DEKF' ) }
      assert.doesNotThrow( fn, /Unable to parse ssn/ );
      expect( ssn.ssn ).to.deep.equal( ['*','*','3','4','4','4','*','*','*'] );
    });

  });

  describe( 'Gets', () => { 

    it('value', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' )
      expect( ssn.value ).to.equal( '123444444' );
    });


    it('area', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' )
      expect( ssn.area ).to.equal( '123' );
    });

    it('group', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' )
      expect( ssn.group ).to.equal( '44' );
    });

    it('serial', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' )
      expect( ssn.serial ).to.equal( '4444' );
    });

    it('area', () => {
      const ssn = SSNFormatter.parse( '3-44-4', 'C-DE-F' )
      expect( ssn.area ).to.equal( '**3' );
    });

    it('serial', () => {
      const ssn = SSNFormatter.parse( '3-44-444', 'C-DE-FGH' )
      expect( ssn.serial ).to.equal( '444*' );
    });

    it('group', () => {
      const ssn = SSNFormatter.parse( '4-4444', 'E-FGHI' )
      expect( ssn.group ).to.equal( '*4' );
    });

  });

  describe( 'Formats', () => {

    it('Masks values where M is provided', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' ).format('MMM-MM-MMMM');
      expect( ssn ).to.equal( '***-**-****' );
    });

    it('Shows values where V is provided', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' ).format('MMM-MM-VVVV');
      expect( ssn ).to.equal( '***-**-4444' );
    });

    it('Shows Nothing where N is provided', () => {
      const ssn = SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' ).format('NNN-MM-VVVV');
      expect( ssn ).to.equal( '-**-4444' );
    });

    it('Shows masked values when not all ssn values are provided', () => {
      const ssn = SSNFormatter.parse( '3-44-4', 'C-DE-F' ).format('VVV-VV-VVVV');
      expect( ssn ).to.equal( '**3-44-4***' );
    });
 
    it('Throws error when format string does not have all nessisary format characters', () => {
      const fn = () => { 
        SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' ).format('NNN-MM-VVV');
      } 
      assert.throws( fn, /Unable to format ssn. Format NNN-MM-VVV does not/ );
    });

    it('Throws error when format string has invalid format character', () => {
      const fn = () => { 
        SSNFormatter.parse( '123-44-4444', 'ABC-DE-FGHI' ).format('NNN-MM-VVVK');
      } 
      assert.throws( fn, /Unable to format ssn. Format NNN-MM-VVVK does not/ );
    });

  });

});
