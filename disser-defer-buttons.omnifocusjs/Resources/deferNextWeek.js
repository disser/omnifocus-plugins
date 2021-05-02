(() => {
	let action = new PlugIn.Action(function (selection) {
		let postpone = function(task) {
			let now = new Date();
			let cal = Calendar.current;
			let one_day = new DateComponents();
			one_day.day = 1;
			if (task.deferDate === null || task.deferDate < now) {
				task.deferDate = now;
			}

			// move forward one day
			task.deferDate = cal.dateByAddingDateComponents(task.deferDate, one_day)
			// move forward to monday
			while (task.deferDate.getDay() !== 1) {
				task.deferDate = cal.dateByAddingDateComponents(task.deferDate, one_day)
			}
			task.deferDate = cal.startOfDay(task.deferDate)
		}
		if (selection.tasks)
			selection.tasks.forEach(postpone);
		if (selection.projects)
			selection.projects.forEach(postpone);
	});

	action.validate = function (selection) {
		return (selection.tasks.length >= 1 || selection.projects.length >= 1)
	};

	return action;
})();
