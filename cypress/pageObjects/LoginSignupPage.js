class LoginSignup
{

    //Login/Signup page elements
    lblSignInOrSignUp='h1[class*="MuiTypography-root MuiTypography-h5"]';
    lnkSignUp='a[href="/signup"]';
    txtFirstName='input[id="firstName"]';
    txtLastName='input[id="lastName"]';
    txtUserName='input[id="username"]';
    txtPassword='input[id="password"]';
    txtConfirmPassword='input[id="confirmPassword"]';
    btnSubmitSignUp='button[data-test="signup-submit"]';
    btnSignInSubmit='button[data-test="signin-submit"]';
    lblErrorUsername='p[id="username-helper-text"]';
    lblErrorPassword='p[id="password-helper-text"]';
    lblErrorUSernameOrPassword='div[data-test="signin-error"]';
    
    //Dashboard page elements
    lblDashboardHeader='h2[class="MuiTypography-root MuiTypography-h6"]';
    lblUserFullNameDashboard='h6[data-test="sidenav-user-full-name"]';
    lblUsernameDashboard='h6[data-test="sidenav-username"]';
    btnLogout='div[data-test="sidenav-signout"]';

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


export default LoginSignup;