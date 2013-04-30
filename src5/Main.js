//Main execution is here.
//Instantiate classes into objects, initialization function...
//right now just runs unit tests

unitTests();

//
var testSchedule = new Schedule();
var empList = new EmployeeList();

// global vars to hold the solution when found.
var solutionSchedule;
var solutionEmployees;
var depth = -1;
function Main(currSchedule, currEmployeeList) {
   depth++;
   // get the next shift to be scheduled
   var shiftToSchedule = currSchedule.getNextShiftToSchedule();

   // if we have scheduled all of the shifts (thus a solution exists)
   if (!shiftToSchedule) {
      // save the current schedule and employee state as the solution
      solutionSchedule = object.clone(currSchedule);
      solutionEmployees = object.clone(currEmployeeList);
      return true;
   }
      
   //tells each employee to update itself, checking if canwork this shift.
   //returns a list of employee ids, the ones that can work
   var employeesThatCanWork = currEmployeeList.update(shiftToSchedule); 

   // if we have hit a dead end in the tree, return 0
   if (employeesThatCanWork.length == 0) {
      depth--;
      console.log("------BACKTRACKED-------");
      return false;
   } else {      
      for (var m=0; m<employeesThatCanWork.length; m++) {
	 console.log(depth);
	 currSchedule.employeeToShift(shiftToSchedule, employeesThatCanWork[m]);
	 employeesThatCanWork[m].addShift(shiftToSchedule);
	 var nextEmployeeList = Object.clone(currEmployeeList);
	 var nextSchedule = Object.clone(currSchedule);
	 if (Main(nextSchedule, nextEmployeeList)){
	    return true;
	 }
	 else{;}
      }
   }
}

Main(testSchedule, empList);
console.log(solutionSchedule, solutionEmployees);
//console.log(Main(testSchedule, empList));
//console.log(solutionSchedule);
//console.log(solutionEmployees);