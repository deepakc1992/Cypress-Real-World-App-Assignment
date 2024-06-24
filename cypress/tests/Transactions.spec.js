
import Dashboard from "../pageObjects/DashboardPage.js";
import Transaction from "../pageObjects/TransactionPage.js";
import { constants } from "../support/GlobalConstants.js";

describe('Verify amount transactions', function () {

    let userData;
    const password = constants.password;
    const trans = new Transaction();
    const dash= new Dashboard();
    before(() => {
        cy.task("db:seed");
        cy.readFile('data/database.json').then((data) => {
            userData = data;
        });
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether user is able to initiate 
     * a payment transaction and verify account balance and transaction history
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it('TC01_Verify user is able to initiate a payment transaction and verify account balance and transaction history', function () {
        const payAmount = {
            amount: "35",
            description: "Assignment",
        };
        //using common function login from commands.js
        cy.userLogin(userData.users[1].username, password);

        //Initiating payment
        cy.get(dash.btnNewTransaction).should('be.visible').click();
        cy.get(trans.txtSearchUser).type(userData.users[2].firstName + " " + userData.users[2].lastName);
        cy.get(trans.lstSearchedUsers).contains(userData.users[2].firstName + " " + userData.users[2].lastName).click();
        cy.get(trans.txtAmout).type(payAmount.amount);
        cy.get(trans.txtTransactionDesc).type(payAmount.description);
        cy.get(trans.btnSubmitPayment).should('be.visible').should('be.enabled').click();
        cy.get(trans.lblTransactionSuccess).should("be.visible").and("have.text", "Transaction Submitted!");

        //Verify account balance of the payer after transaction
        cy.get(trans.btnReturnToTransaction).should('be.visible').click();
        let updatedBalance = (userData.users[1].balance - (parseInt(payAmount.amount) * 100));
        updatedBalance = ((updatedBalance / 100).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        cy.log("Balance after transaction should be: " + updatedBalance);
        cy.get(dash.lblUserBalance).should('have.text', "$" + updatedBalance);

        //Verifying transaction history in payers account
        cy.get(trans.lstTransactions).first().should("contain", payAmount.amount);
        cy.get(trans.lstTransactions).first().should("contain", payAmount.description);

        //Logging out of the payer's account and logging into recipient’s account
        cy.userLogout();
        cy.userLogin(userData.users[2].username, password);

        //Verify account balance of the recipient after transaction
        cy.get(dash.tabPersonal).should('be.visible').click();
        let updatedRecipientBalance = (userData.users[2].balance + (parseInt(payAmount.amount) * 100));
        updatedRecipientBalance = ((updatedRecipientBalance / 100).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        cy.log("Balance: " + updatedRecipientBalance);
        cy.get(dash.lblUserBalance).should('have.text', "$" + updatedRecipientBalance);
        cy.get(trans.lstTransactions).first().should("contain", payAmount.amount);
        cy.get(trans.lstTransactions).first().should("contain", payAmount.description);
        cy.userLogout();
    });


});
