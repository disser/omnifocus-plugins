/*{
	"author": "Rosemary Orchard",
	"targets": ["omnifocus"],
	"type": "action",
	"identifier": "com.rosemaryorchard.omnifocus.complete-and-await-reply",
	"version": "1.0",
	"description": "Mark the currently selected task as complete and add a new task to await the reply.",
	"label": "Complete and Await Reply",
	"mediumLabel": "Complete and Await Reply",
	"paletteLabel": "Complete and Await Reply",
}*/
(() => {
	let action = new PlugIn.Action(function(selection) {
		let duplicatedTasks = new Array()
		selection.tasks.forEach(function(task){
			insertionLocation = task.containingProject
			if(insertionLocation === null){insertionLocation = inbox.ending}
			dupTasks = duplicateTasks([task], insertionLocation)
			dupTasks[0].name = "Waiting on reply: " + task.name;
			duplicatedTasks.push(dupTasks[0].id.primaryKey);
			task.markComplete();
		});
		idStr = duplicatedTasks.join(",")
		URL.fromString("omnifocus:///task/" + idStr).open()
    });

    
	action.validate = function(selection){
		return (selection.tasks.length >= 1)
	};
        
	return action;
})();
