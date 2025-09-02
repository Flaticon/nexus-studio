// scripts/mongo-init.js
db = db.getSiblingDB('startup_studio');

// Crear usuario para la aplicación
db.createUser({
  user: 'studio_app',
  pwd: 'studio_pass_2024',
  roles: [
    {
      role: 'readWrite',
      db: 'startup_studio'
    }
  ]
});

// Crear colecciones con validación
db.createCollection('startups', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'slug', 'stage', 'status'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        stage: {
          enum: ['idea', 'validation', 'pmf', 'growth', 'scale'],
          description: 'must be a valid stage'
        },
        status: {
          enum: ['active', 'paused', 'archived'],
          description: 'must be a valid status'
        }
      }
    }
  }
});

// Crear índices
db.startups.createIndex({ slug: 1 }, { unique: true });
db.startups.createIndex({ stage: 1, status: 1 });
db.startups.createIndex({ 'squad.lead': 1 });

// Insertar datos de prueba
db.startups.insertMany([
  {
    name: 'FinTech Pro',
    slug: 'fintech-pro',
    stage: 'growth',
    status: 'active',
    squad: {
      lead: ObjectId(),
      members: [ObjectId(), ObjectId()]
    },
    resources: {
      deck: 'https://example.com/deck.pdf',
      demo: 'https://demo.fintech-pro.com'
    },
    kpis: [
      {
        name: 'MRR',
        current: 45000,
        target: 100000,
        unit: 'USD',
        lastUpdated: new Date()
      },
      {
        name: 'Active Users',
        current: 1200,
        target: 5000,
        unit: 'users',
        lastUpdated: new Date()
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'HealthTech AI',
    slug: 'healthtech-ai',
    stage: 'validation',
    status: 'active',
    squad: {
      lead: ObjectId(),
      members: [ObjectId()]
    },
    resources: {
      repository: 'https://github.com/studio/healthtech-ai'
    },
    kpis: [
      {
        name: 'Beta Users',
        current: 50,
        target: 200,
        unit: 'users',
        lastUpdated: new Date()
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully!');