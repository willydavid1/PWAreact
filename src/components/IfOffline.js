import React, { Component } from 'react'

export default class IfOffline extends Component {
    state = {
        onLine: true
    }
    
    componentDidMount() {
        if (!window) return
        if (!window.navigator.onLine) this.goOffline()

        // cuando el navegador nos indica que estamos online o offline llamamos a los metodos
        window.addEventListener('online', this.goOnline)
        window.addEventListener('offline', this.goOffline)
    }

    componentWillMount() {
        window.removeEventListener("online", this.goOnline);
        window.removeEventListener("offline", this.goOffline);
    }

    goOnline = () => this.setState({ onLine: true })
    goOffline = () => this.setState({ onLine: false })

    render() {
        if (this.state.onLine) return null
        return (
            <div className="offline" >
                { this.props.children }
            </div>
        )
    }
}