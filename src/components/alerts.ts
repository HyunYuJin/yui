import type {
  Nodes,
  Events
} from '../types'

class Alerts extends HTMLElement {
  public shadowRoot: ShadowRoot
  public nodes: Nodes
  public events: Events
  constructor () {
    super ()

    this.shadowRoot = this.attachShadow({ mode: 'open' })
    this.nodes = {}
    this.events = {}

    this.render()
    this.init()
  }

  private init () {
    
  }

  private render (): void {
    this.shadowRoot.innerHTML = this.getTemplate()
  }

  private getTemplate(): string {
    return `
      ${ this.getStyle() }
        <div class="alert">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </span>
          <p class="text">${ this.getText() }</p>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      `
  }

  private getText (): string {
    const text = this.innerHTML as string

    return text
  }

  private getStyle (): string {
    return `
      <style>
        @import '/Users/hyeon-yujin/Documents/dev/yui/src/styles/alerts.scss';
      </style>
    `
  }
}

export default customElements.define('yui-alert', Alerts)