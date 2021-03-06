(() => {
	let action = new PlugIn.Action(function (selection) {
		let postpone = function(task) {
			let now = new Date();
			let cal = Calendar.current;
			let one_hour = new DateComponents();
			one_hour.hour = 1;
			if (task.deferDate === null || task.deferDate < now) {
				task.deferDate = now;
			}

			task.deferDate = cal.dateByAddingDateComponents(task.deferDate, one_hour);
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
