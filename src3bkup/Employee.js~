function Employee(eid, ename, efte) {
   this.id = eid;
   this.name = ename;
   this.fte = efte;
   this.daysConsec = 0;
   this.canWorkNext = true;
   this.lastShift = -1;
   this.numShiftsRequired = 0;
   this.numShiftsToWork();
}

Employee.prototype.numShiftsToWork = function() {
   this.numShiftsRequired = (global.NUM_DAYS_TO_SCHEDULE/30) * 16 * this.fte;
};
   
Employee.prototype.addShift = function(shift) {
   this.lastShift = shift;
   this.numShiftsRequired--;
   this.daysConsec++;
};
//called before trying to schedule the input shift.
Employee.prototype.update = function(shift) {
   //check if still same day as the one last worked
   if (this.lastShift.day == shift.day) {
      this.canWorkNext = false;
   } else {
      this.canWorkNext = true;
   }
   //check if the day of this shift is at least a day ago (aka had a day off)
   if (shift.day - this.lastShift.day > 1) {
      this.daysConsec = 0;
      this.canWorkNext = true;
   }
   //check if the day of this shift is at least a day ago (aka had a day off)
   if (this.daysConsec > 7) {
      this.canWorkNext = false;
   }
};