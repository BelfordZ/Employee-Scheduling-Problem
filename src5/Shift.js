function Shift(dateRange, shiftType, team) {
   this.id = dateRange.toString() + shiftType + team;
   this.dateRange = dateRange;
   this.employeeWorking;
   this.type = shiftType;
   this.team = team;
   this.isNight; // i dont think ill end up needing this one...
}
// type 0-> rounding shift
// type 1-> admitting shift

// team a -> 0, b->1, c->2
// team day->0, night->1