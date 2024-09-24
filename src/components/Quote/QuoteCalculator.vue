<template>
  <div class="container-fluid">
    <div class="row">
      <div>
        <h2>Quote Calculator</h2>
      </div>
      <div>
        <div class="mb-3">
          <div class="mb-3 col-sm-4">
            <div class="label"></div>
            <select class="form-select">
              <option selected value="Select" disabled>Select Product</option>
              <option value="Product A">Product A</option>
              <option value="Product B">Product B</option>
              <option value="Product C">Product C</option>
            </select>
          </div>
          <br />
          <div class="range-wrap">
            <div class="range-value" :style="{ left: rngAmountRequiredPosition }">
              <span>${{ amountRequired }}</span>
            </div>
            <input
              id="rngRequiredAmount"
              type="range"
              min="2100"
              max="15000"
              v-model="amountRequired"
              step="1"
            />
          </div>
          <div class="mb-3 row">
            <div class="col"><h6>$2100</h6></div>
            <div class="col text-center">
              <h4>How much do you need?</h4>
            </div>
            <div class="col"><h6 class="float-end">$15000</h6></div>
          </div>
        </div>
        <br />
        <div class="range-wrap">
          <div class="range-value" :style="{ left: rngTermPosition }">
            <span id="rngTermTooltip">{{ term }} Month/s</span>
          </div>
          <input id="rngTerm" type="range" class="form-range" v-model="term" min="1" max="12" />
          <div class="mb-3 row">
            <div class="col">
              <h6>1 Month</h6>
            </div>
            <div class="col text-center"><h4>Term</h4></div>
            <div class="col"><h6 class="float-end">12 Months</h6></div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-2">
            <select class="form-select">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div class="form-floating mb-3 col-md-5">
            <input
              id="txtFirstName"
              v-model="firstName"
              class="form-control"
              type="text"
              placeholder="First Name"
            />
            <label for="txtFirstName">First Name</label>
          </div>
          <div class="form-floating mb-3 col-md-5">
            <input
              id="txtLastName"
              v-model="lastName"
              class="form-control"
              type="text"
              placeholder="Last Name"
            />
            <label for="txtLastName">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-4">
            <label for="dtDOB">Date of Birth:</label>
            <input type="date" class="form-control" id="dtDOB" v-model="dateOfBirth" />
          </div>
          <div class="form-floating mb-3 col-md-4">
            <input
              id="txtEmail"
              v-model="email"
              class="form-control"
              type="text"
              placeholder="Your Email"
            />
            <label for="txtEmail">Email Address</label>
          </div>
          <div class="form-floating mb-3 col-md-4">
            <input
              id="txtMobileNo"
              v-model="mobileNo"
              class="form-control"
              type="text"
              placeholder="Mobile Number"
            />
            <label for="txtMobileNo">Mobile Number</label>
          </div>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-success">Calculate Quote</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./QuoteCalculator.js"></script>
<style src="./QuoteCalculator.css" scoped></style>
