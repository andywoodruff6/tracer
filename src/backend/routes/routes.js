import express from 'express';
const router = express.Router();

// TODO - make this route only callable from the website
router.get('/', (req, res)=> {
    
    res.status(200).json({message: "test"})
})

export default router;