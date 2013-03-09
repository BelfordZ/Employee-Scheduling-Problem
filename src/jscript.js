/*
employee: {id, name, fte, daysConseq, shifts[] = shiftID}
employees[employeeID]: {employee}}
day: {weekdayOrWeekend, holiday}
week: { days[] }
month: { weeks[] }
shift: { {day}, shift#, shiftID, employeeID}
*/

NUM_OF_SHIFTS_PER_DAY = 5;
CURR_EMPLOYEE_INDEX = 0;
// Okay, so this code is a mess. Thats alright though, it just needs a refactoring.
// I suggest we do a refactor after we have completed the first few constraints being modeled.

// This file has the script which basically abstracts our schedule into a composition of 
// the sets {month, week, day, shift}. Further, we have an employee object, who has many
// properties. Most of its properties concern maintaining some state information for the 
// constraints, which are in the update function. The update function is invoked each
// time we are scheduling a new day. The Shifts array holds the shift id's of all shifts
// assigned. a shiftid is a composition of monthid+','+weekid+','+dayid+','+shiftid.


// Feel free to email/facebook/google me with any questions
// Zach Belford


//employees[employees.size()] = employee;
employeeList = [
	{"name": "Zach Belford", "fte": 1.2},
	{"name": "Joe Dirt", "fte": 1.0}
];

function employee(ident, name, fte) {
	this.id = ident;
	this.name = name;
	this.fte = fte;
	this.daysConseq = 0;
	this.weight = 100;
	this.shifts = new Array();
	this.getDayFromShift = function(shift_id) {
		return shift_id.substr(0, shift_id.lastIndexOf(","));
	}
	this.addShift = function(shiftId) {
		if (this.getDayFromShift(shiftId) != this.dayOfLastShift)
		{
			this.daysConseq++;
			this.shifts.push(shiftId);
			
			if (this.daysConseq > 6)
				this.weight = -100;
			if (this.daysConseq > 3)
				this.weight = 75;
		}
	}
	this.update = function(dayId) { 
	// this is where most of the constraints will actually go
		if (this.shifts[0])
		{
			//var lastShiftAdded = this.shifts[this.shifts.length - 1];
			this.dayOfLastShift = this.getDayFromShift(this.shifts[this.shifts.length -1]);//lastShiftAdded.substr(0, lastShiftAdded.lastIndexOf(","));
			if (this.dayOfLastShift == dayId)
				this.weight == -100
			else
				this.weight == 0;
		}

		for(var i=0; i<this.shifts.length; i++)
		{
			// get the most recent shift addition
			// find the pos of last comma
			// substring 0 - last comma
			// use string.find(substring) on each element of shifts
			
		}
		if (this.daysConseq > 3)
			this.weight = 75;
	}
};
Employees = new Array();
function initEmployees()
{
	CURR_EMPLOYEE_INDEX = 0;
	
	for (var i = 0; i<2; i++) {
		Employees.push(new employee(
								CURR_EMPLOYEE_INDEX.toString(),
								employeeList[i].name,
								employeeList.fte));
		CURR_EMPLOYEE_INDEX++;
	}
}

function shift(shift_id) {
	// shift id should independantly identify shifts throughout a
	// given scheduling period. 
	// 		we have: weekID + dayID + shiftID
	// where 0 <= shiftID < 5
	this.id = shift_id;
	
	// assign an employee
	this.employeeWorkingId = null;
	// Sort them based on their weights
	Employees.sort(function(a,b) { return a.weight < b.weight });
	//Employees[0].shifts.push(this.id);
	Employees[0].addShift(this.id);
	//this.children = Employees;
};

function day(day_id) {
	this.id = day_id;
	this.shifts = new Array();
	for (var i = 0; i<NUM_OF_SHIFTS_PER_DAY; i++)
		this.shifts[i] = new shift(day_id + ", " + i.toString());
	// update employee weights
	for (var i = 0; i<CURR_EMPLOYEE_INDEX; i++)
		Employees[i].update(this.id);
	this.children = this.shifts;

};

function week(week_id) {
	// week id is between 0 and 3, numbering the 4 weeks of month.
	this.id = week_id;
	this.days = new Array();
	for (var i = 0; i<7; i++)
		this.days[i] = new day(week_id + ", " + i.toString());
	this.children = this.days;
};

function month(month_id) {
	this.id = month_id;
	this.weeks = new Array();
	for (var i = 0; i<4; i++)
		this.weeks[i] = new week(month_id + ", " + i.toString());
	this.children = this.weeks;
}

function Schedule()
{
	this.test = new month("dec");
}

initEmployees();
sched = new Schedule();
console.log(JSON.stringify(Employees));