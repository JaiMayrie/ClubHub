const bcrypt = require("bcrypt");
bcrypt.hash("Password123!", 12).then(console.log);
