class Alerts extends HTMLElement {
  public shadowRoot: ShadowRoot
  constructor () {
    super ()

    this.shadowRoot = this.attachShadow({ mode: 'open' })

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
       <div></div>
      `
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