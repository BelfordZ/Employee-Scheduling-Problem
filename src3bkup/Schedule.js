function Schedule() {
   this.shifts = new Array();
   this.currIndex = 0;
   this.numShiftsToSchedule = global.NUM_SHIFTS_TO_SCHEDULE();	

   //for each day
   //   for the number of rounding team shifts per day
   //        create a shift from 8:00 to 20:00, type 0
   
   for (var i=0; i<global.NUM_DAYS_TO_SCHEDULE; i++) {
      for (var j=0; j<global.NUM_SHIFTS_PER_DAY; j++) {
	 this.shifts.push(new Shift(i, j));
      }
   }
}
//Side effect: puts an employee and the employeeWorking, increment
//             to the next shift.
Schedule.prototype.employeeToShift = function (shiftId, employeeId) {
   // would be ideal to be able to do:
   this.shifts[shiftId].employeeWorking = employeeId;
   this.currIndex++;
};
//Returns the next shift object to be scheduled. NOT the shiftId.
Schedule.prototype.getNextShiftToSchedule = function () {
   if (this.currIndex > this.numShiftsToSchedule)
      return false;
   else
      return this.shifts[this.currIndex]; 
};