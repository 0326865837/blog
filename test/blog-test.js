var expect = require("chai").expect;
var apiModel = require("../lib/mysql.js");

describe("add User", function () {
  // Create User
  before((done) => {
    apiModel.insertData(["wclimb", "123456", "avator", "time"]).then(() => {
      done();
    });
  });
  // Delete User
  after((done) => {
    apiModel.deleteUserData("wclimb").then(() => {
      done();
    });
  });
  // Find User
  it('should return an Array contain {} when find by name="wclimb"', (done) => {
    apiModel
      .findUserData("wclimb")
      .then((user) => {
        var data = JSON.parse(JSON.stringify(user));
        console.log(data);
        expect(data).to.have.lengthOf(1);
        done();
      })
      .catch((err) => {
        if (err) {
          return done(err);
        }
      });
  });
});
