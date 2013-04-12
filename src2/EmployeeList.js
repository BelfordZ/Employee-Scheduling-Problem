function EmployeeList() {
   //The array is indexed by the employee ID
   this.eList = new Array();
}

//input: nil
//output: true on success
//side-effects: Elist is initiated with an Employee Object for each
//              employee in the EmployeeList.json file.
EmployeeList.prototype.makeEmployeeList = function() {
   var emps = EmployeeData.Employees;

   //set their id's to the index of the loop
   for (var i=0; i<emps.length; i++) {
      this.eList.push(new Employee(i, emps[i].name, emps[i].fte));
   }
   
   return true;
};

//init func to get the sum of all employee's fte
EmployeeList.prototype.getFTESum = function() {
   var sum = 0;
   for (var i=0; i<this.eList.length; i++) {
      sum += this.eList[i].fte;
   }
   return sum;
};
// updates state info
EmployeeList.prototype.update = function(shift) {
   for (var i=0; i<this.eList.length; i++) {
      this.eList[i].update(shift);
   }
};
// returns an employee reference which we then call addshift on.
EmployeeList.prototype.getEmployeeToSchedule = function() {
   for (var i=0; i<this.eList.length; i++) {
      if (this.eList[i].canWorkNext)
	 return this.eList[i];
   }
};