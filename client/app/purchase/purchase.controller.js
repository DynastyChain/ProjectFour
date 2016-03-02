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
   vm.jan = {spent: 0};
   vm.feb = {spent: 0};
   vm.mar = {spent: 0};
   vm.apr = {spent: 0};
   vm.may = {spent: 0};
   vm.jun = {spent: 0};
   vm.jul = {spent: 0};
   vm.aug = {spent: 0};
   vm.sep = {spent: 0};
   vm.oct = {spent: 0};
   vm.nov = {spent: 0};
   vm.dec = {spent: 0};

   //category totals
   vm.catTotals = [{
     month: 'january',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'february',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'march',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'april',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'may',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'june',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'july',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'august',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'september',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'october',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'november',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   },
   {
     month: 'december',
     household: 0,
     car: 0,
     personal: 0,
     loans: 0,
     rentUtil: 0,
     food: 0,
     medical: 0,
     misc: 0
   }]

   vm.budget;
   vm.getPurchases = getPurchases
   vm.addPurchase = addPurchase
   vm.deletePurchase = deletePurchase
   vm.initialTotal = initialTotal
   vm.updateTotal = updateTotal
   vm.categoryTotals = categoryTotals
   vm.newPurchase = {}
   vm.showForm = showForm
   getPurchases();



   function getPurchases() {
    $http
      .get('http://localhost:9000/api/purchases')
      .then(function(response) {
        if(vm.all !== response.data) {
        vm.all = response.data
        vm.initialTotal(vm.all)
        vm.categoryTotals(vm.all)
        vm.all.forEach(function(item) {
          vm.categoryTotals(item)
        })

      }
        vm.budget = vm.all[0].budget

        })
      }

   function addPurchase() {
      vm.all.push(vm.newPurchase)
      updateTotal(vm.newPurchase)
      getPurchases()
      vm.catTotals
        $http
          .post('http://localhost:9000/api/purchases', vm.newPurchase)
        .then(function() {
        })
      vm.budget = vm.all[0].budget
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
      vm.jan.spent += purchase.amount
     }
     if(purchase.month === 'february') {
      vm.feb.spent += purchase.amount
     }
     if(purchase.month === 'march') {
      vm.mar.spent += purchase.amount
     }
     if(purchase.month === 'april') {
      vm.apr.spent += purchase.amount
     }
     if(purchase.month === 'may') {
      vm.may.spent += purchase.amount
     }
     if(purchase.month === 'june') {
      vm.jun.spent += purchase.amount
     }
     if(purchase.month === 'july') {
      vm.jul.spent += purchase.amount
     }
     if(purchase.month === 'august') {
      vm.aug.spent += purchase.amount
     }
     if(purchase.month === 'september') {
      vm.sep.spent += purchase.amount
     }
     if(purchase.month === 'october') {
      vm.oct.spent += purchase.amount
     }
     if(purchase.month === 'november') {
      vm.nov.spent += purchase.amount
     }
     if(purchase.month === 'december') {
      vm.dec.spent += purchase.amount
     }
   }


   function categoryTotals(all) {

    all.forEach(function(purchase) {

    if(purchase.month === 'january') {

      if(purchase.category === 'household') {
        vm.catTotals[0].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[0].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[0].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[0].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[0].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[0].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[0].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[0].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[0].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[0].misc += purchase.amount
      }
     }
    if(vm.month === 'february') {
      if(purchase.category === 'household') {
        vm.catTotals[1].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[1].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[1].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[1].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[1].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[1].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[1].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[1].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[1].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[1].misc += purchase.amount
      }
     }
    if(purchase.month === 'march') {
      if(purchase.category === 'household') {
        vm.catTotals[2].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[2].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[2].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[2].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[2].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[2].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[2].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[2].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[2].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[2].misc += purchase.amount
      }
    }
    if(purchase.month === 'april') {
      if(purchase.category === 'household') {
        vm.catTotals[3].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[3].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[3].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[3].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[3].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[3].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[3].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[3].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[3].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[3].misc += purchase.amount
      }
    }
    if(purchase.month === 'may') {
      if(purchase.category === 'household') {
        vm.catTotals[4].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[4].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[4].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[4].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[4].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[4].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[4].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[4].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[4].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[4].misc += purchase.amount
      }
    }
    if(purchase.month === 'june') {
      if(purchase.category === 'household') {
        vm.catTotals[5].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[5].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[5].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[5].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[5].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[5].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[5].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[5].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[5].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[5].misc += purchase.amount
      }
    }
    if(purchase.month === 'july') {
      if(purchase.category === 'household') {
        vm.catTotals[6].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[6].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[6].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[6].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[6].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[6].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[6].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[6].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[6].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[6].misc += purchase.amount
      }
    }
    if(purchase.month === 'august') {
      if(purchase.category === 'household') {
        vm.catTotals[7].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[7].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[7].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[7].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[7].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[7].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[7].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[7].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[7].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[7].misc += purchase.amount
      }
    }
    if(purchase.month === 'september') {
      if(purchase.category === 'household') {
        vm.catTotals[8].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[8].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[8].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[8].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[8].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[8].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[8].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[8].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[8].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[8].misc += purchase.amount
      }
    }
    if(purchase.month === 'october') {
      if(purchase.category === 'household') {
        vm.catTotals[9].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[9].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[9].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[9].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[9].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[9].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[9].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[9].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[9].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[9].misc += purchase.amount
      }
    }
    if(purchase.month === 'november') {
      if(purchase.category === 'household') {
        vm.catTotals[10].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[10].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[10].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[10].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[10].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[10].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[10].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[10].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[10].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[10].misc += purchase.amount
      }
    }
    if(purchase.month === 'december') {
      if(purchase.category === 'household') {
        vm.catTotals[11].household += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[11].car += purchase.amount
      }
      if(purchase.category === 'personal') {
        vm.catTotals[11].personal += purchase.amount
      }
      if(purchase.category === 'loans') {
        vm.catTotals[11].loans += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[11].car += purchase.amount
      }
      if(purchase.category === 'rent/util') {
        vm.catTotals[11].rentUtil += purchase.amount
      }
      if(purchase.category === 'food') {
        vm.catTotals[11].food += purchase.amount
      }
      if(purchase.category === 'car') {
        vm.catTotals[11].car += purchase.amount
      }
      if(purchase.category === 'medical') {
        vm.catTotals[11].medical += purchase.amount
      }
      if(purchase.category === 'misc') {
        vm.catTotals[11].misc += purchase.amount
      }
   }
  })
  }
})
