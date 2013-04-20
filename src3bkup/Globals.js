// I am all the global defs. My namespace is called ZB.
// everything should live inside of me. That is, anything from
// here on out should like ZB.Employee = function ....
// What makes something def'd global?
//    its constant
//    its calc'd once from constants
//    its a function that gets used too much
//    they all must not be particular to an class

function ZB() {
   // how many days we are gonna schedule on this run of the algo
   this.NUM_DAYS_TO_SCHEDULE = 30;
   
   // number of shifts in a given day
   this.NUM_SHIFTS_PER_DAY = 5;

   // number of shifts somone with 1.0 fte is expected to work in a month
   this.FTE_MONTHLY_SHIFTS = 16;

   // number of employees. is set when adding employees, init to 0
   this.NUM_EMPLOYEES = 0;

   // number of possible rounding teams
   this.NUM_ROUNDING_TEAMS = 3;
   this.NUM_SHIFTS_PER_ROUNDING_TEAM = 1;
   // number of possible admitting teams
   this.NUM_ADMITTING_TEAMS = 1;
   this.NUM_SHIFTS_PER_ADMITTING_TEAM = 2;
}


//input:
//returns: float fte_req
//         Calculated number of employee FTE we need to fill schedule
ZB.prototype.NUM_FTES_REQUIRED = function(){
   return ((
	      (this.NUM_SHIFTS_PER_ADMITTING_TEAM*this.NUM_ADMITTING_TEAMS)+
	      (this.NUM_SHIFTS_PER_ROUNDING_TEAM*this.NUM_ROUNDING_TEAMS))*
	   365/12/16)
   .toFixed(2);
};
ZB.prototype.NUM_SHIFTS_TO_SCHEDULE = function() {
   return(this.NUM_DAYS_TO_SCHEDULE * this.NUM_SHIFTS_PER_DAY);
};
ZB.prototype.NUM_ADMITTING_SHIFTS = function() {
   return(this.NUM_ADMITTING_TEAMS * this.NUM_SHIFTS_PER_ADMITTING_TEAM);
};
ZB.prototype.NUM_ROUNDING_SHIFTS = function() {
   return(this.NUM_ROUNDING_TEAMS * this.NUM_SHIFTS_PER_ROUNDING_TEAM);
};
global = new ZB();