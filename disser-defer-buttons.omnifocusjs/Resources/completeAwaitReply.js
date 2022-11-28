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
    const taskNamePrefix = "Waiting on reply: ";
    let action = new PlugIn.Action(function (selection) {
        let duplicatedTasks = []
        waitingTag = flattenedTags.byName("Waiting");
        selection.tasks.forEach(function (parentTask) {
            // insertionLocation = task.containingProject
            let insertionLocation = parentTask
            if (insertionLocation === null) {
                insertionLocation = inbox.ending
            }
            if (parentTask.name.startsWith(taskNamePrefix)) {
                // This has already been awaited, just make a note
                let now = new Date();
                parentTask.note = now.toDateString() + ": awaiting reply.\n" + parentTask.note
            } else {
                let dupTasks = duplicateTasks([parentTask], insertionLocation)
                dupTasks[0].name = "Waiting on reply: " + parentTask.name;
                if (waitingTag) {
                    dupTasks[0].addTag(waitingTag);
                }
                duplicatedTasks.push(dupTasks[0].id.primaryKey);
                parentTask.completedByChildren = true;
            }
        });

        // idStr = duplicatedTasks.join(",")
        // jump to the new task
        //URL.fromString("omnifocus:///task/" + idStr).open()
    });


    action.validate = function (selection) {
        return (selection.tasks.length >= 1)
    };

    return action;
})();
