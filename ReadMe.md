<p align="center">
  **#Cypress Test Automation Framework Documentation**
</p>

***

**#Table of contents**
1.	Introduction
2.	Framework Overview
3.	Installation
4.	Configuration
5.	Folder Structure
6.	Creating Page Objects
7.	Writing Tests
8.	Running Tests
9.	Custom Commands
10.	Best Practices

***

**#Introduction**

Cypress is a JavaScript end-to-end testing framework that provides a fast, reliable, and easy-to-use tool for testing web applications. This documentation outlines the structure and usage of a Cypress test automation framework for Cypress Real World App (RWA), an example payment application that demonstrates real-world usage of Cypress testing methods, patterns, and workflows.

***

**#Framework Overview**

*Language used:* Scripting language I have chosen here is JavaScript

*Design pattern:* Design pattern which is followed for this framework is Page Object Model design pattern. The Page Object Model (POM) is a design pattern that promotes the creation of reusable page objects to represent the structure and behaviour of the web pages under test. This helps in maintaining clean and manageable test code.

*Reporting:* As reporting tool, I have made use of Cypress-Mochawesome-Reporter. This reporter enhances your testing experience by providing visually appealing and insightful HTML reports. With customizable options, you can tailor the reports to meet your specific requirements, making test analysis and debugging more efficient. 

*IDE:* I have used VS code as my IDE for scripting and configuration purpose.

*Extra features implemented:* As part of this assignment, I have implemented a feature to take screenshots for the failed test cases and videos for the test execution and embedded it to the report generated for failed test cases. This is completely configurable through **cypress.config.ts** configuration file.

***

**#Installation**

**##1. Pre-requisites:**

•	Node.js -You will need to install Node.js if not already installed on your computer. Make sure that you download the “LTS” version of Node and not the “Current” version.
•	Install npm or yarn- npm gets automatically installed once you install Node.js. If you are using yarn then install Yarn through the npm package manager using command:

```shell
_npm install yarn@latest -g_
```

>	**Note: I will be using npm commands going forward.**


1.	Setup your project: 
•	Clone the Git repository from: URL 
•	Import the project folder to VS code
•	Open a new terminal in VS code proceed further steps.

2.	Install Cypress in your project as a dev dependency:

```shell
_npm install cypress --save-dev_
```

3.	Opening Cypress: To open the cypress test runner interaction ui and to configure the e2e/component testing env and the browser to execute the tests, execute the command below:

```shell
_npx cypress open_
```

This will open the cypress test runner and list all the spec files which are all the tests or test suites which can be executed

***

**#Configuration**

The Cypress configuration is typically located in config.cypress.ts file. Here I have added some configurations required for mochawesome-reporter, taking screenshots and recording video for the test executions.

***

**#Folder Structure**

Below is the project folder structure followed. Please note that I have shown only the files I have created or edited for this assignment

cypress/
  <br>├── pageObjects/
  <br>├── tests/
  <br>├── support/
  <br>│   ├── commands.js
  <br>│   ├── GlobalConstants.js
  <br>│   └── e2e.js
  <br>├── reports/
<br>cypress.config.ts
<br>package.json


•	pageObjects: Contains all the POM files for Login/Signup, Transactions, Notification and Dashboard screens
•	tests: Contains all the test suites as part of this assignment
•	support: Contains custom commands and global configurations.
•	reports: Contains generated test reports along with screenshots and video recordings

***

**#Creating Page Objects**

Page objects represent the web pages and their elements. Create a **pageObjects** directory under **cypress** and define page objects for each web page. Each page object file is a class in which corresponding page elements are defined and imported so that all these elements can be utilized in any test spec files by creating an instance of the page object class. Below are the page object files created in this assignment:

•	DashboardPage.js
•	LoginSignupPage.js
•	NotificationsPage.js
•	TransactionPage.js

***

**#Writing tests**

Tests are written in the cypress/tests folder. All the test cases written in each spec files are independent of each other. Here I have utilized the page objects defined in page object files mentioned above to interact with the application. **Before()** method is utilized in tests to seed the database before each spec file run and also to load the test data from **databse.json** to an object variable which is utilized further in the tests. Below are the tests written and the scenarios or test cases covered for each test.


*   **UserAuthentication.spec.js:** Here for initial signup and login am reading the signup and login details from **GlobalConstants.js** file which I have created for storing all the static variable that does not change for the entire framework. I have verified the below scenarios:

    1.	User navigation to verification page
    2.	User navigation to signup page on click of signup link
    3.	User is able to do signup successfully
    4.	User who has signed up is able to login to the application and complete the onboarding process successfully and logout successfully
    5.	Verification of error messages displayed for invalid login attempts

*	**Transaction.spec.js:** Here I have verified these scenarios:

    1.	User is able to initiate a payment and complete the payment. Also, the account balances before and after the transaction is verified as well as the transaction history details.

*	**Notifications.spec.js:** To verify the notifications, initially am using **cy.intercept()** to mock the API responses for creating a transaction. This creates pay and request pay transactions to trigger notifications. Here I have verified the below scenarios:

    1.	User is receiving payment received notification 
    2.	User is receiving payment requested notification
    3.	User is able to dismiss all the notification and the notification won’t reappear once the user logout and login again

*	**DashboardUI.spec.js:** Here I have verified the below scenarios:

    1.	Verified whether any broken links are there in the dashboard page by getting all the anchor tags and retrieving the href attribute and making use of *cy.request()**method to verify the status code is 200 or not 	
    2.	Verified the header section for the presence of buttons and tabs. Tab names are passed from GlobalConstants.js file and verified against the tab names present in the application.
    3.	Verified the navigation menu section for the presence of buttons and different menu items. Menu item names are passed from GlobalConstants.js file and verified against the menu item names present in the application.
    4.	Verified whether contents are present for each tab by navigating to each tab


>PS: Since add new contact functionality was not present in the application, I have skipped that after consulting with Paddy. If that functionality existed in application, then I would have followed this approach:
>   1.	User navigation to contact creation screen
>   2.	User is able to add a contact successfully and that contact is appearing in the contact list
>   3.	Verify the contacts details created are the same as passed during contact creation
>   4.	Making a new payment transaction to the newly created contact and verifying the transaction history and account balances for both sender and receiver.

***

**#Running tests**

Execute the below command in IDE terminal to run the application first:
```shell
-npm run dev-
```

We can either run the test from Cypress test runner interactive mode or from IDE terminal itself. 

> **Please note that to generate reports, we need to run from terminal and not from Cypress test runner interactive mode.**

**Interactive mode:**To open Interactive mode, use the below command in terminal:
```shell
_npx cypress open_
```

This command will open up the cypress test runner and list all the spec files which are all the tests or test suites which can be executed. Just click on any spec file and execution will start in headed mode by launching the browser session.

Headed mode: Running the test in headed mode will ensure that we can see the test execution happening in browser
```shell
_npx cypress run --browser browsername –headed_
```
Headless mode: Running the test in headless mode, we will not be able to see the test execution in browser
```shell
_npx cypress run --browser browsername_
```
To run a specific spec file use the below command:
```shell
_npx cypress run --spec relativePathOfSpecFile --browser browsername –headed_
```
> **Once the test runs are completed, Execution report will be generated in cypress/reports folder. Sample reports as provided in reports folder for both failure and passed scenarios**

***

**#Custom Commands**

We can define custom commands in cypress/support/commands.js to reuse common logic. Below are the custom commands I have created and the use of it:

**userLogin function:** The custom command userLogin is designed to automate the login process for a user by navigating to the homepage, verifying the presence of the login form, and submitting the user's credentials.

**userLogout function:** The custom command userLogout automates the process of logging out a user from the application. This command verifies the visibility of the logout button, performs the logout action, and confirms that the user is redirected to the sign-in page.

**createNewTransaction function:** The custom command createNewTransaction automates the creation of a new transaction within the application. It logs the transaction details, interacts with the application's transaction service, and create a payment transaction.

***

**#Best Practices followed**

**Code reuse:** Avoided repeating code by creating reusable page objects and custom commands.

**Organize Tests:** Grouped related tests into files and folders within cypress/tests.

**Clear and meaningful Naming Conventions:** Used meaningful names for test cases and page objects to improve readability.

**Clean State:** Ensured tests start from a clean state to avoid dependencies between tests.

**Detailed Reporting:** Leverage the Cypress-Mochawesome-reporter for detailed and easy-to-read test reports with screenshot and video attached for failed test cases.


