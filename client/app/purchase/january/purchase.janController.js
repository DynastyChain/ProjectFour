'use strict';

angular.module('projectFourApp')
  .controller('JanCtrl', function($http) {

    var vm = this;
    vm.all = []
    vm.sorted = []
    vm.newPurchase = {}
    vm.budget;
    vm.category = ''
    vm.catTotals = [{
      name: 'household', total: 0},
     {name: 'car', total: 0},
     {name: 'personal', total: 0},
     {name: 'loans', total: 0},
     {name: 'rent/util', total: 0},
     {name: 'food', total: 0},
     {name: 'medical', total: 0},
     {name: 'misc', total: 0}
      ]
    vm.month = {name: 'january', total: 0}
    vm.count = 2

    vm.initialCategoryTotals = initialCategoryTotals
    vm.updateCategoryTotals = updateCategoryTotals
    vm.getPurchases = getPurchases
    vm.sortPurchases = sortPurchases
    vm.showForm = showForm
    vm.addPurchase = addPurchase
    vm.deletePurchase = deletePurchase
    getPurchases();

    function getPurchases() {
      $http
        .get('http://localhost:9000/api/purchases')
        .then(function(response) {
          if(vm.all !== response.data) {
            vm.all = response.data
            vm.sortPurchases(vm.all)
            vm.budget = vm.all[0].budget
            vm.all.forEach(function(item) {
              vm.initialCategoryTotals(item)
            })
         }
      })
    }

    function sortPurchases(all) {
      all.forEach(function(item) {
        if(item.month === vm.month.name) {
          vm.sorted.push(item)
          vm.month.total += item.amount

        }
      })
    }

    function initialCategoryTotals(item) {

        if(item.category === 'household') {
          vm.catTotals[0].total += item.amount
        }
        if(item.category === 'car') {
          vm.catTotals[1].total += item.amount
        }
        if(item.category === 'personal') {
          vm.catTotals[2].total += item.amount
        }
        if(item.category === 'loans') {
          vm.catTotals[3].total += item.amount
        }
        if(item.category === 'rent/util') {
          vm.catTotals[4].total += item.amount
        }
        if(item.category === 'food') {
          vm.catTotals[5].total += item.amount
        }
        if(item.category === 'medical') {
          vm.catTotals[6].total += item.amount
        }
        if(item.category === 'misc') {
          vm.catTotals[7].total += item.amount
        }
    }

     function updateCategoryTotals(item) {
       if(confirm("Are You Sure?")) {
        if(item.category === 'household') {
          vm.catTotals[0].total -= item.amount
        }
        if(item.category === 'car') {
          vm.catTotals[1].total -= item.amount
        }
        if(item.category === 'personal') {
          vm.catTotals[2].total -= item.amount
        }
        if(item.category === 'loans') {
          vm.catTotals[3].total -= item.amount
        }
        if(item.category === 'rent/util') {
          vm.catTotals[4].total -= item.amount
        }
        if(item.category === 'food') {
          vm.catTotals[5].total -= item.amount
        }
        if(item.category === 'medical') {
          vm.catTotals[6].total -= item.amount
        }
        if(item.category === 'misc') {
          vm.catTotals[7].total -= item.amount
        }
        vm.deletePurchase(item)
        vm.month.total -= item.amount
        var index = vm.sorted.indexOf(item)
        vm.sorted.splice(index, 1)
        }
    }

    function showForm() {
      vm.count++
      console.log(vm.total)
    }

   function addPurchase() {
      (vm.newPurchase.month = vm.month.name)
      vm.all.push(vm.newPurchase)
      vm.sorted.push(vm.newPurchase)
      vm.month.total += vm.newPurchase.amount
      vm.initialCategoryTotals(vm.newPurchase)


        $http
          .post('http://localhost:9000/api/purchases', vm.newPurchase)
        .then(function() {
        })
      vm.budget = vm.all[0].budget
      vm.newPurchase = {};
   }

   function deletePurchase(purchase) {
    $http
      .delete('http://localhost:9000/api/purchases/' + purchase._id)
      .then(function() {
        console.log(purchase)
      })

   }

  })