<h1>The project is created for Component Testing Training for Angular using Jasmine and Karma.</h1>

The tests included are Unit Testing, Component Testing and Integration Testing. Additional E2E Testing is done using Playwright to create a complete test project.
<br/>
The files to be used are:
<ul>
  <li>assets/employeedb.json - used for pseudo database</li>
  <li>auth.service.ts - This is the service file for login service api logic</li>
  <li>auth.service.spec.ts - unit testing for service</li>
  <li>login.component.ts and login.component.html - component and view</li>
  <li>login.componentunittest.spec.ts - unit testing for login component using Jasmine and Karma</li>
  <li>componenttest - component testing for login component using Jasmine and Karma</li>
  <li>login.integrationtest.spec.ts - integration testing for login component using Jasmine and Karma</li>
  <li>tests/login.e2e.spec.ts - E2E testing using Playwright</li>
</ul>

<b>Important Information</b>
<ul>
<li>In the terminal of VS Code run the command: npm install -g json-server to install json server. Next to run json server run the command: json-server --watch src/assets/emplyeedb.json</li>
<li>To install playwright under VS Code terminal, run the command: npm init playwright@latest</li>
</ul>
