var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function(){
    beforeEach(function settingRoles(){
        console.log('running before each');
        authController.setRoles(['user']);
    });
    describe('isAuthorized', function(){
        it('Should return false if not authorized', function(){
            var isAuth = authController.isAuthorized('admin');
            expect(isAuth).to.be.false;
        })
        it('Should return true is authorized', function(){
            authController.setRoles(['admin', 'user']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        })
    })
    describe.skip('isAuthorizedAsync', function(){
        it('Should return false if not authorized', function(done){
            this.timeout(2500);
            authController.isAuthorizedAsync('admin',
                function(isAuth){
                    assert.equal(true, isAuth);
                    done();
                });
        })
    })
    describe('isAuthorizedPromise', function(){
        it('Should return false if not authorized', function(){
            return authController.isAuthorizedPromise('admin').should.eventually.be.true;
        })
    })
    describe('setRoles', function(){
        it('Should return false if not authorized', function(done){
            this.timeout(2500);
            authController.isAuthorizedAsync(['user'], 'admin',
                function(isAuth){
                    assert.equal(true, isAuth);
                    done();
                });
        })
    })
});
