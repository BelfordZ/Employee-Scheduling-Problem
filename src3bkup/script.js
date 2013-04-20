/*
DAYS_TO_SCHEDULE = 30;
SHIFTS_PER_DAY = 5;
NUM_EMPLOYEES = 10;

NUM_NODES = DAYS_TO_SCHEDULE * SHIFTS_PER_DAY * NUM_EMPLOYEES;
//todo:
// object Schedule for currentSchedule
// function Schedule.isLastDay()

visited = new Array();
for (var i=0; i<NUM_NODES; i++) visited.push(0);

function employee(ident, name, fte) {
	this.id = ident;
	this.name = name;
	this.fte = fte;
	this.daysConseq = 0;
	this.shifts = new Array();
};

function dfs(tree, v, employeeList) {
   visited[v] = 1;
   
   var employeeState = employeeList.slice(0); // slice to copy by value
   // for each employee with a suitable employee state, connect them
   // assigning an employee to a shift has side-effects within the Employee object (update for next day)
   for (var i=0; i<employeeList.length; i++) {// for each employee
      if (employeeList[i].isSuitable()) { // updates the employee state, returns false is breaks hard const
	 g
      }
   if (currentSchedule.isLastDay()) { // if this is the final day to be scheduled
      return currentSchedule;
   }
   for (var e = 0; e <= tree[v].deg; e++) { // for all edges e adjacent to v
      if (!visited[tree[v].adj[e]]) { // if e is not visited
	 var nextDay = tree[v].adj[e]; // nextDay holds the index to the vertex connected to v by e
	 if (!visited[nextDay]) {
	    dfs(tree, nextDay);
	 }
      }
   }
}

function Node() {
   this.deg = 0; // number of nodes im connected to
   this.adj[5]; // index of the nodes ajacent to me.
   this.visited = false
   this.shift = new Shift(); // holds data associated with the shift
}

function Add_Edge(tree, src, dest, cost) {
   tree[src].cost[tree[src].deg] = cost;
   tree[src].adj[tree[src].deg] = dest;
   tree[src].deg++;
}
*/
