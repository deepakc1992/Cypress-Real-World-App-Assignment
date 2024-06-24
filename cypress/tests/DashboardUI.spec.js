import { constants, navMenuTexts } from "../support/GlobalConstants";
import { homeHeaderTexts } from "../support/GlobalConstants";
import Dashboard from "../pageObjects/DashboardPage.js";
import Transaction from "../pageObjects/TransactionPage.js";


describe('Verify the UI in dashboard page', function () {

    let userData;
    const password = constants.password;
    const dash=new Dashboard();
    const trans=new Transaction();
    before(() => {
        cy.task("db:seed");
        cy.readFile('data/database.json').then((data) => {
            userData = data;
        });
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies whether any broken links are present in dashboard page 
     * by getting all the anchor tags and retrieving the href attribute and making use of cy.request() 
     * method to verify the status code is 200 or not
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC01_Verify any broken links in dashboard", function () {
        cy.userLogin(userData.users[2].username, password);
        cy.get('a').each(($ele) => {
            cy.wrap($ele)
                .invoke('attr', 'href')
                .then((href) => {
                    cy.request(href).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                    cy.log("Verfied URL: " + href)
                })
        });
        cy.userLogout();
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies the presence and correctness of all the UI elements in header section 
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC02_Verify the presence and correctness of all the UI elements in header section", function () {
        cy.userLogin(userData.users[2].username, password);
        cy.get(dash.btnHamburgerMenu).should('be.visible').and('be.enabled');
        cy.get(dash.lblAppName).should('be.visible');
        cy.get(dash.btnNewTransaction).should('be.visible');
        cy.get(dash.btnNotification).should('be.visible');
        cy.get(dash.tabNavHeader)
            .find(dash.spanNavHeader)  // Find all span elements within the div
            .each(($span, index, $spans) => {  // Iterate over each span element
                const text = $span.text(); // Get the text of the span element
                cy.log("Text: " + text); //Logging the text values 
                expect(homeHeaderTexts).to.include(text); //Verifying each text is present in the array defined in GlobalConstants.js
            });
        cy.userLogout();
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies the presence and correctness of all the UI elements in side navigation menu
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC03_Verify the presence and correctness of all the UI elements in side navigation menu", function () {
        cy.userLogin(userData.users[2].username, password);
        cy.get(dash.btnHamburgerMenu).should('be.visible').and('be.enabled');
        cy.get(dash.btnHamburgerMenu).click();
        cy.get(dash.btnHomeNavMenu).should("not.be.visible");
        cy.get(dash.btnHamburgerMenu).click();
        cy.get(dash.btnHomeNavMenu).should("be.visible");
        cy.get(dash.imgUserImage).should('be.visible');
        cy.get(dash.lblUserFullNameDashboard).should('be.visible');
        cy.get(dash.lblUsernameDashboard).should('be.visible');
        cy.get(dash.lblUserBalance).should('be.visible');
        cy.get(dash.lblUserBalance)
            .next()  // Select the next sibling element 
            .should('have.text', 'Account Balance');
        cy.get(dash.tabNavMenuItem)
            .find('ul')// Find all ul element within the above class
            .find('span')  //Find all span elements within the ul
            .each(($span, index, $spans) => {  // Iterate over each span element
                const text = $span.text(); // Get the text of the span element
                if (!text == '') {
                    cy.log("Text: " + text); //Logging the text values 
                    expect(navMenuTexts).to.include(text); //Verifying each text is present in the array defined in GlobalConstants.js
                }

            });
        cy.userLogout();
    });

    /**
     * @Author: Deepak
     * @Test_Method: This function verifies the contents displayed when navigating to each navigation transaction tabs
     * @Parameters: Username is read from database.json file into userData object and used and password is read from GlobalConstants.js
     * @Return:null
     * @UpdatedBy:
     */
    it("TC04_Verify the contents displayed when navigating to each navigation transaction tabs", function () {
        cy.userLogin(userData.users[2].username, password);

        //Everyone tab
        cy.get(dash.btnDateRange).should('be.visible');
        cy.get(dash.btnAmountRange).should('be.visible');
        cy.get(dash.lblInTransactionsList).should('be.visible').should('have.text', "Public");
        cy.get(trans.lstTransactions).should('be.visible');
        cy.get(trans.lstTransactions)
            .find('li')  // Find all li elements within the selected div
            .should('have.length.greaterThan', 0);

        //Friends tab
        cy.get(dash.tabContacts).click();
        cy.get(dash.btnDateRange).should('be.visible');
        cy.get(dash.btnAmountRange).should('be.visible');
        cy.get(dash.lblInTransactionsList).should('be.visible').should('have.text', "Contacts");
        cy.get(trans.lstTransactions)
            .find('li')  // Find all li elements within the selected div
            .should('have.length.greaterThan', 0);
        //Mine tab
        cy.get(dash.tabPersonal).click();
        cy.get(dash.btnDateRange).should('be.visible');
        cy.get(dash.btnAmountRange).should('be.visible');
        cy.get(dash.lblInTransactionsList).should('be.visible').should('have.text', "Personal");
        cy.get(trans.lstTransactions)
            .find('li')  // Find all li elements within the selected div
            .should('have.length.greaterThan', 0);
        cy.userLogout();
    });
});
