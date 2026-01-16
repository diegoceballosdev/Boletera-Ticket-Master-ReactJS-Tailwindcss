import { useForm } from 'react-hook-form';

const SignupForm = () => {

    // usamos react-hook-form:
    const {
        register, // registra los campos del formulario
        handleSubmit, // maneja el envío del formulario
        reset,  // resetea los campos del formulario
        formState: { errors } // contiene los errores de validación
    } = useForm();

    const handleSubmitForm = (data) => {
        console.log('Datos del formulario:', data);
    }

    const handleClearClick = () => {
        reset();
    };

    console.log('Errores del formulario:', errors);

    return (
        <div>
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <label>
                    name
                    <input {...register('name', { required: true })} />
                </label>
                <br />
                <label>
                    age
                    <input {...register('age', { required: true })} />
                </label>
                <br />
                <label>
                    address
                    <input {...register('address', { required: true })} />
                </label>
                <br />
                <label>
                    cp
                    <input {...register('cp', { required: true })} />
                </label>
                <br />
                <label>
                    phone
                    <input {...register('phone', { required: true })} />
                </label>
                <div>
                    <button type="button" onClick={handleClearClick}>Clear</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;