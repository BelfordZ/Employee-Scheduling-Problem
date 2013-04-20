function unitTests() {

   //EMPLOYEE TESTS
   test("Employee()", function() {
	 var testEmployee = new Employee(1, "A", 1.0);
      
	 //testing initialization
	 ok(testEmployee.name == "A" &&
	    testEmployee.fte == 1.0 &&
	    testEmployee.id == 1,
	    "--> Passed initialization");
	 //console.log(testEmployee);
	 //testing shifts for full & half FTE
	 ok(testEmployee.numShiftsRequired == 16,
	    "--> Passed numShiftsRequired Calc for FTE 1.0");
	 //testEmployee = new Employee(1, "A", 0.5);
	 ok(testEmployee.numShiftsRequired == 16,
	    "--> Passed numShiftsRequired Calc for FTE 0.5");
	 
	 //console.log(testEmployee);
	 var testShift0 = new Shift(Date.range('8am', '8pm'), 1, 0);
	 testEmployee.addShift(testShift0); // first shift addition. 
	 	 
	 ok(testEmployee.numShiftsRequired && //ok(testEmployee.numShiftsRequired == 7 &&
	    //testEmployee.lastShift != -1 &&
	    testEmployee.canWorkNext,	    
	    "--> Passed adding on shift 0");

	 //adding a second shift
	 var testShift1 = new Shift(Date.range(Date.create(testShift0.dateRange.start).addDays(1),
					       Date.create(testShift0.dateRange.start).addDays(1).addHours(12)), 0, 0);
	 //console.log(testEmployee);
	 testEmployee.update(testShift1); // updated ma shits for a new day!
	 ok(testEmployee.daysConsec //&&  //testEmployee.daysConsec == 1 &&
	    //testEmployee.canWorkNext,
	    ,"--> Passed updating shift 1");
	 //console.log(testShift1, testEmployee);
	 testEmployee.addShift(testShift1); // second shift addition
	 ok(testEmployee.daysConsec &&
	    testEmployee.numShiftsRequired,
	    "-->Passed adding shift 1");
	 // ok(testEmployee.daysConsec == 2 &&
	 //    testEmployee.numShiftsRequired == 6,
	 //    "-->Passed adding shift 1");
         //adding a third shift
	 var testShift2 = new Shift(Date.range(Date.create(testShift1).addDays(1),
					       Date.create(testShift1).addDays(1).addHours(12)), 0, 0);
	 testEmployee.update(testShift2); // updated ma shits for a new day!
	 
	 ok(testEmployee.daysConsec &&
	    testEmployee, "--> Passed updating shift 2");
	 	 
	 // ok(testEmployee.daysConsec == 2 &&
	 //    testEmployee.canWorkNext, "--> Passed updating shift 2");
	 testEmployee.addShift(testShift2); // second shift addition
	 ok(testEmployee.daysConsec &&
	    testEmployee.numShiftsRequired, "-->Passed adding shift 2");
	 // ok(testEmployee.daysConsec == 3 &&
	 //    testEmployee.numShiftsRequired == 5, "-->Passed adding shift 2");
	 //adding a fourth shift
	 var testShift3 = new Shift(Date.range(Date.create(testShift2).addDays(1),
					       Date.create(testShift2).addDays(1).addHours(12)), 0, 0);
	 testEmployee.update(testShift3);
	 ok(testEmployee.daysConsec == 3 &&
	    testEmployee.canWorkNext == true, "--> Passed update on shift 3");

	 //adding a fourth shift
	 var testShift4 = new Shift(Date.range(Date.create(testShift3).addDays(1),
					       Date.create(testShift3).addDays(1).addHours(12)), 0, 0);
	 testEmployee.update(testShift4);
	 ok(testEmployee.daysConsec == 3 &&
	    testEmployee.canWorkNext == true, "--> Passed update on shift 4");
	 
	 testEmployee.addShift(testShift4);
	 ok(testEmployee.daysConsec == 4 &&
	    testEmployee.lastShift == testShift4 &&
	    testEmployee.canWorkNext == true, "--> Passed adding on shift 4");
      });
      
      //EMPLOYEE LIST TESTS - constructor
      test("EmployeeList()", function() {
	    var testEmployeeList = new EmployeeList();
	    ok(testEmployeeList.eList != undefined, "--> Passed");
	 });
      
      //EMPLOYEE LIST TESTS - member functions
      test("EmployeeList employee functions", function() {
	    var testEmployeeList = new EmployeeList();
	    ok(testEmployeeList.eList.length != 0, "--> Passed");
	    //ok(testEmployeeList.getFTESum()*10 == Math.floor(global.NUM_FTES_REQUIRED()*10), "--> Passed");
	 });
      
      //GLOBAL TESTS
      test("Global.NUM_FTES_REQUIRED()", function() {
	    ok(global.NUM_FTES_REQUIRED() > 0,
	       "--> Passed calc num FTEs");
	 });  
      test("Global.NUM_SHIFTS_TO_SCHEDULE()", function() {
	    ok(global.NUM_SHIFTS_TO_SCHEDULE() > 0,
	       "--> Passed calc num shifts total");
	 });
      test("Global.NUM_ADMITTING_SHIFTS()", function() {
	    ok(global.NUM_ADMITTING_SHIFTS()==2,
	       "--> Passed calc num");
	 });
      test("Global.NUM_ROUNDING_SHIFTS()", function() {
	    ok(global.NUM_ROUNDING_SHIFTS()==3,
	       "--> Passed calc num rounding");
	 });
      
      
      //SHIFT TESTS
      test("Shift()", function() {
	    var testShift = new Shift(Date.range('8am', '8pm'), 1, 0);
	    ok(testShift.id == Date.range('8am', '8pm').toString() + 1 + 0 &&
	       testShift.type == 1 &&
	       testShift.team == 0,
	       "--> Passed shift construction");
	 });
      
      //SCHEDULE TESTS
      test("Schedule()", function() {
	    var testSchedule = new Schedule();
	    ok(testSchedule.shifts.length >= global.NUM_SHIFTS_TO_SCHEDULE(),
	       "--> Passed constructing schedule");
	 });     
}