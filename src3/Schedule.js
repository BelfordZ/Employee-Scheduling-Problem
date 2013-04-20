function Schedule() {
   this.shifts = new Array();
   this.currIndex = 0;
   this.numShiftsToSchedule = global.NUM_SHIFTS_TO_SCHEDULE();	
   //for each day in range today -> NUM_DAYS_TO_SCHEDULE
   //   for the number of rounding team shifts per day
   //        create a shift from 8:00 to 20:00, type 0
   //   for the number of admitting teams per day
   //        create a shift from 8:00 to 20:00, type 1,day
   //        create a shift from 20:00 to 8:00, type 1,night

   //makes all the admitting shifts
   // we have two per day, holding the start times possible for shift assignment
   for (var j=0; j< global.SHIFT_RANGE.length; j++) { 
      var shiftInRange = global.SHIFT_RANGE[j]; 
      //var dayStart = Date.create(shiftInRange).beginningOfDay().addDays(1);
      //is this a night shift or a day shift?
      if (shiftInRange.getHours() < 9) { // day shifts
	 for (var k=0; k<global.NUM_ROUNDING_SHIFTS(); k++) { // for each rounding shift
	    this.shifts.push(new Shift(Date.range(shiftInRange, (12).hoursAfter(shiftInRange)),
				       0, k));
	 }
	 // add the day admitting
	 this.shifts.push(new Shift(Date.range(shiftInRange,
					       Date.create(shiftInRange).addHours(12)), 1, 0));
      } else {
	 // add the night admitting
	 this.shifts.push(new Shift(Date.range(shiftInRange,
					       Date.create(shiftInRange).addHours(12)), 1, 1));
      }
   }
   this.shifts = this.shifts.to(150)
}
//Side effect: puts an employee and the employeeWorking, increment
//             to the next shift.
Schedule.prototype.employeeToShift = function (shiftToSet, employee) {
   // would be ideal to be able to do:
   //console.log(shiftToSet.id);
   
   // var indexOfShift = this.shifts.findIndex(function(shift) {
   // 	 shift.id == shiftToSet.id;
   //    });
   var indexOfShift = -1;
   for (var l=0; l<this.shifts.length; l++) {
      if (this.shifts[l].id == shiftToSet.id) {
	 console.log(l);
	 indexOfShift = l;
	 l = this.shifts.length + 1;
      }
   }
   //console.log("employee ------> " + indexOfShift);
   this.shifts[indexOfShift].employeeWorking = employee.id;
   this.currIndex++;
};
//Returns the next shift object to be scheduled. NOT the shiftId.
Schedule.prototype.getNextShiftToSchedule = function () {
   if (this.currIndex > this.numShiftsToSchedule)
      return false;
   else
      return this.shifts[this.currIndex]; 
};