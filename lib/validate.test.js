'use strict';

var chai = require('chai');
chai.should();

var validate = require('./validate');

describe('validate', function () {

  describe('phonenumber', function () {
    it('should not allow 6 numbers', function () {
      validate.phonenumber('123456').should.be.false;
    });
  });

  describe('phonenumber', function () {
    it('should not allow 6 numbers and dash and other things', function () {
      validate.phonenumber('1234-56').should.be.false;
    });
  });
  describe('phonenumber', function () {
    it('should allow 7 numbers', function () {
      validate.phonenumber('1234567').should.be.true;
    });
  });
  describe('phonenumber', function () {
    it('should allow 7 numbers and dash and other things', function () {
      validate.phonenumber('1234-567').should.be.true;
    });
  });
  describe('isPlace', function () {
    it('should not allow string thad is not inn the array', function () {
      validate.isPlace('Gunnar').should.be.false;
    });
  });
  describe('isPlace', function () {
    it(' Isplace should be caseSensitive', function () {
      validate.isPlace('reykjavík').should.be.false;
    });
  });
  describe('isPlace', function () {
    it(' should be true if  the sting is in the array', function () {
      validate.isPlace('Reykjavík').should.be.true;
    });
  });
  describe('request', function () {
    it(' should be false if string is not in array', function () {
      validate.request('Reykjavík').should.be.false;
    });
  });
  describe('request', function () {
    it(' should be true if  the sting is in the array', function () {
      validate.request('Farþegum').should.be.true;
    });
  });
  describe('numberOfSeats', function () {
    it(' should be false if number is not in array', function () {
      validate.numberOfSeats('11').should.be.false;
    });
  });
  describe('request', function () {
    it(' should be true if  the number is in the array', function () {
      validate.numberOfSeats("8").should.be.true;
    });
  });

   describe('checkDate', function () {
    it(' should allow date in the future', function () {
      validate.checkDate("24/12/2015").should.be.true;
    });
  });

   describe('checkDate', function () {
    it(' should allow date in the future where year >>>', function () {
      validate.checkDate("01/01/2089").should.be.true;
    });
  });

   describe('checkDate', function () {
    it(' should allow date in the future where month is greater', function () {
      validate.checkDate("01/12/2015").should.be.true;
    });
  });

    describe('checkDate', function () {
    it(' should not allow date thad has passed', function () {
      validate.checkDate("10/10/2015").should.be.false;
    });
  });
});
