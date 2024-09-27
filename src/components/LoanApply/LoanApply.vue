<template>
  <div
    class="modal fade"
    id="modalLoanAPply"
    tabindex="-1"
    aria-labelledby="modalLoanAPply"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header">
          <nav>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Your Quote
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-breakdown"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Breakdown
                </button>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body modal-fullHeight">
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <h5 class="modal-title" id="exampleModalLabel">Your Quote: {{ SelectedProduct }}</h5>
              <hr />
              <div class="row">
                <div class="col-md-12"><h6>Your Information</h6></div>
              </div>
              <div class="row">
                <div class="col-6"><label class="form-label">Name</label></div>
                <div class="col-6">
                  <label class="form-label float-end">{{ fullName }}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-6"><label class="form-label">Mobile No</label></div>
                <div class="col-6">
                  <label class="form-label float-end">{{ MobileNo }}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-6"><label class="form-label">Email Add</label></div>
                <div class="col-6">
                  <label class="form-label float-end">{{ Email }}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-6"><label class="form-label">Date of Birth</label></div>
                <div class="col-6">
                  <label class="form-label float-end">{{ DateOfBirth }}</label>
                </div>
              </div>
              <hr />
              <h6>Finance Details</h6>
              <div class="row">
                <div class="col-6">
                  <label class="form-label">Finance Amount</label>
                </div>
                <div class="col-6">
                  <label class="form-label float-end"> ${{ AmountRequired }}</label>
                </div>
              </div>
              <div class="hr-container">
                <hr />
                <span class="hr-text">over {{ Term }} Month/s</span>
              </div>
              <div v-if="SelectedProduct == 'Product B'" class="ProductBNote">
                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label">Repayments from</label>
                  </div>
                  <div class="col-6">
                    <label class="form-label float-end">
                      ${{
                        firstTwoMonthsForProductB !== null
                          ? firstTwoMonthsForProductB.toFixed(2)
                          : 'Calculating...'
                      }}
                    </label>
                  </div>
                </div>
                <div class="hr-container">
                  <hr />
                  <span class="hr-text">First 2 Months</span>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label">Repayments from</label>
                </div>
                <div class="col-6">
                  <label class="form-label float-end">
                    ${{ payment !== null ? payment.toFixed(2) : 'Calculating...' }}
                  </label>
                </div>
              </div>
              <div class="hr-container">
                <hr />
                <span class="hr-text">Monthly</span>
              </div>
            </div>
            <QuoteBreakdown :monthlyBreakdown="monthlyBreakdown" />
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-12 d-grid gap-2">
            <button type="button" class="btn btn-success" @click="handleApplyNow">Apply Now</button>
          </div>
          <div>
            <p>
              <small
                >Total repayments ${{ totalAmountToPay }} made up of interest ${{
                  (totalAmountToPay - AmountRequired).toFixed(2)
                }}. The repayment amount is based on the variables selected, it is subject to our
                assessment and suitability, and other terms and conditions apply.</small
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./LoanApply.js"></script>
<style scope src="./LoanApply.css"></style>
