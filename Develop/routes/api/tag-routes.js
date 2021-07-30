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

// * SUCCESSFUL ROUTE FOR TAG CREATION W/ ONLY TAG_NAME
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagCreate = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json({message: "Tag successfully created!"})
  } catch (error) {
    res.status(400).json(error)
  }
  
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        tag_id: req.params.id
      }
    })
    if(!tagData){
      res.status(404).json({message: `Tag with ${req.params.id} is not found!`})
    }
    res.status(200).json({message: `Tag ${req.params.id} was updated successfully.`})
  } catch (error) {
    res.status(500).json(errors)
  }
}); 

// * SUCCESSFUL ROUTE FOR DELETION
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!deleteTag) {
      res.status(404).json({message: "No tag with specidfied ID!"})
      return;
    }
    res.status(200).json(deleteTag)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
