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
            <li ${this.checked ? ' class="completed"' : ''}>
                <div class="view">
                    <input 
                        type="checkbox"
                        class="toggle"
                        .checked=${this.checked}
                        @change=${this.fireToggle}>
                    <label class=${this.checked ? 'completed' : ''}>${this.text}</label>
                    <button class="destroy" @click=${this.fireRemove}></button>
                </div>
            </li>
        `;
    }

    static get observedAttributes() {
        return ['text', 'checked', 'index'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'text':
                this.text = newValue;
                break;
            case 'checked':
                this.checked = this.hasAttribute('checked');
                break;
            // case 'index':
            //    this.index = parseInt(newValue);
            //    break;
        }
        render(this.template(), this._shadowRoot, {eventContext: this});
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