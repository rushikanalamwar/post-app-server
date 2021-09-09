const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

class ModelBase {
  constructor() {
    // Get all
    this.getAllActive = asyncHandler(async (req, res, next) => {
      const docs = await this.model.find({ activation_status: true })
      res.status(200).json({ data: docs })
    })

    // Get all
    this.getAllActiveRecords = asyncHandler(async (req, res, next) => {
      const docs = await this.model.find({ activation_status: true })
      res.status(200).json({ data: docs })
    })
    // Get all
    this.getAll = asyncHandler(async (req, res, next) => {
      const docs = await this.model.find({})
      res.status(200).json({ data: docs })
    })
    // Count all
    this.count = asyncHandler(async (req, res, next) => {
      const count = await this.model.count()
      res.status(200).json({ count: count })
    })
    // Insert
    this.insert = asyncHandler(async (req, res, next) => {
      req.body.activation_status = true
      req.body.create_date = new Date()
      const obj = new this.model(req.body)
      obj.save((err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          return res.status(400).json({
            errors: [
              {
                title: 'Already Exist',
                message: 'Record Already Exist !'
              }
            ]
          })
        }
        if (err || !item) {
          console.log(err)
          res.statusMessage = 'Invalid Input!'
          return res.status(400).json({ messsage: 'Invalid Input!' })
        }
        res.status(200).json({ data: item })
      })
    })
    // Get by id
    this.get = asyncHandler(async (req, res, next) => {
      const docs = await this.model.findById(req.params.id)
      res.status(200).json({ data: docs })
    })
    // Update by id
    this.update = asyncHandler(async (req, res, next) => {
      const docs = await this.model.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res.status(200).json({ data: docs })
    })
    // Deactivate by id
    this.deactivateID = asyncHandler(async (req, res, next) => {
      const docs = await this.model.findOneAndUpdate(
        { _id: req.params.id },
        { activation_status: false },
        { new: true }
      )
      res.status(200).json({ data: docs })
    })
    // Delete by id
    this.delete = asyncHandler(async (req, res, next) => {
      const docs = await this.model.findOneAndRemove({ _id: req.params.id })
      res.status(200).json({ data: docs })
    })
    this.getTodaysUTCDate = () => {
      const date = new Date()
      const now_utc = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      )
      return new Date(now_utc)
    }
  }
}
module.exports = ModelBase
