(() => {
    let action = new PlugIn.Action(function (selection) {
        let projects = new Set();
        selection.tasks.forEach(function (task) {
            let parentProject = task.containingProject;
            if (parentProject) {
                projects.add(parentProject);
            }
        });

        let winPromise = document.newWindow();
        winPromise.then(win => {
            win.perspective = Perspective.BuiltIn.Projects;
            win.focus = Array.from(projects);
            win.content.select(task);
        })
    });

    action.validate = function (selection) {
        return (selection.tasks.length === 1)
    };

    return action;
})();
