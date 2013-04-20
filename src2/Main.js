//Main execution is here.
//Instantiate classes into objects, initialization function...
//right now just runs unit tests

unitTests();

var testSchedule = new Schedule();
var empList = new EmployeeList();
empList.makeEmployeeList();


//DFS code goes here.
for (var i=0; i<testSchedule.shifts.length; i++) {
   empList.update(testSchedule.shifts[i]);
   testSchedule.shifts[i].employeeWorking = empList.getEmployeeToSchedule();
   testSchedule.shifts[i].employeeWorking.addShift(testSchedule.shifts[i]);
}

console.log(testSchedule);