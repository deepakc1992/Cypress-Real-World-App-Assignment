
import { pick } from "lodash/fp";
import LoginSignup from "../pageObjects/LoginSignupPage.js";
import Dashboard from "../pageObjects/DashboardPage.js";

const ln = new LoginSignup();
const dash = new Dashboard();

/**
    * @Author: Deepak
    * @Test_Method: This is a common function designed to automate the login process for a user by navigating 
    * to the homepage, verifying the presence of the login form, and submitting the user's credentials
    * @Parameters: username and password as String
    * @UpdatedBy:
    */
Cypress.Commands.add('userLogin', (username, password) => {
  cy.visit("/");
  cy.get(ln.lblSignInOrSignUp).should('have.text', 'Sign in');
  cy.get(ln.txtUserName).type(username);
  cy.get(ln.txtPassword).type(password);
  cy.get(ln.btnSignInSubmit).should('be.visible').should('be.enabled').click();
});

/**
     * @Author: Deepak
     * @Test_Method: This function automates the process of logging out a user from the application. 
     * This command verifies the visibility of the logout button, performs the logout action, and 
     * confirms that the user is redirected to the sign-in page
     * @Parameters: None
     * @UpdatedBy:
     */
Cypress.Commands.add('userLogout', () => {
  cy.get(dash.btnLogout).should('be.visible').click();
  cy.get(ln.lblSignInOrSignUp).should('have.text', 'Sign in');
});

/**
     * @Author: Deepak
     * @Test_Method: This function automates the creation of a new transaction within the application.
     * It logs the transaction details, interacts with the application's transaction service, 
     * and create a payment transaction.
     * @Parameters: Payload as object
     * @UpdatedBy:
     */
Cypress.Commands.add("createNewTransaction", (payload) => {
  const log = Cypress.log({
    name: "createTransaction",
    displayName: "CREATE NEW TRANSACTION",
    message: [`(${payload.transactionType}): ${payload.sender.id} <> ${payload.receiver.id}`],
    autoEnd: false,
    consoleProps() {
      return payload;
    },
  });
  return cy
    .window({ log: false })
    .then((request) => {
      log.snapshot("before");
      request.createTransactionService.send("SET_USERS", payload);
      const createPayload = pick(["amount", "description", "transactionType"], payload);
      return request.createTransactionService.send("CREATE", {
        ...createPayload,
        senderId: payload.sender.id,
        receiverId: payload.receiver.id,
      });
    })
    .then(() => {
      log.snapshot("after");
      log.end();
    });
});