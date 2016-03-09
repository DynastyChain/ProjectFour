(function() {
'use strict';

angular.module('projectFourApp')
  .controller('DecCtrl', function($http, localStorageService) {

    var vm = this;
    vm.all = []
    vm.sorted = []
    vm.user = {}
    vm.newPurchase = {}
    vm.budChange = 0
    vm.budget = 0;
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
    vm.month = {name: 'december', total: 0}
    vm.count = 1
    vm.initialCategoryTotals = initialCategoryTotals
    vm.updateCategoryTotals = updateCategoryTotals
    vm.getPurchases = getPurchases
    vm.sortPurchases = sortPurchases
    vm.showForm = showForm
    vm.addPurchase = addPurchase
    vm.deletePurchase = deletePurchase
    vm.buildChart = buildChart
    vm.changeBudget = changeBudget
    vm.getBudget = getBudget

    getBudget();
    getPurchases();

    function getBudget() {
      vm.budget = localStorageService.get('decBudget');
      return vm.budget
    }
    function changeBudget() {
      localStorageService.remove('decBudget')
      localStorageService.set('decBudget', vm.budChange);
      vm.getBudget();
    }

    function getPurchases() {
      $http
        .get('/api/purchases')
        .then(function(response) {
          if(vm.all !== response.data) {
            vm.all = response.data
            vm.sortPurchases(vm.all)
            vm.remain = (vm.budget - vm.month.total)
            vm.sorted.forEach(function(item) {
              vm.initialCategoryTotals(item)
            })
            buildChart();
         }
      })
    }

    function sortPurchases(all) {
      all.forEach(function(item) {
        if(item.month === vm.month.name) {
          // item.date = item.date.slice(0,15)
          vm.sorted.push(item)
          item.date = item.date.slice(0,15)
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
        buildChart();
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
      buildChart();
        $http
          .post('/api/purchases', vm.newPurchase)
        .then(function() {
        })
      vm.newPurchase = {};
   }

   function deletePurchase(purchase) {
    $http
      .delete('/api/purchases/' + purchase._id)
      .then(function() {
        console.log(purchase)
      })
   }

   function buildChart() {
    $('.chart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Category Totals vs Total Spent'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Categories',
                colorByPoint: true,
                data: [{
                    name: 'Household',
                    y: vm.catTotals[0].total
                }, {
                    name: 'Rent/Util',
                    y: vm.catTotals[4].total,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Personal',
                    y: vm.catTotals[2].total
                }, {
                    name: 'Loans',
                    y: vm.catTotals[3].total
                }, {
                    name: 'Car',
                    y: vm.catTotals[1].total
                }, {
                    name: 'Food',
                    y: vm.catTotals[5].total
                }, {
                    name: 'Medical',
                    y: vm.catTotals[6].total
                }, {
                    name: 'Miscellaneous',
                    y: vm.catTotals[7].total
                }]
            }]
        });
   }

  })
})()
