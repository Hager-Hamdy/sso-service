const mockery = require("mockery");
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});

const stringHelper = require("./helpers/string.js");
mockery.registerMock("./helpers/string.js", stringHelper);

mockery.registerMock("nodemailer", require("nodemailer-mock"));