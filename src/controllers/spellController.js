import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash'
import spell from '../models/spell';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '5mb' }));
router.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));

// METHODS
function getAllPossibleFilters(spells) {
    const names = spells.map(spell => spell.name);
    const schools = spells.map(spell => spell.school);
    const levels = spells.map(spell => spell.level);
    const classes = spells.map(spell => spell.classes);
    const ranges = spells.map(spell => spell.range);
    const components = spells.map(spell => spell.components);
    // const materials = spells.map(spell => (spell.materials));

    return {
        names: names,
        schools: _.uniq(schools),
        levels: _.uniq(levels),
        classes: _.uniq(_.flattenDeep(classes)),
        // castingTime: 1,
        // castingTimeDescription: 'action',
        ranges: _.uniq(ranges),
        components: _.uniq(_.flattenDeep(components))
        // materials: _.uniq(_.flattenDeep(materials)),
        // duration: 1,
        // durationDescription: 'minute',
    };
};

function buildFindQuery(filters) {
    const query = {}
    Object.assign(query,
        filters.hasOwnProperty("name") && { name: _.toLower(filters.name) },
        filters.hasOwnProperty("schools") && { school: { $in: filters.schools.map(value => (_.toLower(value))) } },
        filters.hasOwnProperty("levels") && { level: { $in: filters.levels.map(value => (_.toLower(value))) } },
        filters.hasOwnProperty("classes") && { classes: { $in: filters.classes.map(value => (_.toLower(value))) } },
        filters.hasOwnProperty("ranges") && { range: { $in: filters.ranges.map(value => (_.toLower(value))) } },
        filters.hasOwnProperty("components") && { components: { $in: filters.components.map(value => (_.toLower(value))) } }
    )
    return query;
}

// READ //
// GETS A SINGLE SPELL FROM THE DATABASE
router.get('/id/:id', function (req, res) {
    spell.findById(req.params.id, function (err, spell) {
        if (err) return res.status(500).send("There was a problem finding the spell.");
        if (!spell) return res.status(404).send("No spell found.");
        res.status(200).send(spell);
    });
});

// GETS A SINGLE LIGHTLY LOADED SPELL FROM THE DATABASE
router.get('/light/id/:id', function (req, res) {
    spell.findById(req.params.id,
        'name school level classes castingTime castingTimeDescription range rangeDescription components duration durationDescription',
        function (err, spell) {
            if (err) return res.status(500).send("There was a problem finding the spell.");
            if (!spell) return res.status(404).send("No spell found.");
            res.status(200).send(spell);
        }
    );
});

// RETURNS ALL SPELLS IN THE DATABASE
router.get('/', function (req, res) {
    spell.find({}, function (err, spells) {
        if (err) return res.status(500).send("There was a problem finding the Spells.");
        res.status(200).send(spells);
    });
});

// RETURNS ALL LIGHtLY LOADED SPELLS IN THE DATABASE
router.get('/light', function (req, res) {
    spell.find({},
        'name school level classes castingTime castingTimeDescription range rangeDescription components duration durationDescription',
        function (err, spells) {
            if (err) return res.status(500).send("There was a problem finding the Spells.");
            res.status(200).send(spells);
        }
    );
});

// RETURNS ALL SPELLS IN THE DATABASE WITH POSIBLE FILTERS
router.get('/withfilters', function (req, res) {
    spell.find({}, function (err, spells) {
        if (err) return res.status(500).send("There was a problem finding the Spellsssss.");

        const spellsWithFilters = {
            filters: getAllPossibleFilters(spells),
            spells: spells
        }
        return res.status(200).send(spellsWithFilters);
    });
});

// RETURNS ALL LIGHTLY LOADED SPELLS IN THE DATABASE WITH POSIBLE FILTERS
router.get('/light/withfilters', function (req, res) {
    spell.find({},
        'name school level classes castingTime castingTimeDescription range rangeDescription components duration durationDescription',
        function (err, spells) {
            if (err) return res.status(500).send("There was a problem finding the Spellsssss.");

            const spellsWithFilters = {
                filters: getAllPossibleFilters(spells),
                spells: spells
            }
            return res.status(200).send(spellsWithFilters);
        }
    );
});

// RETURNS SPELLS WITH POSSIBLE FILTERS FROM SUPPLIED FILTERS INPUT
// req: {
//          filters {
//              name: 'some spell'
//              schools: ['destruction'],
//              levels: [1, 2]
//              classes ['wizard']
//              ranges: [-1, 0, 120]
//              components: ['V', 'S', 'M'],
//          }
//       }
// Note, All properties in the filters object are optional.
router.post('/withfilters', function (req, res) {
    console.log(req.body);

    const filters = buildFindQuery(req.body);
    console.log(filters);
    spell.find(filters, function (err, spells) {
        if (err) {
            return res.status(500).send("There was a problem finding the Spells.");
        }

        const spellsWithFilters = {
            filters: getAllPossibleFilters(spells),
            spells: spells
        }
        return res.status(200).send(spellsWithFilters);
    });
});

// RETURNS LIGHTLY LOADED SPELLS WITH POSSIBLE FILTERS FROM SUPPLIED FILTERS INPUT
router.post('/light/withfilters', function (req, res) {
    console.log(req.body);

    const filters = buildFindQuery(req.body);
    console.log(filters);
    spell.find(filters,
        'name school level classes castingTime castingTimeDescription range rangeDescription components duration durationDescription',
        function (err, spells) {
            if (err) {
                return res.status(500).send("There was a problem finding the Spells.");
            }

            const spellsWithFilters = {
                filters: getAllPossibleFilters(spells),
                spells: spells
            }
            return res.status(200).send(spellsWithFilters);
        }
    );
});

// CREATE //
// CREATES A NEW SPELL
// router.post('/create', function (req, res) {
//     spell.create(req.body, function (err, spell) {
//         if (err) return res.status(500).send("There was a problem adding the information to the database.");
//         res.status(200).send(spell);
//     }
//     );
// });

// CREATES AN ARRAY SPELLS
router.post('/create/batch', function (req, res) {
    spell.insertMany(req.body.spells, function (err, spells) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(spells);
    }
    );
});

// UPDATE //
// UPDATES A SINGLE SPELL IN THE DATABASE
// router.put('/:id', function (req, res) {
//     spell.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, spell) {
//         if (err) return res.status(500).send("There was a problem updating the spell.");
//         res.status(200).send(spell);
//     });
// });

// DELETE //
// DELETES A SPELL FROM THE DATABASE
// router.delete('/:id', function (req, res) {
//     spell.findByIdAndRemove(req.params.id, function (err, spell) {
//         if (err) return res.status(500).send("There was a problem deleting the spell.");
//         res.status(200).send("spell " + spell.name + " was deleted.");
//     });
// });

// DELETES ALL SPELLS FROM THE DATABASE
router.delete('/', function (req, res) {
    spell.deleteMany({}, function (err, spell) {
        if (err) return res.status(500).send("There was a problem deleting the spell.");
        res.status(200).send("spell " + spell.name + " was deleted.");
    });
});



export default router;