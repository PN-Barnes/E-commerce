const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// * FULLY TESTED ROUTES FOR THIS FILE DIRECTORY //
// * TESTED AND WORKS AS INTENDED
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catdata = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(catdata);
  } 
  catch (error) {
    res.status(500).json(error);
  }
});
// * TESTED AND WORKS AS INTENDED
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catId = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if(!catId) {
      res.status(404).json({ message: 'No Category with this Id!'})
      return;
    }

    res.status(200).json(catId)
  } catch (error) {
    res.status(400).json(err);
  }
});
// * TESTED AND SUCCESSFUL ROUTE
router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat= await Category.create({
      category_id: req.body.category_id,
      category_name: req.body.category_name
    });
    res.status(200).json({message: "Category added successfully"}) 
  } catch (error) {
    res.status(400).json(error)
  }
});

// * TESTED AND SUCCESSFUL ROUTE
router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const catdata = await Category.update(req.body, {
      where: {
        category_id: req.params.id
      }
    });
    if(!catdata){
      res.status(404).json({message: 'No category with this id!'})
      return;
    }
    res.status(200).json({message: `Category ${req.params.id} updated successfully.`})
  } catch (error) {
    res.status(500).json(error)
  }
});


// * SUCCESSFUL TEST ROUTE

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        category_id: req.params.id
      }
    });
    if(!deleteCat){
      res.status(404).json({message: "No Category with this id!"})
      return;
    }

    res.status(200).json(deleteCat)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
