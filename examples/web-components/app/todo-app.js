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

        this.$todoList = this._shadowRoot.querySelector('.todo-list');
        this.$input = this._shadowRoot.querySelector('input');
        this.$newTodo = this._shadowRoot.querySelector('.new-todo');

        bindAddItem();
    }

    template() {
        return html`
            <style>
                @import "../node_modules/todomvc-app-css/index.css";
            </style>
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <input class="new-todo" placeholder="What needs to be done?" autofocus>
                </header>
                <section style="display:none" class="main">
                    <input id="toggle-all" class="toggle-all" type="checkbox">
                    <label for="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">
                        ${store.getState().items.map((item, index) => html`
                            <todo-item 
                                ?checked=${item.checked}
                                .index=${index}
                                text=${item.text}
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
        `;
    }

    bindAddItem() {
		$on(this.$newTodo, 'change', ({target}) => {
			const description = target.value.trim();
			if (description) {
				store.dispatch(addItem(description));
			}
		});
    }

    toggleItem() {
        store.dispatch(toggleItem(target.index));
    }

    removeItem() {
        store.dispatch(removeItem(target.index));
    }

    removeAllCompleted() {
        store.dispatch(removeAllCompleted());
    }
}

window.customElements.define('todo-app', TodoApp);