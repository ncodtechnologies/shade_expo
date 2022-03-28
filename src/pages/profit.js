import React, { Component } from "react";
import {
  URL_PL_PURCHASE,
  URL_PL_SALES,
  URL_PL_EXPENSES,
  URL_PL_INCOME,
  URL_PL_PAYROLL,
  URL_PL_INV_PACK_EXP,
  URL_PL_INV_FREIGHT_EXP,
  URL_PL_INV_OTHER_EXP,
  URL_PL_INV_DISC,
  URL_PL_DISC_INC,
  URL_PL_DISC_EXP,
  URL_PL_LOCAL_SALES,
  URL_PL_LOCAL_SALES_DR,
} from "./constants";
import {
  URL_PL_PURCHASE_DT,
  URL_PL_SALES_DT,
  URL_PL_EXPENSES_DT,
  URL_PL_INCOME_DT,
  URL_PL_PAYROLL_DT,
  URL_PL_INV_PACK_EXP_DT,
  URL_PL_INV_FREIGHT_EXP_DT,
  URL_PL_INV_OTHER_EXP_DT,
} from "./constants";
import DatePicker from "react-date-picker";
import Nav from "../NavBar";
import { JsonToCsv, useJsonToCsv } from "react-json-csv";

class ProfitLoss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.formatDate(new Date()),
      toDate: this.formatDate(new Date()),
      purchase_total: "",
      sales_total: "",
      local_sales_total: "",
      inv_discount: "",
      discount_inc: "",
      discount_exp: "",
      income: [],
      expense: [],
      payroll: "",
      inv_packing_exp: "",
      inv_freight_exp: 0,
      inv_other_exp: "",
      dateFrom: new Date(),
      dateTo: new Date(),
    };
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
  }

  loadReport() {
    this.loadSalesTotal();
    this.loadLocalSalesTotal();
    this.loadIncome();
    this.loadDiscountInc();

    this.loadPurchaseTotal();
    this.loadExp();
    this.loadPayroll();
    this.loadInvPackingExp();
    //  this.loadInvFreightExp();
    this.loadInvOtherExp();
    this.loadDiscountExp();
    this.loadInvoiceDiscount();
  }

  handleChangePurchase(e) {
    this.setState({ purchase: e.target.value });
  }

  loadPurchaseTotal() {
    fetch(URL_PL_PURCHASE + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ purchase_total: data[0].totalPurchase }));
  }

  loadSalesTotal() {
    fetch(URL_PL_SALES + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ sales_total: data[0].totalSales }));
  }

  loadLocalSalesTotal() {
    fetch(
      URL_PL_LOCAL_SALES + `/'${this.state.fromDate}'/'${this.state.toDate}'`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ local_sales_total: data[0].totalLocalSales })
      );
  }

  loadInvoiceDiscount() {
    fetch(URL_PL_INV_DISC + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ inv_discount: data[0].discount }));
  }

  loadDiscountInc() {
    fetch(URL_PL_DISC_INC + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ discount_inc: data[0].discount }));
  }

  loadDiscountExp() {
    fetch(URL_PL_DISC_EXP + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ discount_exp: data[0].discount }));
  }

  loadExp() {
    fetch(URL_PL_EXPENSES + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ expense: data }));
  }

  loadIncome() {
    fetch(URL_PL_INCOME + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ income: data }));
  }

  loadPayroll() {
    fetch(URL_PL_PAYROLL + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => this.setState({ payroll: data[0].amount }));
  }

  loadInvPackingExp() {
    fetch(
      URL_PL_INV_PACK_EXP + `/'${this.state.fromDate}'/'${this.state.toDate}'`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ inv_packing_exp: data[0].amount }));
  }

  loadInvFreightExp() {
    fetch(
      URL_PL_INV_FREIGHT_EXP +
        `/'${this.state.fromDate}'/'${this.state.toDate}'`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ inv_freight_exp: data[0].amount }));
  }

  loadInvOtherExp() {
    fetch(
      URL_PL_INV_OTHER_EXP + `/'${this.state.fromDate}'/'${this.state.toDate}'`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ inv_other_exp: data[0].amount }));
  }

  onDateFromChange = (dateFrom) => {
    this.setState({ fromDate: this.formatDate(dateFrom), dateFrom });
  };
  onDateToChange = (dateTo) => {
    this.setState({ toDate: this.formatDate(dateTo), dateTo });
  };

  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  exportCSV({ filename, fields, url }) {
    const { saveAsCsv } = useJsonToCsv();
    const style = {
      padding: "5px",
    };

    alert(url + `/'${this.state.fromDate}'/'${this.state.toDate}'`);

    fetch(url + `/'${this.state.fromDate}'/'${this.state.toDate}'`)
      .then((response) => response.json())
      .then((data) => data && saveAsCsv({ data, fields, filename }));
  }

  render() {
    const totalInc =
      this.state.sales_total +
      this.state.local_sales_total +
      this.state.discount_inc +
      this.state.income.reduce((a, b) => +a + +b.amount, 0);

    const totalExp =
      this.state.purchase_total +
      this.state.discount_exp +
      this.state.inv_discount +
      this.state.expense.reduce((a, b) => +a + +b.amount, 0) +
      this.state.payroll +
      this.state.inv_packing_exp +
      this.state.inv_freight_exp +
      this.state.inv_other_exp;

    return (
      <div class="wrapper">
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Profit & Loss</h1>
                </div>
              </div>
            </div>
          </section>

          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="card card-info" style={{ width: "100%" }}>
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>
                            <div class="row">
                              <div class="form-group">
                                <label>From</label>
                                <DatePicker
                                  className={"form-control"}
                                  onChange={this.onDateFromChange}
                                  value={this.state.dateFrom}
                                  format={"dd/MM/yyyy"}
                                />
                              </div>

                              <div class="form-group">
                                <label>To</label>
                                <DatePicker
                                  className={"form-control"}
                                  onChange={this.onDateToChange}
                                  value={this.state.dateTo}
                                  format={"dd/MM/yyyy"}
                                />
                              </div>
                              <div class="col-md-4">
                                <label>&nbsp;</label>
                                <button
                                  type="button"
                                  class="btn btn-block btn-success btn-flat"
                                  onClick={() => this.loadReport()}
                                >
                                  Search
                                </button>
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <p class="lead">Income</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tbody>
                        <tr>
                          <th style={{ width: "50%" }}>Sales Total:</th>
                          <td align="right">
                            {Math.round(this.state.sales_total)}
                            <a
                              style={{ padding: 5 }}
                              href="javascript:void(0);"
                              onClick={() =>
                                this.exportCSV({
                                  filename: "Sales Detail",
                                  fields: {
                                    date: "Date",
                                    sales: "Sales",
                                  },
                                  url: URL_PL_SALES_DT,
                                })
                              }
                            >
                              <i class="fas fa-edit"></i>{" "}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "50%" }}>Local Sales:</th>
                          <td align="right">
                            {Math.round(this.state.local_sales_total)}
                            <a
                              style={{ padding: 5 }}
                              href="javascript:void(0);"
                              onClick={() =>
                                this.exportCSV({
                                  filename: "Local Sales Detail",
                                  fields: {
                                    date: "Date",
                                    sales: "Sales",
                                  },
                                  url: URL_PL_LOCAL_SALES_DR,
                                })
                              }
                            >
                              <i class="fas fa-edit"></i>{" "}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "50%" }}>Discount Income:</th>
                          <td align="right">
                            {Math.round(this.state.discount_inc)}
                          </td>
                        </tr>
                        {this.state.income.map((item, index) => (
                          <tr>
                            <th>{item.name} :</th>
                            <td align="right">{Math.round(item.amount)}</td>
                          </tr>
                        ))}
                        <tr>
                          <th>Total :</th>
                          <td align="right">{Math.round(totalInc)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-6">
                  <p class="lead">Expenses</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tbody>
                        <tr>
                          <th style={{ width: "50%" }}>Purchase:</th>
                          <td align="right">
                            {Math.round(this.state.purchase_total)}
                            <a
                              style={{ padding: 5 }}
                              href="javascript:void(0);"
                              onClick={() =>
                                this.exportCSV({
                                  filename: "Purchase Detail",
                                  fields: {
                                    date: "Date",
                                    purchase: "Purchase",
                                  },
                                  url: URL_PL_PURCHASE_DT,
                                })
                              }
                            >
                              <i class="fas fa-edit"></i>{" "}
                            </a>
                          </td>
                        </tr>
                        {this.state.expense.map((item, index) => (
                          <tr>
                            <th>{item.name} :</th>
                            <td align="right">
                              {Math.round(item.amount)}
                              {index == 0 && (
                                <a
                                  style={{ padding: 5 }}
                                  href="javascript:void(0);"
                                  onClick={() =>
                                    this.exportCSV({
                                      filename: "Expenses",
                                      fields: {
                                        date: "Date",
                                        name: "Group",
                                        amount: "Total",
                                      },
                                      url: URL_PL_EXPENSES_DT,
                                    })
                                  }
                                >
                                  <i class="fas fa-edit"></i>{" "}
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <th style={{ width: "50%" }}>Payroll:</th>
                          <td align="right">
                            {Math.round(this.state.payroll)}
                            <a
                              style={{ padding: 5 }}
                              href="javascript:void(0);"
                              onClick={() =>
                                this.exportCSV({
                                  filename: "Payroll Details",
                                  fields: {
                                    date: "Date",
                                    amount: "Total",
                                  },
                                  url: URL_PL_PAYROLL_DT,
                                })
                              }
                            >
                              <i class="fas fa-edit"></i>{" "}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "50%" }}>Discount Expense:</th>
                          <td align="right">
                            {Math.round(this.state.discount_exp)}
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "50%" }}>Invoice Discount:</th>
                          <td align="right">
                            {Math.round(this.state.inv_discount)}
                          </td>
                        </tr>
                        <tr>
                          <th>Invoice Packing Expenses</th>
                          <td align="right">
                            {Math.round(this.state.inv_packing_exp)}
                            <a
                              style={{ padding: 5 }}
                              href="javascript:void(0);"
                              onClick={() =>
                                this.exportCSV({
                                  filename: "Invoice Packing Details",
                                  fields: {
                                    invoice_no: "Invoice",
                                    amount: "Total",
                                  },
                                  url: URL_PL_INV_PACK_EXP_DT,
                                })
                              }
                            >
                              <i class="fas fa-edit"></i>{" "}
                            </a>
                          </td>
                        </tr>
                        {/*  <tr>
                        <th>Invoice Freight Expenses</th>
                        <td align="right" >{Math.round(this.state.inv_freight_exp)}</td>
                      </tr>
                    */}{" "}
                        <tr>
                          <th>Invoice Other Expenses</th>
                          <td align="right">
                            {Math.round(this.state.inv_other_exp)}
                            <a
                              style={{ padding: 5 }}
                              href="javascript:void(0);"
                              onClick={() =>
                                this.exportCSV({
                                  filename: "Invoice Other Details",
                                  fields: {
                                    invoice_no: "Invoice",
                                    amount: "Total",
                                  },
                                  url: URL_PL_INV_OTHER_EXP_DT,
                                })
                              }
                            >
                              <i class="fas fa-edit"></i>{" "}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td align="right">
                            {Math.round(totalExp * 100) / 100}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="row"
                  style={{
                    fontWeight: "bold",
                    alignItems: "center",
                    textAlign: "center",
                    borderWidth: 1,
                    margin: "auto",
                    textDecorationLine: "underline",
                  }}
                >
                  Net Profit/Loss: {Math.round(totalInc - totalExp)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfitLoss;
