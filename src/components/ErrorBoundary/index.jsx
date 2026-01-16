import { Component } from 'react';

class ErrorBoundary extends Component {

    // El constructor inicializa el estado del componente:
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // Este método se llama cuando un error es lanzado en un componente hijo:
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Este método se utiliza para registrar el error:
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
    }

    // El método renderiza una interfaz alternativa si hay un error:
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;