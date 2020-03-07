import {html, render} from 'https://unpkg.com/lit-html?module';

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });

        render(this.template(), this._shadowRoot, {eventContext: this});

        this.$input = this._shadowRoot.querySelector('input');
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
                    <ul class="todo-list"></ul>
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
                        <button class="clear-completed">Clear completed</button>
                    </footer>
			    </section>
            </section>
        `;
    }
}

window.customElements.define('todo-app', TodoApp);