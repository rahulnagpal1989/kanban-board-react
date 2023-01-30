import React from "react";
import "./index.css"

export default function KanbanBoard(props) { 

	let [newtask, setNewTask] = React.useState('');

	let [tasks, setTasks] = React.useState([
		{ name: '1', stage: 0 },
		{ name: '2', stage: 0 },
	])

	let [stagesNames, setStagesNames] = React.useState(['Backlog', 'To Do', 'Ongoing', 'Done']);


	let stagesTasks = [];
	for (let i = 0; i < stagesNames.length; ++i) {
		stagesTasks.push([]);
	}
	for (let task of tasks) {
		const stageId = task.stage;
		stagesTasks[stageId].push(task);
	}

	const createTask = () => {
		setTasks([...tasks, { name: newtask, stage: 0 }]);
	};

	const moveToBack = (task) => {
		if(task.stage!==0) {
			task.stage--;
			setTasks([...tasks]);
		}
	};

	const moveToForward = (task) => {
		if(task.stage!==stagesNames.length-1) {
			task.stage++;
			setTasks([...tasks]);
		}
	};

	const deleteTask = (task) => {
		setTasks(tasks.filter(e=>e!==task));
	};
	

	return (
		<div className="mt-20 layout-column justify-content-center align-items-center">
			<section className="mt-50 layout-row align-items-center justify-content-center">
				<input id="create-task-input" type="text" className="large" placeholder="New task name" value={newtask} onChange={(e)=>setNewTask(e.target.value)} data-testid="create-task-input" />
				<button type="button" className="ml-30" onClick={()=>createTask()} data-testid="create-task-button">Create task</button>
			</section>

			<div className="mt-50 layout-row">
				{stagesTasks.map((tasks, i) => {
					return (
						<div className="card outlined ml-20 mt-0" key={`${i}`}>
							<div className="card-text">
								<h4>{stagesNames[i]}</h4>
								<ul className="styled mt-50" data-testid={`stage-${i}`}>
									{tasks.map((task, index) => {
										return <li className="slide-up-fade-in" key={`${i}${index}`}>
											<div className="li-content layout-row justify-content-between align-items-center">
												<span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
												<div className="icons">
													<button className="icon-only x-small mx-2" disabled={task.stage === 0} onClick={() => moveToBack(task)} data-testid={`${task.name.split(' ').join('-')}-back`}>
														<i className="material-icons">arrow_back</i>
													</button>
													<button className="icon-only x-small mx-2" disabled={task.stage === stagesNames.length-1} onClick={() => moveToForward(task)} data-testid={`${task.name.split(' ').join('-')}-forward`}>
														<i className="material-icons">arrow_forward</i>
													</button>
													<button className="icon-only danger x-small mx-2" onClick={() => deleteTask(task)} data-testid={`${task.name.split(' ').join('-')}-delete`}>
														<i className="material-icons">delete</i>
													</button>
												</div>
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
