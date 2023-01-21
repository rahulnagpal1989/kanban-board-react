import React from 'react';
import './App.css';
import 'h8k-components';
import KanbanBoard from './components/kanban-board/index';

const title = "Kanban Board";

const App = () => {
    return (
        <div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<KanbanBoard />
        </div>
    );
}

export default App;
