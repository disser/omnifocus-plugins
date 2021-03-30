(() => {
	let action = new PlugIn.Action(function (selection) {
		selection.tasks.forEach(function (task) {
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
		})
	});

	action.validate = function (selection) {
		return (selection.tasks.length >= 1)
	};

	return action;
})();
