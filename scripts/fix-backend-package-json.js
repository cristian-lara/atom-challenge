const fs = require('fs');
const path = require('path');

const pkg = {
  name: "backend",
  version: "0.0.1",
  "types": "./src/main.d.ts",
  "main": "./src/main.js",
  dependencies: {
    express: "^4.21.2",
    cors: "^2.8.5",
    "firebase-admin": "^13.3.0",
    "firebase-functions": "^6.3.2",
    "class-validator": "^0.14.2",
    "class-transformer": "^0.5.1"
  },
  engines: {
    node: "22"
  }
};

fs.writeFileSync(
  path.join(__dirname, '../dist/apps/backend/package.json'),
  JSON.stringify(pkg, null, 2)
);
console.log('package.json corregido en dist/apps/backend'); 