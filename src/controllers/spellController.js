import express from 'express';
import bodyParser from 'body-parser';
import spell from '../models/spell';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// CREATES A NEW SPELL
router.post('/', function (req, res) {
    spell.create({
        name: req.body.name,
        school: req.body.school,
        level: req.body.level,
        classes: req.body.classes,
        castingTime: req.body.castingTime,
        castingTimeDescription: req.body.castingTimeDescription,
        range: req.body.range,
        rangeDescription: req.body.reangeDescription,
        components: req.body.components,
        duration: req.body.duration,
        durationDescription: req.body.durationDescription,
        description: req.body.description,
        atHigherLevels: req.body.atHigherLevels
    },
        function (err, spell) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(spell);
        }
    );
});

// CREATES AN ARRAY SPELLS
router.post('/batch', function (req, res) {
    spell.create(req.spells,
        function (err, spells) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(spells);
        }
    );
});

// RETURNS ALL THE SPELLS IN THE DATABASE
router.get('/', function (req, res) {
    spell.find({}, function (err, spells) {
        if (err) return res.status(500).send("There was a problem finding the Spells.");
        res.status(200).send(spells);
    });
});

// GETS A SINGLE SPELL FROM THE DATABASE
router.get('/:id', function (req, res) {
    spell.findById(req.params.id, function (err, spell) {
        if (err) return res.status(500).send("There was a problem finding the spell.");
        if (!spell) return res.status(404).send("No spell found.");
        res.status(200).send(spell);
    });
});

// DELETES A SPELL FROM THE DATABASE
router.delete('/:id', function (req, res) {
    spell.findByIdAndRemove(req.params.id, function (err, spell) {
        if (err) return res.status(500).send("There was a problem deleting the spell.");
        res.status(200).send("spell " + spell.name + " was deleted.");
    });
});

// UPDATES A SINGLE SPELL IN THE DATABASE
router.put('/:id', function (req, res) {
    spell.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, spell) {
        if (err) return res.status(500).send("There was a problem updating the spell.");
        res.status(200).send(spell);
    });
});

//module.exports = router;
export default router;