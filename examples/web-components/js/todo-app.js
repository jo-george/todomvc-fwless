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
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <input class="new-todo" placeholder="What needs to be done?" autofocus>
                </header>
            </section>
        `;
    }
}

window.customElements.define('todo-app', TodoApp);