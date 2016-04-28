var seeder = require('mongoose-seed');


// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/news', function() {

    // Load Mongoose models
    seeder.loadModels([
        'models/Pqrsfnums.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Pqrsfnum'], function() {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data);

    });
});

// Data array containing seed data - documents organized by Model


var data =[
    {
        "model": "Pqrsfnum",
        "documents": [

            {
                "peticion": "P10000",
                "queja": "Q20000",
                "reclamo": "R30000",
                "solicitud": "S40000",
                "felicitacion": "F50000"
            }
        ]
    }
];