const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// * SUCCESSFUL GET ROUTE FOR ALL
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
});
// * SUCCESSFUL GET ROUTE FOR ID
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, 
      {
        include: [{model: Product}]
      })
      if(!tagData) {
        res.status(404).json({message: 'No Tag with this ID!'})
        return;
      }
      res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
