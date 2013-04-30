function EmployeeList() {
   //The array is indexed by the employee ID
   this.eList = new Array();
   this.makeEmployeeList();
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
// returns the sum of fte's for all employees.
EmployeeList.prototype.getFTESum = function() {
   var sum = 0;
   for (var i=0; i<this.eList.length; i++) {
      sum += this.eList[i].fte;
   }
   return sum;
};
// updates state info of each employee
// input: a shift Object
// returns: an array of employees that can work. or emtpy array if non can
EmployeeList.prototype.update = function(shift) {
   // array to return
   var canWorkList = new Array();

   //for each employee
   for (var i=0; i<this.eList.length; i++) {
      //update the employee state
      this.eList[i].update(shift);

      //if they can work
      if (this.eList[i].canWorkNext)
	 canWorkList.push(this.eList[i]);
   }
   return canWorkList;
};