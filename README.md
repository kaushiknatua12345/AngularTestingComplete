# Component Testing Training for Angular using Jasmine and Karma

The tests included are Unit Testing, Component Testing and Integration Testing. Additional E2E Testing is done using Playwright to create a complete test project.

## Project Files

- **assets/employeedb.json** - used for pseudo database
- **auth.service.ts** - This is the service file for login service api logic
- **auth.service.spec.ts** - unit testing for service
- **login.component.ts** and **login.component.html** - component and view
- **login.componentunittest.spec.ts** - unit testing for login component using Jasmine and Karma
- **componenttest** - component testing for login component using Jasmine and Karma
- **login.integrationtest.spec.ts** - integration testing for login component using Jasmine and Karma
- **tests/login.e2e.spec.ts** - E2E testing using Playwright

## Important Information

- To install all needed dependencies, execute: `npm ci`
- In the terminal of VS Code run the command: `npm install -g json-server` to install json server. Next to run json server run the command: `json-server --watch src/assets/emplyeedb.json`
