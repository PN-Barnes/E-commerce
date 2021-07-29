const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catdata = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(catdata);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const catId = await Category.findByPk(req.params.id);

    if(!catId) {
      res.status(404).json({ message: 'No Category with this Id!'})
    }

    

  } catch (error) {
    res.status(400).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat= req.body;

    
  } catch (error) {
    
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
