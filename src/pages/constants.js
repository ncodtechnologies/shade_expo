const BASE_URL = "/";

export const URL_ROUGH_INVOICE_SAVE = `${BASE_URL}invoice/roughInvoice`;
export const URL_INVOICE_SAVE       = `${BASE_URL}invoice/invoice`;
export const URL_INVOICE_DT         = `${BASE_URL}invoice/invoice`;
export const URL_INVOICE_LIST_DT    = `${BASE_URL}invoice/invoiceList`;
export const URL_EXPENSE_SAVE       = `${BASE_URL}invoice/invoice/expense`;
export const URL_EXPENSE_DT         = `${BASE_URL}invoice/invoice/expense`;
export const URL_EXPENSE_DEL        = `${BASE_URL}invoice/invoice/expenseDel`;
export const URL_NET_SALES_TOT      = `${BASE_URL}invoice/invoice/netSalesTotal`;
export const URL_NET_OTHER_EXP      = `${BASE_URL}invoice/invoice/netOtherExp`;
export const URL_DOCUMENTS_SAVE     = `${BASE_URL}invoice/invoice/documents`;
export const URL_DOCUMENTS_DT       = `${BASE_URL}invoice/invoice/documentsList`;
export const URL_DOCUMENTS_DEL      = `${BASE_URL}invoice/invoice/documentsDel`;
export const URL_DOC_DOWNLOAD       = `${BASE_URL}invoice/invoice/getDoc`;
export const URL_PACK_LABOUR_DT     = `${BASE_URL}invoice/invoice/invLabour`;
export const URL_PACK_PACKINGLIST_DT= `${BASE_URL}invoice/invoice/invPacking`;
export const URL_PACK_PACKINGEXP_DT = `${BASE_URL}invoice/invoice/invPackingExp`;
export const URL_DOC                = `${BASE_URL}invoice/docs`;
export const URL_PAYROLL_SAVE       = `${BASE_URL}payroll/payroll`;
export const URL_PAYROLL_DT         = `${BASE_URL}payroll/payroll`;
export const URL_PAYROLL_DEL        = `${BASE_URL}payroll/payrollDel`;
export const URL_VOUCHER_DT         = `${BASE_URL}accounts/voucher`;
export const URL_VOUCHER_DEL        = `${BASE_URL}accounts/voucherDel`;
export const URL_LEDGER_REPORT_DT   = `${BASE_URL}accounts/ledgerReport`;
export const URL_VOUCHER_SAVE       = `${BASE_URL}accounts/accounts/voucher`;
export const URL_LEDGER_GROUP_SAVE  = `${BASE_URL}accounts/ledgerGroup`;
export const URL_LEDGER_GROUP_DT    = `${BASE_URL}accounts/ledgerGroup`;
export const URL_LEDGER_DT          = `${BASE_URL}accounts/ledger`;
export const URL_LEDGER_EDIT_DT     = `${BASE_URL}accounts/ledgerEdit`;
export const URL_LEDGER_BY_GROUP    = `${BASE_URL}accounts/ledger`;
export const URL_LEDGER_SAVE        = `${BASE_URL}accounts/ledgerCreate`;
export const URL_LEDGER_UPDATE      = `${BASE_URL}accounts/ledgerCreate`;
export const URL_CASHBOOK_OP        = `${BASE_URL}accounts/cashBookOp`;
export const URL_CASHBOOK_CREDIT    = `${BASE_URL}accounts/cashBookCredit`;
export const URL_CASHBOOK_DEBIT     = `${BASE_URL}accounts/cashBookDebit`;
export const URL_PRODUCT_DT         = `${BASE_URL}product/product`;
export const URL_STOCK_REPORT       = `${BASE_URL}product/stockReport`;
export const URL_PURCHASE_REPORT_DT = `${BASE_URL}purchase/purchaseReport`;
export const URL_PURCHASE_VOUCHER_DT= `${BASE_URL}purchase/purchaseVoucher`;
export const URL_PURCHASE_VHR_ITEMS = `${BASE_URL}purchase/purchaseVoucherItems`;
export const URL_PURCHASE_VHR_EXP   = `${BASE_URL}purchase/purchaseVoucherExpense`;
 
export const LEDGER_GROUPS = {
    SUPPLIER : 2,
    STAFF : 3,
    ACCOUNT : 5,
    INV_EXPENSE : 6
}

