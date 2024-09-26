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
          <h5 class="modal-title" id="exampleModalLabel">Your Quote</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12"><h6>Your Information</h6></div>
          </div>
          <div class="row">
            <div class="col-6"><label class="form-label">Name</label></div>
            <div class="col-6">
              <label class="form-label float-end">{{ FullName }}</label>
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
        <div class="modal-footer">
          <div class="col-12 d-grid gap-2">
            <button type="button" class="btn btn-success">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./LoanApply.js"></script>
<style scope src="./LoanApply.css"></style>
