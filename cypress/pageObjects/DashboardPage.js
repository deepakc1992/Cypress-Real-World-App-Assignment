class Dashboard
{

    //Dashboard page elements
    lblDashboardHeader='h2[class="MuiTypography-root MuiTypography-h6"]';
    lblUserFullNameDashboard='h6[data-test="sidenav-user-full-name"]';
    lblUsernameDashboard='h6[data-test="sidenav-username"]';
    btnLogout='div[data-test="sidenav-signout"]';
    btnHamburgerMenu='[data-test="sidenav-toggle"]';
    lblAppName='[data-test="app-name-logo"]';
    btnNotification='[data-test*="notifications-link"]';
    btnNewTransaction='[data-test=nav-top-new-transaction]';
    tabNavHeader='[class="MuiTabs-flexContainer MuiTabs-centered"]';
    spanNavHeader='span[class="MuiTab-wrapper"]';
    btnHomeNavMenu='[data-test="sidenav-home"]';
    imgUserImage='[class="MuiAvatar-img"]';
    lblUserBalance='h6[data-test="sidenav-user-balance"]';
    tabNavMenuItem='[class="MuiGrid-root MuiGrid-item"]';
    btnDateRange='[data-test="transaction-list-filter-date-range-button"]';
    btnAmountRange='[data-test="transaction-list-filter-amount-range-button"]';
    lblInTransactionsList='[class="MuiListSubheader-root MuiListSubheader-sticky MuiListSubheader-gutters"]';
    lstTransactionlist='[data-test="transaction-list"]';
    tabPersonal='[data-test="nav-personal-tab"]';
    tabContacts='[data-test="nav-contacts-tab"]';
    
    //Onbarding popup elements
    txtOnbardingContent='p[class="MuiTypography-root MuiDialogContentText-root MuiTypography-body1 MuiTypography-colorTextSecondary"]';
    btnNextOnbarding='button[data-test="user-onboarding-next"]';
    lblBankAccountHeader='h2[class="MuiTypography-root MuiTypography-h6"]';
    txtBankName='input[id="bankaccount-bankName-input"]';
    txtBancAccountNumber='input[id="bankaccount-routingNumber-input"]';
    txtRoutingNumber='input[id="bankaccount-accountNumber-input"]';
    btnCreateBankAccount='button[data-test="bankaccount-submit"]';
    lblTitleOnbarding='div[data-test="user-onboarding-dialog-title"]';
    lblContentOnbarding='div[data-test="user-onboarding-dialog-content"]';
    
}


export default Dashboard;