'use strict';

angular.module('projectFourApp')
  .controller('PurchaseCtrl', function($http) {
   var vm = this;
   //all purchase data
   vm.all = [];
   //vm.month is data bound to the month dropdown
   vm.month = '';
   vm.category = '';
   //lazy counter to show and hide form
   vm.count = 2;
   //total money spent in the year
   vm.total = 0;
   //totals for each month
   vm.jan = 0;
   vm.feb = 0;
   vm.mar = 0;
   vm.apr = 0;
   vm.may = 0;
   vm.jun = 0;
   vm.jul = 0;
   vm.aug = 0;
   vm.sep = 0;
   vm.oct = 0;
   vm.nov = 0;
   vm.dec = 0;
   vm.getPurchases = getPurchases
   vm.addPurchase = addPurchase
   vm.deletePurchase = deletePurchase
   vm.initialTotal = initialTotal
   vm.updateTotal = updateTotal
   vm.newPurchase = {}
   vm.showForm = showForm
   getPurchases();

   function getPurchases() {
    $http
      .get('http://localhost:9000/api/purchases')
      .then(function(response) {
        vm.all = response.data
        vm.initialTotal(vm.all)
        })
      }

   function addPurchase() {
      vm.all.push(vm.newPurchase)
      updateTotal(vm.newPurchase)
        $http
          .post('http://localhost:9000/api/purchases', vm.newPurchase)
        .then(function() {
        })
      vm.newPurchase = {};
   }

   function deletePurchase(purchase) {
    if(confirm("Are You Sure?")) {
    $http
      .delete('http://localhost:9000/api/purchases/' + purchase._id)
      .then(function() {
        getPurchases()
        console.log(purchase)
      })
    }
   }

   function showForm() {
    vm.count++
    console.log(vm.total)

   }

   function initialTotal(all) {
        if(vm.total > 0) {
          return
       }
       else {
        all.forEach(function(item) {
          updateTotal(item)
        })
       }
   }

   function updateTotal(purchase) {
     vm.total += purchase.amount
     if(purchase.month === 'january') {
      vm.jan += purchase.amount
     }
     if(purchase.month === 'february') {
      vm.feb += purchase.amount
     }
     if(purchase.month === 'march') {
      vm.mar += purchase.amount
     }
     if(purchase.month === 'april') {
      vm.apr += purchase.amount
     }
     if(purchase.month === 'may') {
      vm.may += purchase.amount
     }
     if(purchase.month === 'june') {
      vm.jun += purchase.amount
     }
     if(purchase.month === 'july') {
      vm.jul += purchase.amount
     }
     if(purchase.month === 'august') {
      vm.aug += purchase.amount
     }
     if(purchase.month === 'september') {
      vm.sep += purchase.amount
     }
     if(purchase.month === 'october') {
      vm.oct += purchase.amount
     }
     if(purchase.month === 'november') {
      vm.nov += purchase.amount
     }
     if(purchase.month === 'december') {
      vm.dec += purchase.amount
     }
   }
  })
