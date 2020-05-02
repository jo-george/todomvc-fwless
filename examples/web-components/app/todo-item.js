import { html, render } from '../node_modules/lit-html/lit-html.js';

export const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');

class TodoItem extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }

    connectedCallback() {
        if(!this.hasAttribute('text')) {
            this.setAttribute('text', 'placeholder');
        }
        render(this.template(), this._shadowRoot, {eventContext: this});
    }

    fireToggle(e) {
        this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
    }

    fireRemove(e) {
        this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
    }

    template() {
        return html`
            <style>
                @import "../node_modules/todomvc-app-css/index.css";
            </style>
            <li ${this._checked ? ' class="completed"' : ''}>
                <div class="view">
                    <input class="toggle" type="checkbox" .checked=${this._checked} @change=${this.fireToggle}>
                    <label>${escapeForHTML(item.title)}</label>
                    <button class="destroy" @click=${this.fireRemove}></button>
                </div>
            </li>
        `;
    }
}

window.customElements.define('todo-item', TodoItem);