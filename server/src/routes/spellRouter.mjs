import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import spell from '../models/spell';
import { requireLogin } from '../utils/auth';

const router = express.Router();
router.use(bodyParser.json({ limit: '5mb' }));
router.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));

const lightSpellFields =
  'name school level classTypes castingTime range components duration';

// METHODS
function getAllPossibleFilters(spells) {
  const names = spells.map(spell => spell.name);
  const schools = spells.map(spell => spell.school);
  const levels = spells.map(spell => spell.level);
  const classTypes = spells.map(spell => spell.classTypes);
  const ranges = spells.map(spell => spell.range);
  const components = spells.map(spell => spell.components);

  return {
    // The key value object is a IDropdownCollection model on the client side.
    names: names.map(value => { return { key: value, value: _.upperFirst(value) } }),
    schools: _.uniq(schools).map(value => { return { key: value, value: _.upperFirst(value) } }),
    levels: _.uniq(levels).map(value => { return { key: value, value: _.upperFirst(value) } }),
    classTypes: _.uniq(_.flattenDeep(classTypes)).map(value => { return { key: value, value: _.upperFirst(value) } }),
    ranges: _.uniq(ranges).map(value => { return { key: value, value: _.upperFirst(value) } }),
    components: _.uniq(_.flattenDeep(components)).map(value => { return { key: value, value: _.upperFirst(value) } })
  };
}

function buildFindQuery(filters) {
  // Remove empty arrays from filters.
  const new_filters = _.omitBy(filters, _.isEmpty);

  const query = Object.assign(
    {},
    {},
    new_filters.hasOwnProperty('names') && { name: { $in: new_filters.names.map(value => _.toLower(value)) } },
    new_filters.hasOwnProperty('schools') && { school: { $in: new_filters.schools.map(value => _.toLower(value)) } },
    new_filters.hasOwnProperty('levels') && { level: { $in: new_filters.levels.map(value => _.toLower(value)) } },
    new_filters.hasOwnProperty('classTypes') && { classTypes: { $in: new_filters.classTypes.map(value => _.toLower(value)) } },
    new_filters.hasOwnProperty('ranges') && { range: { $in: new_filters.ranges.map(value => _.toLower(value)) } },
    new_filters.hasOwnProperty('components') && { components: { $in: new_filters.components.map(value => _.toLower(value)) } }
  );
  return query;
}

// READ //
// RETURNS ALL (FULL) SPELLS IN THE DATABASE
router.get('/', requireLogin, function(req, res, next) {
  spell.find({}, function(err, spells) {
    if (err) {
      const err = new Error('There was a problem finding the spells.');
      err.status = 500;
      return next(err);
    }

    if (!spells) {
      const err = new Error('No spells found.');
      err.status = 404;
      return next(err);
    }

    return res.status(200).send(spells);
  });
});

// GETS A SINGLE SPELL FROM THE DATABASE FROM ID
router.get('/id/:id', requireLogin, function(req, res, next) {
  spell.findById(req.params.id, function(err, spell) {
    if (err) {
      const err = new Error('There was a problem finding the spell.');
      err.status = 500;
      return next(err);
    }

    if (!spell) {
      const err = new Error('No spell found.');
      err.status = 404;
      return next(err);
    }

    return res.status(200).send(spell);
  });
});

// RETURNS ALL LIGHtLY LOADED SPELLS IN THE DATABASE
router.get('/light', requireLogin, function(req, res, next) {
  spell.find({}, lightSpellFields, function(err, spells) {
    if (err) {
      const err = new Error('There was a problem finding the spells.');
      err.status = 500;
      return next(err);
    }

    if (!spells) {
      const err = new Error('No spells found.');
      err.status = 404;
      return next(err);
    }

    return res.status(200).send(spells);
  });
});

// RETURNS ALL LIGHTLY LOADED SPELLS IN THE DATABASE WITH POSIBLE FILTERS
// req: {
//          filters {
//              name: 'some spell'
//              schools: ['destruction'],
//              levels: [1, 2]
//              classTypes ['wizard']
//              ranges: [-1, 0, 120]
//              components: ['V', 'S', 'M'],
//          }
//       }
// Note, All properties in the filters object are optional.
router.get('/light/withfilters', requireLogin, function(req, res, next) {
  spell.find({}, lightSpellFields, function(err, spells) {
    if (err) {
      const err = new Error('There was a problem finding the spells.');
      err.status = 500;
      return next(err);
    }

    if (!spells) {
      const err = new Error('No spells found.');
      err.status = 404;
      return next(err);
    }

    const spellsWithFilters = {
      filters: getAllPossibleFilters(spells),
      spells: spells
    };
    return res.status(200).send(spellsWithFilters);
  });
});

// RETURNS LIGHTLY LOADED SPELLS WITH POSSIBLE FILTERS FROM SUPPLIED FILTERS INPUT
router.post('/light/withfilters', requireLogin, function(req, res, next) {
  const filters = buildFindQuery(req.body);
  spell.find(filters, lightSpellFields, function(err, spells) {
    if (err) {
      const err = new Error('There was a problem finding the spells.');
      err.status = 500;
      return next(err);
    }

    if (!spells) {
      const err = new Error('No spells found.');
      err.status = 404;
      return next(err);
    }

    const spellsWithFilters = {
      filters: getAllPossibleFilters(spells),
      spells: spells
    };

    return res.status(200).send(spellsWithFilters);
  });
});

// CREATE //
// CREATES A NEW SPELL
// router.post('/create', function (req, res, next) {
//     spell.create(req.body, function (err, spell) {
//         if (err) return res.status(500).send("There was a problem adding the information to the database.");
//         res.status(200).send(spell);
//     }
//     );
// });

// CREATES AN ARRAY SPELLS
// router.post('/create/batch', requireLogin, function(req, res, next) {
//   if (!req.body.spells) {
//     const error = new Error('No spells found in request body.');
//     error.status = 500;
//     return next(error);
//   }

//   spell.insertMany(req.body.spells, function(err, spells) {
//     if (err) {
//       console.log(err);
//       const error = new Error('There was a problem adding the spells to the database.');
//       error.status = 500;
//       return next(error);
//     }

//     res.status(200).send('Added Spells to the database.');
//   });
// });

// UPDATE //
// UPDATES A SINGLE SPELL IN THE DATABASE
// router.put('/:id', requireLogin, function (req, res, next) {
//     spell.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, spell) {
//         if (err) {
//             const err = new Error("There was a problem updating the spell.");
//             err.status = 500;
//             return next(err);
//         }

//         if (!spell) {
//             const err = new Error("No spells found to update.");
//             err.status = 404;
//             return next(err);
//         }

//         res.status(200).send(spell);
//     });
// });

// DELETE //
// DELETES A SPELL FROM THE DATABASE
// router.delete('/:id', requireLogin, function (req, res, next) {
//     spell.findByIdAndRemove(req.params.id, function (err, spell) {
//         if (err) {
//             const err = new Error("There was a problem removing the spell.");
//             err.status = 500;
//             return next(err);
//         }

//         res.status(200).send("Spell was deleted.");
//     });
// });

// DELETES ALL SPELLS FROM THE DATABASE
// router.delete('/', requireLogin, function (req, res, next) {
//     spell.deleteMany({}, function (err, spell) {
//         if (err) {
//             const err = new Error("There was a problem removing the spells.");
//             err.status = 500;
//             return next(err);
//         }

//         res.status(200).send("spell " + spell.name + " was deleted.");
//     });
// });

export default router;
