function Employee(eid, ename, efte) {
   this.id = eid;
   this.name = ename;
   this.fte = efte;
   this.daysConsec = 0;
   this.canWorkNext = true;
   this.lastShift;
   this.numShiftsRequired = 0;
   this.numShiftsToWork();
   this.lastType;
   this.lastTeam;
   this.reqDayOff = false;
}

Employee.prototype.numShiftsToWork = function() {
   this.numShiftsRequired = (global.NUM_DAYS_TO_SCHEDULE/30) * 16 * this.fte;
};
   
Employee.prototype.addShift = function(shift) {
   this.type = shift.lastType;
   this.team = shift.lastTeam;
   this.lastShift = shift;
   this.numShiftsRequired--;
   this.daysConsec++;  
};
//called before trying to schedule the input shift.
Employee.prototype.update = function(shift) {
   if (this.lastShift != undefined) { // if we have worked a shift so far
      //if lastShift.end is on the same day as input shift.start
      if (this.lastShift.dateRange.end.beginningOfDay()
	  .isBefore(shift.dateRange.start.beginningOfDay())) {
	 this.canWorkNext = false; // same day as last shift... cant work!
      } else {
	 this.canWorkNext = true; // Can work
      }

      //Check if had a day off. (basically, check if not worked yesterday...
      // if last shifts end was at least 1 day greater than input shift.start
      if(this.lastShift.dateRange.end.beginningOfDay()
	 .isBefore(shift.dateRange.start.beginningOfDay().addDays(-1))) {
	 this.daysConsec = 0;
	 this.canWorkNext = true;
      }
      //more than 7 conseq...
      if (this.daysConsec > 7) {
	 this.canWorkNext = false;
	 this.reqDayOff = true;
      }
      // if worked night shift, can't work day
      if (this.lastShift.dateRange.end.getHours() == 8 && shift.type == 1 && shift.team == 1) {
	 this.canWorkNext = false;
	 console.log(this.lastShift.dateRange);
      }
      if (this.numShiftsRequired < 0) {
	 this.canWorkNext = false;
      }
   }
};