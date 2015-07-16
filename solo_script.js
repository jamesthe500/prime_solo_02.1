// ! ! !
// Three Bugs
/*
First, in the function, calculateSTI, the array referrences needed to be "array[i][x]", where x is the proper position 
for what is being looked for. I think that's two mistakes in one. 

Where it said "return basePercent - 1;", the "- 1" was a bug and removing it fixed it. 

I also made it round for newArray[3], the bonus ammount.

And where it's calling newArray[2], I rewrote the formula so we don't get those long decimals.

That's 4 or 5 bugs? hm.
Then I took a break before cracking into the deep stuff.

Hard: I put spaces in at the start of the relavent newArray[x] assignments in the calculateSTI 
function to solve this one.

Pro: I altered the second array to read as a percent rather than a decimal. Put in "$" signs. 
Altered the style directly in HTML to change the ul style to not have bullet points.

I'd like to put in commas to separate the place values of the numbers over 1000, but the way I
can imagine would take more time than I have. It would mean converting to string, parsing out 
the numbers, dropping in commas as the number is rebuilt, and it would all be couched in conditional
statements. Fun, but not as fun as a good night's rest.

*/
 var person = new Object();

function Person(name, employeeNumber, annSalary, rating){
        this.name = name;
        this.employeeNumber = employeeNumber;
        this.annSalary = annSalary;
        this.rating = rating;
      }

var Atticus = new Person("Atticus", "2405", "47000", 3);
var Jem = new Person("Jem", "62347", "63500", 4);
var Boo = new Person("Boo", "11435", "54000", 3);
var Scout = new Person("Scout", "6243", "74750", 5);

var array = [Atticus, Jem, Boo, Scout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array);
 	newEl = document.createElement('li');
	newText = document.createTextNode(array[i]);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array){
  var newArray = [];
// I had it reference the sub array's position below. now we only get one iteration of the array.
// Then I changed the first reference to 'i', but not on the next line - a problem.
  newArray[0] = array[i].name;

  var employeeNumber = array[i].employeeNumber;
  var baseSalary = array[i].annSalary;
  var reviewScore = array[i].rating;
// console.log(array[i][0]); used to see if this above was working, it was
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newArray[1] = " " + bonus * 100 + "%";
//changed the string to a number, replaced the "1.0 + bonus" to "(baseSalary * bonus)".
//this got rid of the decimals after the total salary.  
// Coming back to add spaces, I had to ouch [2] in another parseInt so it would not go back to stringiness
  newArray[2] = " $" + parseInt(parseInt(baseSalary) + (baseSalary * bonus)); 
// added Math.round to fix that per the instructions.
  newArray[3] = " $" + Math.round(baseSalary * bonus);

 console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  // console.log(basePercent); Used to see if "basePercent - 1" was a problem, it was.
  return basePercent;
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}
