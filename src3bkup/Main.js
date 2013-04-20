//Main execution is here.
//Instantiate classes into objects, initialization function...
//right now just runs unit tests

unitTests();

//
var testSchedule = new Schedule();
var empList = new EmployeeList();
empList.makeEmployeeList();

// global vars to hold the solution when found.
var solutionSchedule;
var solutionEmployees;

function Main(currSchedule, currEmployeeList) {
   // get the next shift to be scheduled
   var shiftToSchedule = currSchedule.getNextShiftToSchedule();

   // if we have scheduled all of the shifts (thus a solution exists)
   if (!shiftToSchedule) {
      // save the current schedule and employee state as the solution
      solutionSchedule = currSchedule;
      solutionEmployees = currEmployeeList;
      return true;
   }
      
   //tells each employee to update itself, checking if canwork this shift.
   //returns a list of employee ids, the ones that can work
   var employeesThatCanWork = currEmployeeList.update(shiftToSchedule); 

   // if we have hit a dead end in the tree, return 0
   if (employeesThatCanWork.length == 0) {
      return false;
   } else {      
      // each(p1, p2, p3) --> pasing p2=0 (index), and p3=true, we loop through to
      // index-1 (mod size of array..). USE this for random choice
      employeesThatCanWork.each(function(emp) {
	    // for each employee that can work
	    // assign employee to shift in the currSchedule
	    currSchedule.employeeToShift(shiftToSchedule.id, emp.id);
	    // assign employee from currEmployeeList to shift
	    emp.addShift(shiftToSchedule);
	    
	    //creates shallow clone of arrays holding the current execution state.
	    var nextEmployeeList = Object.clone(currEmployeeList);
	    var nextSchedule = Object.clone(currSchedule);
	    
	    // recurse with current state
	    // I think in order to terminate I need to return maybe 0 for fail, 1 for successful sol'n
	    return Main(nextSchedule, nextEmployeeList);
	 });
   }
}

//Main(testSchedule, empList);
console.log(Main(testSchedule, empList));
console.log(solutionSchedule);
console.log(solutionEmployees);