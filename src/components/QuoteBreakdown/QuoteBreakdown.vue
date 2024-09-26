<template>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade" id="nav-breakdown" role="tabpanel" aria-labelledby="nav-profile-tab">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Month/s</th>
            <th scope="col">Amount</th>
            <th scope="col">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in monthlyBreakdown" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.Amount.toFixed(2) }}</td>
            <td>{{ item.Remarks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./QuoteBreakdown.js" />
<style scoped src="./QuoteBreakdown.css" />
