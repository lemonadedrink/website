import express from 'express';
import {Book}  from '/Users/Lenovo/Desktop/VI/website/backend/models/bookmodel.js';

const router = express.Router();


//save
//routes
//new
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.published) {
            return res.status(400).json({ error: 'title and published fields are required' });
        }

        const newbook = { title: req.body.title, published: req.body.published };
        const book = await Book.create(newbook);
        return res.status(201).json(book);
    }
    catch (err) { console.log(err); res.status(500).json({ error: 'Something went wrong' }); }
});

router.get('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "bad error" });
    }
});




router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({ count: books.length, data: books });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "bad error" });
    }
});


router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.published) {
            return res.status(400).json({ error: 'title and published fields are required' });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);
        if (!result) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.status(200).json(result);

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "bad error" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.status(204).json(result);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "bad error" });
    }
});

export default router;