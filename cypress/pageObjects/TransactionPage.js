class Transaction
{

    
    txtSearchUser='[data-test=user-list-search-input]';
    lstSearchedUsers='[data-test*="user-list-item"]';
    txtAmout= '[id="amount"]';
    txtTransactionDesc= '[id="transaction-create-description-input"]';
    btnSubmitPayment='button[data-test="transaction-create-submit-payment"]';
    lblTransactionSuccess='[data-test="alert-bar-success"]';
    btnReturnToTransaction='[data-test="new-transaction-return-to-transactions"]';
    lstTransactions='[data-test="transaction-list"]';
}


export default Transaction;