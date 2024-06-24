import { constants } from "../support/GlobalConstants.js";
import Notifications from "../pageObjects/NotificationsPage.js";
import Dashboard from "../pageObjects/DashboardPage.js";


describe('Verify transaction notification functionality', function () {

    let userData;
    const password = constants.password;
    const dash = new Dashboard();
    const noti = new Notifications();
    before(() => {
        cy.task("db:seed");
        cy.readFile('data/database.json').then((data) => {
            userData = data;
        });
    });

    beforeEach(() => {
        cy.intercept("POST", "/transactions").as("createNewTransaction");
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether reveiver gets a payment received notification.
     * This method uses cy.intercept() to mock the API response for createNewTransaction present 
     * in commands.js for creating a payment transaction
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC01_Verify payment received notification in recipients account", function () {
        cy.userLogin(userData.users[2].username, password);
        cy.get(dash.btnNewTransaction).click();
        cy.createNewTransaction({
            transactionType: "payment",
            amount: 30,
            description: "Payment received notification",
            sender: userData.users[2],
            receiver: userData.users[1],
        });
        cy.wait("@createNewTransaction");
        cy.userLogout();
        cy.userLogin(userData.users[1].username, password);
        cy.get(dash.btnNotification).click();
        cy.get(noti.lstNotifications)
            .first()
            .should("contain", userData.users[1].firstName)
            .and("contain", "received payment");
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether reveiver gets a payment request notification.
     * This method uses cy.intercept() to mock the API response for createNewTransaction present 
     * in commands.js for creating a payment transaction
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC02_Verify payment requested notification in recipients account", function () {
        cy.userLogin(userData.users[1].username, password);

        cy.get(dash.btnNewTransaction).click();
        cy.createNewTransaction({
            transactionType: "request",
            amount: 300,
            description: "Payment requested notification",
            sender: userData.users[1],
            receiver: userData.users[2],
        });
        cy.wait("@createNewTransaction");
        cy.userLogout();
        cy.userLogin(userData.users[2].username, password);
        cy.get(dash.btnNotification).click();
        cy.get(noti.lstNotifications)
            .should("contain", userData.users[2].firstName)
            .and("contain", "requested payment");
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether user can dismiss notification 
     * and it does not reappear when logging out and logging in again
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC03_Verify notifications can be dismissed and do not reappear", function () {
        cy.userLogin(userData.users[1].username, password);
        cy.get(dash.btnNotification).click();

        //Getting the number of notifications in notifications list
        cy.get(noti.lstNotifications)
            .its('length')
            .then((count) => {
                cy.wrap(count).as('notificationCountbeforeDismissal')
            });
        let counter = 0;

        //Dismissing each notification
        cy.get(noti.lstNotifications).each(($ele) => {
            cy.wrap($ele).find('button').contains('Dismiss').click();
            cy.wait(100);
            counter++;
        });

        //Compapring the notification counts before and after dismissal
        cy.get('@notificationCountbeforeDismissal').then((count) => {
            cy.log("Count " + count);
            expect(counter).to.eq(count);
        });

        //Checking if No notifications message is displayed
        cy.get(noti.lblEmptyNotificationsList).should('be.visible');

        //Logging out an logging in again to see if notifiations are reappearing or not
        cy.userLogout();
        cy.userLogin(userData.users[1].username, password);
        cy.get(dash.btnNotification).click();
        cy.get(noti.lblEmptyNotificationsList).should('be.visible');
        cy.userLogout();
    });

});
