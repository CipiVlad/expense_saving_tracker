const model = require('../model/model')

/** 
 * @description         create new categories
 * @api                 /api/categories
 * @method              POST
 */

async function create_Categories(req, res) {
    const Create = new model.Categories({
        type: "Savings",
        color: "#1F3B5C "
    })

    await Create.save(function (err) {
        if (!err) return res.json(Create);
        return res.status(400).json({ message: `Error while creating categories ${err}` });
    })
}


/** 
 * @description         get all categories
 * @api                 /api/categories
 * @method              GET
 */

async function get_Categories(req, res) {
    let data = await model.Categories.find({})

    //Object.assign to only get type and color, without _id
    let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color }))
    return res.json(filter)
}


/** 
 * @description         create new categories
 * @api                 /api/transaction
 * @method              POST
 */

async function create_Transaction(req, res) {
    if (!req.body) return res.status(400).json({ msg: 'Post data not provided' })
    let { name, type, amount } = req.body

    const create = await new model.Transaction({
        name,
        type,
        amount,
        date: new Date()
    })

    create.save(function (err) {
        if (!err) return res.json(create)
        return res.status(400).json({ message: "Err creating new Transaction" })
    })
}

/** 
 * @description         get all Transactions
 * @api                 /api/transaction
 * @method              GET
 */

async function get_Transaction(req, res) {
    const data = await model.Transaction.find({})
    return res.json(data)
}


/** 
 * @description         get all Transactions
 * @api                 /api/transaction
 * @method              DELETE
 */


async function delete_Transaction(req, res) {
    if (!req.body) res.status(400).json({ msg: 'Request not found!' })
    const data = await model.Transaction.deleteOne(req.body)

    if (data) {
        res.status(200).json({ msg: 'Successfully Deleted!' })
    }
}




/** 
 * @description         COMBINE data Transactions And Categrories, with mongoose aggregate Function
 *                      https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
 * @api                 /api/labels
 * @method              GET
 */

async function get_Labels(req, res) {

    // mongoose "aggregate" - function combines the "Collection"
    model.Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ])
        .then(result => {
            let data =
                result.map(v => Object.assign({}, {
                    _id: v._id,
                    name: v.name,
                    type: v.type,
                    amount: v.amount,
                    color: v.categories_info['color']
                }))
            res.json(data)
        })
        .catch(err => { res.status(400).json('Lookup Collection Error!') })

}


//the module "controller" exports these functions as an object
module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}