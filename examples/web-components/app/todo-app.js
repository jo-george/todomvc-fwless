import { html, render } from '../node_modules/lit-html/lit-html.js';
import reducer from './store/reducer.js';
import { addItem, toggleItem, removeItem, removeAllCompleted } from './store/actions.js';
import './todo-item.js';

const store = window.Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class TodoApp extends HTMLElement {
    
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });

        document.addEventListener('DOMContentLoaded', () => {
            render(this.template(), this._shadowRoot, {eventContext: this});
        });
    }

    template() {
        return html`
            <style>
                @import "../node_modules/todomvc-app-css/index.css";
            </style>
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <input class="new-todo" placeholder="What needs to be done?" @change=${this.addItem} autofocus>
                </header>
                <section class="main">
                    <input id="toggle-all" class="toggle-all" type="checkbox">
                    <label for="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">
                        ${store.getState().items.map((item, index) => html`
                            <todo-item 
                                ?checked=${item.completed}
                                .index=${index}
                                text=${item.description}
                                @onRemove=${this.removeItem}
                                @onToggle=${this.toggleItem}>    
                            </todo-item>
                        `)}
                    </ul>
                    <footer class="footer">
                        <span class="todo-count"></span>
                        <ul class="filters">
                            <li>
                                <a href="#/" class="selected">All</a>
                            </li>
                            <li>
                            <a href="#/active">Active</a>
                            </li>
                            <li>
                            <a href="#/completed">Completed</a>
                            </li>
                        </ul>
                        <button class="clear-completed" @click=${this.removeAllCompleted}>Clear completed</button>
                    </footer>
                </section>
            </section>
            <footer class="info">
			    <p>Double-click to edit a todo</p>
		    </footer>
        `;
    }

    addItem(e) {
        const description = e.target.value.trim();
        if (description) {
            store.dispatch(addItem(description));
            e.target.value = '';
        }
    }

    toggleItem(e) {
        store.dispatch(toggleItem(e.target.index));
    }

    removeItem(e) {
        store.dispatch(removeItem(e.target.index));
    }

    removeAllCompleted() {
        store.dispatch(removeAllCompleted());
    }
}

window.customElements.define('todo-app', TodoApp);