import { useForm } from 'react-hook-form'
import List from './List'
import { default as api } from '../store/apiSlice'


const Form = () => {

    const { register, handleSubmit, resetField } = useForm()

    //ApiHook
    const [addTransaction] = api.useAddTransactionMutation()



    //Async 
    const onSubmit = async (data) => {
        if (!data) return {}

        //if data :
        await addTransaction(data).unwrap()

        //update Form after submit
        resetField('name')
        resetField('amount')
    }


    return (
        <div className="form max-w-sm mx-auto 2-96">
            <h1 className='font-bold pb-4 text-lx'>Transaction</h1>
            <form onSubmit={handleSubmit(onSubmit)} id='form'>
                <div className="input-group">
                    <input {...register('name')} type="text" placeholder='Consumption, Entertainment ...' className='form-input' />
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expenses">Expenses</option>
                    <option value="Savings">Savings</option>
                </select>
                <div className="input-group">
                    <input {...register('amount')} type="text" placeholder='Amount' className='form-input' />
                    <div className="submit-btn">
                        <button className='border rounded-md  py-2 text-white bg-indigo-500 w-full'>Save</button>
                    </div>
                </div>
            </form>
            <List></List>
        </div>
    )
}

export default Form