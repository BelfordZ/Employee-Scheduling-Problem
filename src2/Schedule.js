function Schedule() {
   this.shifts = new Array();
   for (var i=0; i<global.NUM_DAYS_TO_SCHEDULE; i++) {
      for (var j=0; j<global.NUM_SHIFTS_PER_DAY; j++) {
	 this.shifts.push(new Shift(i, j));
      }
   }
}