const year = localStorage.getItem("ShadeYear") || "2020";
const BASE_URL = `http://198.12.251.14:3000/${year}/`;

export const URL_LOGIN = `${BASE_URL}login/login`;
export const URL_USER_SAVE = `${BASE_URL}login/users`;
export const URL_USER_DT = `${BASE_URL}login/users`;
export const URL_USER_DEL = `${BASE_URL}login/userDel`;
export const URL_USER_EDIT = `${BASE_URL}login/userEdit`;
export const URL_USER_LIST = `${BASE_URL}login/userList`;
export const URL_ROUGH_INVOICE_SAVE = `${BASE_URL}invoice/roughInvoice`;
export const URL_ROUGH_INVOICE_DT = `${BASE_URL}invoice/roughInvoice`;
export const URL_AIRWAY_ITEMS_DT = `${BASE_URL}invoice/roughInvoice/airway`;
export const URL_ROUGH_INV_LIST_DT = `${BASE_URL}invoice/roughInvoiceList`;
export const URL_INVOICE_SAVE = `${BASE_URL}invoice/invoice`;
export const URL_INVOICE_DT = `${BASE_URL}invoice/invoice`;
export const URL_INVOICE_LIST_DT = `${BASE_URL}invoice/invoiceList`;
export const URL_INVOICE_SEARCH_LIST = `${BASE_URL}invoice/invoiceList`;
export const URL_EXPENSE_SAVE = `${BASE_URL}invoice/invoice/expense`;
export const URL_EXPENSE_DT = `${BASE_URL}invoice/invoice/expense`;
export const URL_FRIGHT_EXP_DT = `${BASE_URL}invoice/invoice/frightExp`;
export const URL_EXPENSE_DEL = `${BASE_URL}invoice/invoice/expenseDel`;
export const URL_NET_SALES_TOT = `${BASE_URL}invoice/invoice/netSalesTotal`;
export const URL_NET_PACK_TOT = `${BASE_URL}invoice/invoice/totPackingExp`;
export const URL_NET_OTHER_EXP = `${BASE_URL}invoice/invoice/netOtherExp`;
export const URL_NET_FREIGHT = `${BASE_URL}invoice/invoice/frightExpTot`;
export const URL_UPD_PURCHASE = `${BASE_URL}invoice/invoice/updPurchase`;
export const URL_DOCUMENTS_SAVE = `${BASE_URL}invoice/invoice/documents`;
export const URL_DOCUMENTS_DT = `${BASE_URL}invoice/invoice/documentsList`;
export const URL_DOCUMENTS_DEL = `${BASE_URL}invoice/invoice/documentsDel`;
export const URL_DOC_DOWNLOAD = `${BASE_URL}invoice/invoice/getDoc`;
export const URL_PACK_LABOUR_DT = `${BASE_URL}invoice/invoice/invLabour`;
export const URL_PACK_PACKINGLIST_DT = `${BASE_URL}invoice/invoice/invPacking`;
export const URL_PACK_PACKINGLIST_GRP_BY = `${BASE_URL}invoice/invoice/invPackingGrpBy`;
export const URL_PACK_PACKINGEXP_DT = `${BASE_URL}invoice/invoice/invPackingExp`;
export const URL_DOC = `${BASE_URL}invoice/docs`;
export const URL_PAYROLL_SAVE = `${BASE_URL}payroll/payroll`;
export const URL_PAYROLL_DT = `${BASE_URL}payroll/payroll`;
export const URL_PAYROLL_DEL = `${BASE_URL}payroll/payrollDel`;
export const URL_VOUCHER_DT = `${BASE_URL}accounts/voucher`;
export const URL_VOUCHER_DEL = `${BASE_URL}accounts/voucherDel`;
export const URL_VOUCHER_SAVE = `${BASE_URL}accounts/accounts/voucher`;
export const URL_SUNDRY_CREDITOR = `${BASE_URL}accounts/sundryCreditor`;
export const URL_SUNDRY_DEBTOR = `${BASE_URL}accounts/sundryDebtor`;
export const URL_LEDGER_EDIT_DT = `${BASE_URL}accounts/ledgerEdit`;
export const URL_LEDGER_REPORT_DT = `${BASE_URL}accounts/ledgerReport`;
export const URL_LEDGER_REPORT_OP = `${BASE_URL}accounts/ledgerReportOp`;
export const URL_LEDGER_GROUP_SAVE = `${BASE_URL}accounts/ledgerGroup`;
export const URL_LEDGER_GROUP_DT = `${BASE_URL}accounts/ledgerGroup`;
export const URL_LEDGER_DT = `${BASE_URL}accounts/ledger`;
export const URL_LEDGER_BY_GROUP = `${BASE_URL}accounts/ledger`;
export const URL_LEDGER_SAVE = `${BASE_URL}accounts/ledgerCreate`;
export const URL_LEDGER_UPDATE = `${BASE_URL}accounts/ledgerCreate`;
export const URL_LEDGER_DELETE = `${BASE_URL}accounts/ledgerDelete`;
export const URL_CASHBOOK_OP = `${BASE_URL}accounts/cashBookOp`;
export const URL_CASHBOOK_CREDIT = `${BASE_URL}accounts/cashBookCredit`;
export const URL_CASHBOOK_DEBIT = `${BASE_URL}accounts/cashBookDebit`;
export const URL_PRODUCT_DT = `${BASE_URL}product/product`;
export const URL_SUPPLIER_DT = `${BASE_URL}sales/supplier`;
export const URL_SALES_REPORT = `${BASE_URL}sales/salesReport`;
export const URL_STOCK_REPORT = `${BASE_URL}product/stockReport`;
export const URL_PURCHASE_REPORT_DT = `${BASE_URL}purchase/purchaseReport`;
export const URL_PURCHASE_VOUCHER_DT = `${BASE_URL}purchase/purchaseVoucher`;
export const URL_PURCHASE_VHR_ITEMS = `${BASE_URL}purchase/purchaseVoucherItems`;
export const URL_PURCHASE_VHR_EXP = `${BASE_URL}purchase/purchaseVoucherExpense`;
export const URL_NOTIFICATION = `${BASE_URL}notification/notification`;
export const URL_NOTIFICATION_LIST = `${BASE_URL}notification/notification`;
export const URL_NOTIFICATION_DEL = `${BASE_URL}notification/notificationDel`;

export const URL_PL_PURCHASE = `${BASE_URL}statement/totalPurchase`;
export const URL_PL_SALES = `${BASE_URL}statement/totalSales`;
export const URL_PL_LOCAL_SALES = `${BASE_URL}statement/totalLocalSales`;
export const URL_PL_EXPENSES = `${BASE_URL}statement/expenses`;
export const URL_PL_INCOME = `${BASE_URL}statement/income`;
export const URL_PL_PAYROLL = `${BASE_URL}statement/payroll`;
export const URL_PL_INV_PACK_EXP = `${BASE_URL}statement/invoicePackingExp`;
export const URL_PL_INV_FREIGHT_EXP = `${BASE_URL}statement/invoiceFreightExp`;
export const URL_PL_INV_OTHER_EXP = `${BASE_URL}statement/invoiceOtherExp`;
export const URL_PL_INV_DISC = `${BASE_URL}statement/totalInvoiceDiscount`;
export const URL_PL_OTHER_INCOME = `${BASE_URL}statement/otherIncome`;
export const URL_PL_DISC_INC = `${BASE_URL}statement/totalDiscountIncome`;
export const URL_PL_DISC_EXP = `${BASE_URL}statement/totalDiscountExpense`;

export const URL_PL_PURCHASE_DT = `${BASE_URL}statement/totalPurchaseDt`;
export const URL_PL_LOCAL_SALES_DR = `${BASE_URL}statement/totalLocalSalesDt`;
export const URL_PL_SALES_DT = `${BASE_URL}statement/totalSalesDt`;
export const URL_PL_EXPENSES_DT = `${BASE_URL}statement/expensesDt`;
export const URL_PL_INCOME_DT = `${BASE_URL}statement/incomeDt`;
export const URL_PL_PAYROLL_DT = `${BASE_URL}statement/payrollDt`;
export const URL_PL_INV_PACK_EXP_DT = `${BASE_URL}statement/invoicePackingExpDt`;
export const URL_PL_INV_FREIGHT_EXP_DT = `${BASE_URL}statement/invoiceFreightExpDt`;
export const URL_PL_INV_OTHER_EXP_DT = `${BASE_URL}statement/invoiceOtherExpDt`;

//Balance Sheet
export const URL_BS_DEBTORS = `${BASE_URL}statement/sundryDebtor`;
export const URL_BS_CREDITORS = `${BASE_URL}statement/sundryCreditor`;
export const URL_BS_CASH_BAL = `${BASE_URL}statement/cashBal`;
export const URL_BS_STOCK = `${BASE_URL}statement/stockReport`;

export const LEDGER_GROUPS = {
  DESKTOP_ACCOUNT: 1,
  SUPPLIER: 2,
  STAFF: 3,
  ACCOUNT: 5,
  INV_EXPENSE: 6,
  CONSIGNER: 7,
  CONSIGNEE: 8,
};
