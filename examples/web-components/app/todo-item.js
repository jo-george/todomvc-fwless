import { html, render } from '../node_modules/lit-html/lit-html.js';

// export const escapeForHTML = text => text.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');

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
            <li class=${this.checked ? 'completed' : ''}>
                <div class="view">
                    <input 
                        class="toggle"
                        type="checkbox"
                        .checked=${this.checked}
                        @change=${this.fireToggle}>
                    <label>${this.text}</label>
                    <button class="destroy" @click=${this.fireRemove}></button>
                </div>
            </li>
        `;
    }

    static get observedAttributes() {
        return ['text', 'checked', 'index'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'text') {
            this.text = newValue;
        }
    }

    set index(idx) {
        this.setAttribute('index', idx);
    }

    get index() {
        return this.index;
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(checked) {
        if (checked) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }
}

window.customElements.define('todo-item', TodoItem);