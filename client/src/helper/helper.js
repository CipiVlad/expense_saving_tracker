// npm install lodash --> it builds upon the older underscore
import _ from 'lodash'


// calc sum
export function getSum(transaction, type) {
    // console.log(transaction);

    let sum = _(transaction)
        .groupBy('type')
        .map((objs, key) => {
            if (!type) return _.sumBy(objs, 'amount')
            return {
                'type': key,
                'total': _.sumBy(objs, 'amount'),
                'color': objs[0].color //get color value from object
            }
        })
        .value()
    return sum
}


//calc percentage
export function getLabels(transaction) {
    let amountSum = getSum(transaction, 'type')

    //total amount of all categories
    let Total = _.sum(getSum(transaction))


    //calc percentage
    let percent = _(amountSum)
        .map(objs =>
            _.assign(objs, { percent: (100 * objs.total) / Total }))

        .value()

    return percent

}


//pass getSum to graph
export function chart_Data(transaction, userCustom) {

    // get all colors as an Object
    let doughnutColor = _.map(transaction, a => a.color)

    // set duplicate color unique 
    doughnutColor = _.uniq(doughnutColor)
    // console.log(doughnutColor);

    let dataValue = getSum(transaction)
    const config = {
        data: {
            datasets: [{
                data: dataValue,
                backgroundColor: doughnutColor,
                hoverOffset: 4,
                borderRadius: 30,
                spacing: 10
            }]
        },
        options: {
            cutout: 115
        }
    }

    //?what if user wants to specify own config to doughnut chart 
    return userCustom ?? config
}


//calc Total
export function getTotal(transaction) {
    return _.sum(getSum(transaction))
}