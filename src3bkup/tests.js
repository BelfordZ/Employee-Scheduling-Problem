function unitTests() {
   //EMPLOYEE TESTS
   test("Employee()", function() {
	 var testEmployee = new Employee(1, "A", 1.0);
	 ok(testEmployee.name == "A" &&
	    testEmployee.fte == 1.0 &&
	    testEmployee.id == 1, "--> Passed initialization");
	 ok(testEmployee.numShiftsRequired == 16, "--> Passed numShiftsRequired Calc for FTE 1.0");
	 var testEmployee = new Employee(1, "A", 0.5);
	 ok(testEmployee.numShiftsRequired == 8, "--> Passed numShiftsRequired Calc for FTE 0.5");
      });
   
   //EMPLOYEE TESTS
   test("Employee().addShift() followed by Employee.update()", function() {
	 var testEmployee = new Employee(1, "A", 1.0);
	 var testShift0 = new Shift(1,1);
	 testEmployee.addShift(testShift0);
	 ok(testEmployee.numShiftsRequired == 15 &&
	    testEmployee.lastShift != -1 &&
	    testEmployee.daysConsec != 0 &&
	    testEmployee.canWorkNext == true, "--> Passed adding on shift 0");
	 var testShift1 = new Shift(1,2);
	 testEmployee.update(testShift1);
	 ok(testEmployee.daysConsec == 1 &&
	    testEmployee.canWorkNext == false, "--> Passed update on shift 1");
	 var testShift2 = new Shift(1,3);
	 testEmployee.update(testShift2);
	 ok(testEmployee.daysConsec == 1 &&
	    testEmployee.canWorkNext == false, "--> Passed update on shift2");
	 var testShift3 = new Shift(2,1);
	 testEmployee.update(testShift3);
	 ok(testEmployee.daysConsec == 1 &&
	    testEmployee.canWorkNext == true, "--> Passed update on shift 3");
	 testEmployee.addShift(testShift3);
	 ok(testEmployee.daysConsec == 2 &&
	    testEmployee.lastShift == testShift3 &&
	    testEmployee.canWorkNext == true, "--> Passed adding on shift 3");
      });
   
   //EMPLOYEE LIST TESTS
   test("EmployeeList()", function() {
	 var testEmployeeList = new EmployeeList();
	 ok(testEmployeeList.eList != undefined, "--> Passed");
      });  
   test("EmployeeList.makeEmployeeList()", function() {
	 var testEmployeeList = new EmployeeList();
	 ok(testEmployeeList.makeEmployeeList(), "--> Passed");
	 ok(testEmployeeList.eList.length != 0, "--> Passed");
      });
   test("EmployeeList.getFTESum == NUM_FTES_REQUIRED", function() {
	 var testEmployeeList = new EmployeeList();
	 testEmployeeList.makeEmployeeList();
	 ok(testEmployeeList.getFTESum()*10 == Math.floor(global.NUM_FTES_REQUIRED()*10), "--> Passed");
      });

   
   //GLOBAL TESTS
   test("Global.NUM_FTES_REQUIRED()", function() {
	 ok(global.NUM_FTES_REQUIRED() > 0, "--> Passed");
      });  
   test("Global.NUM_SHIFTS_TO_SCHEDULE()", function() {
	 ok(global.NUM_SHIFTS_TO_SCHEDULE() > 0, "--> Passed");
      });
   test("Global.NUM_ADMITTING_SHIFTS()", function() {
	 //console.log(global.NUM_ADMITTING_SHIFTS());
	 ok(global.NUM_ADMITTING_SHIFTS()==2, "--> Passed");
      });
   test("Global.NUM_ROUNDING_SHIFTS()", function() {
	 ok(global.NUM_ROUNDING_SHIFTS()==3, "--> Passed");
      });

   
   //SHIFT TESTS
   test("Shift()", function() {
	 var testShift = new Shift(1,1);
	 ok((testShift.day == 1 &&
	     testShift.shift == 1 &&
	     testShift.type == 0), "--> Passed");
      });

   
   //SCHEDULE TESTS
   test("Schedule()", function() {
	 var testSchedule = new Schedule();
	 ok(testSchedule.shifts.length == global.NUM_SHIFTS_TO_SCHEDULE(), "--> Passed");
      });   
}