import React from 'react'
import { default as api } from '../store/apiSlice'
import { getLabels, getSum } from '../helper/helper'


//create obj for style
// const obj = [
//     {
//         color: "#f9c74f",
//         type: "Savings",
//         percent: 45
//     },
//     {
//         color: 'rgb(54, 162, 235)',
//         type: "Investment",
//         percent: 29
//     },
//     {
//         color: 'rgb(255, 99, 132)',
//         type: "Expense",
//         percent: 10
//     }
// ]

const Labels = () => {

    //Hook Object from apiSlice with State
    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery()
    let Transactions;

    //Conditions
    if (isFetching) {
        Transactions = <div>Fetching</div>
    } else if (isSuccess) {
        Transactions = getLabels(data, 'type').map((value, index) => <LabelComponent key={index} data={value} />
        )
    } else if (isError) {
        Transactions = <div>Error</div>

    }
    return (
        <>
            {Transactions}
        </>
    )
}


//Component
function LabelComponent({ data }) {
    if (!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className='w-2 h-2 rounded py-3' style={{ background: data.color ?? '#f9c74f' }}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>
    )
}


export default Labels