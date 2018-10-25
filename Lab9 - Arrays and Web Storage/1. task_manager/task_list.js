"use strict";
var $ = function(id) { return document.getElementById(id); };

var tasks = [];

var displayTaskList = function() {
    var list = "";
    // if there are no tasks in tasks array, check storage
    if (tasks.length === 0) {
        // get tasks from storage or empty string if nothing in storage
        var storage = localStorage.getItem("tasks") || "";

        // if not empty, convert to array and store in global tasks variable
        if (storage.length > 0) { tasks = storage.split("|"); }
    }
    
    // if there are tasks in array, sort and create tasks string
    if (tasks.length > 0) {
        tasks.sort();
        list = tasks.join("\n");
    }
    // display tasks string and set focus on task text box
    $("task_list").value = list;
    $("task").focus();
};

var addToTaskList = function() {   
    var task = $("task").value;
    if ($("task").value === "") {
        alert("Please enter a task.");
    } else {  
        // add task to array and local storage
		var temp = new Array();
		temp = task.split(",");
        for(var i=0; i<temp.length; i++)
		{
			tasks.push(temp[i]);
		}
		
		//use either above loop or the line below.
		//tasks = tasks.concat(temp);
		
       // tasks.push(task.value);
		localStorage.tasks = tasks.join("|");

        // clear task text box and re-display tasks
        $("task").value = "";
        displayTaskList();
    }
};

var clearTaskList = function() {
    tasks.length = 0;
    localStorage.tasks = "";
    $("task_list").value = "";
    $("task").focus();
};

window.onload = function() {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;    
    displayTaskList();
};