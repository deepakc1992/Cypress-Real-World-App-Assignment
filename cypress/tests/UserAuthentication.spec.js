const { includes } = require("lodash");
import LoginSignup from "../pageObjects/LoginSignupPage.js";
import Dashboard from "../pageObjects/DashboardPage.js";
import { constants } from "../support/GlobalConstants.js";
describe('Verify user signup and authentication functionality', function () {

    //Clearing local DB before this test suite
    before(function () {
        cy.task("db:seed");
    });

    const ln = new LoginSignup();
    const dash = new Dashboard();

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether user is able to navigate to application URL
     * @Parameters: null
     * @Return:null
     * @UpdatedBy:
     */
    it('TC01_Verify user is able to navigate to application URL', function () {

        cy.visit("http://localhost:3000/signin");
        cy.title().should('include', 'Cypress Real World');
        cy.get(ln.lblSignInOrSignUp).should('have.text', 'Sign in');

    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether user is able to click on Signup link and navigate to signup page
     * @Parameters: null
     * @Return:null
     * @UpdatedBy:
     */
    it('TC02_Verify user is able to click on Signup link and navigate to signup page', function () {

        cy.visit("/");
        cy.get(ln.lnkSignUp).click();
        cy.get(ln.lblSignInOrSignUp).should('have.text', 'Sign Up');

    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether user is able to signup successfully
     * @Parameters: Signup details are read from GlobalConstanst.js file
     * @Return:null
     * @UpdatedBy:
     */
    it('TC03_Verify user is able to signup successfully', function () {
        cy.visit("/signup");
        cy.get(ln.btnSubmitSignUp).should('be.enabled');
        cy.get(ln.txtFirstName).type(constants.firstName);
        cy.get(ln.txtLastName).type(constants.lastName);
        cy.get(ln.txtUserName).type(constants.userName);
        cy.get(ln.txtPassword).type(constants.pass);
        cy.get(ln.txtConfirmPassword).type(constants.pass);
        cy.get(ln.btnSubmitSignUp).should('be.visible').should('be.enabled').click();
        cy.get(ln.lblSignInOrSignUp).should('have.text', 'Sign in');

    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether user is able to login with valid credentials 
     * and complete onbarding and logout from application
     * @Parameters: Login creds and the banking details are read from GlobalConstanst.js file
     * @Return:null
     * @UpdatedBy:
     */
    it('TC04_Verify user is able to login with valid credentials and complete onbarding and logout from application', function () {
        cy.visit("/");
        cy.userLogin(constants.userName, constants.pass);
        cy.get(dash.lblDashboardHeader).should('have.text', 'Get Started with Real World App');
        cy.get(dash.txtOnbardingContent).should('include.text', 'Real World App requires a Bank Account to perform transactions.')
        cy.get(dash.btnNextOnbarding).should('be.visible').click();

        //Create bank account popup
        cy.get(dash.lblBankAccountHeader).should('have.text', 'Create Bank Account');
        cy.get(dash.txtBankName).should('be.visible').type(constants.bankName);
        cy.get(dash.txtBancAccountNumber).should('be.visible').type(constants.accountNum);
        cy.get(dash.txtRoutingNumber).should('be.visible').type(constants.routingNum);
        cy.get(dash.btnCreateBankAccount).should('be.visible').click();

        //verifying bank account creation popup
        cy.get(dash.lblTitleOnbarding).should('have.text', 'Finished');
        cy.get(dash.lblContentOnbarding).should('contain', "You're all set!");
        cy.get(dash.btnNextOnbarding).should('be.visible').click();

        //verifying logged in user details
        cy.get(dash.lblUserFullNameDashboard).should('have.text', constants.firstName + ' ' + constants.lastName);
        cy.get(dash.lblUsernameDashboard).should('have.text', '@' + constants.userName);

        //Logging out user from the application and verify signin page is displayed
        cy.userLogout();
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether error messages are displayed for incorrect login credentials
     * @Parameters: Login creds are read from GlobalConstanst.js file
     * @Return:null
     * @UpdatedBy:
     */
    it('TC05_Verify error messages displayed for incorrect login credentials', function () {
        cy.visit("/");
        cy.get(ln.lblSignInOrSignUp).should('have.text', 'Sign in');

        //Username field is empty
        cy.get(ln.txtPassword).click();
        cy.get(ln.lblErrorUsername).should("be.visible").and('have.text', 'Username is required');
        cy.get(ln.btnSignInSubmit).should('be.disabled');
        //Password field should have 4 characters
        cy.get(ln.txtPassword).type("a@1").blur();
        cy.get(ln.lblErrorPassword).should("be.visible").and('have.text', 'Password must contain at least 4 characters');
        cy.get(ln.btnSignInSubmit).should('be.disabled');

        //Inavlid username and correct password
        cy.get(ln.txtUserName).clear().type(constants.invalidUsername);
        cy.get(ln.txtPassword).clear().type(constants.password);
        cy.get(ln.btnSignInSubmit).should('be.visible').should('be.enabled').click();
        cy.get(ln.lblErrorUSernameOrPassword).should("be.visible").and('have.text', 'Username or password is invalid');

        //Invalid password and correct username
        cy.get(ln.txtUserName).clear().type(constants.userName);
        cy.get(ln.txtPassword).clear().type(constants.invalidPassword);
        cy.get(ln.btnSignInSubmit).should('be.visible').should('be.enabled').click();
        cy.get(ln.lblErrorUSernameOrPassword).should("be.visible").and('have.text', 'Username or password is invalid');

        //Invalid username and password
        cy.get(ln.txtUserName).clear().type(constants.invalidUsername);
        cy.get(ln.txtPassword).clear().type(constants.invalidPassword);
        cy.get(ln.btnSignInSubmit).should('be.visible').should('be.enabled').click();
        cy.get(ln.lblErrorUSernameOrPassword).should("be.visible").and('have.text', 'Username or password is invalid');

    });


});