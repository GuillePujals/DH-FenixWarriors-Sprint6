"# DH-FenixWarriors-Sprint6" 
IMPORTANTE VERIFICAR EL ORDEN DE EJECUCION
1- genero los modelos de las tablas qu no tienen foreing key

sequelize model:generate --name Destination --attributes destination:string

sequelize model:generate --name User --attributes first_name:string,last_name:string,mail:string,telephone:integer,avatar:string,password:string,addres:string,owner:tinyInt

sequelize model:generate --name Category --attributes category:string
 
2- Despues se crean las que tienen la foreing Key (nivel 2)
sequelize model:generate --name Property --attributes user_id:integer,destination_id:integer,wifi:tinyint,pool:tinyint,parking:tinyint,barbecue:tinyint,price:decimal,category_id:integer,n_of_people:integer

sequelize model:generate --name Interest --attributes user_id:integer,interest:string


2- Despues se crean las que tienen la foreing Key (Nivel 3)

sequelize model:generate --name Image --attributes property_id:integer,image_name:string

sequelize model:generate --name Order --attributes property_id:integer,user_id:integer,check_in:date,check_out:date,n_of_people:integer,credit_card:string,cvc:string,expiry_date:date,comment:string,rating:integer

Crear todas las relaciones correpondientes
Modelo Property

 static associate(models) {
      // belongsTo
      Property.belongsTo(models.Destination, {
        as: "destination",
        foreignKey:"destination_id"
      });
      Property.belongsTo(models.User, {
        as: "user",
        foreignKey:"user_id"
      });
      Property.belongsTo(models.Category, {
        as: "category",
        foreignKey:"category_id"
      });
     
     //hasMany
     Property.hasMany(models.Image, {
      as: "image",
      foreignKey: 'property_id'
      });
     Property.hasMany(models.Order, {
      as: "order",
      foreignKey: 'property_id'
      });
    }


Modelo User

static associate(models) {
      //hasMany
      User.hasMany(models.Property,{
        as:"property",
        foreignKey:'user_id'
      });

      User.hasMany(models.Order,{
        as:"order",
        foreignKey:'user_id'
      });

    }


Modelo Order

static associate(models) {

      Order.belongsTo(models.Property, {
        as: "property",
        foreignKey: 'porperty_id'
      });
      Order.belongsTo(models.User,{
        as:"user",
        foreignKey:'user_id'
      })

    }

Modelo FOTO
static associate(models) {
      Image.belongsTo(models)(models.Property, {
        as:"property",
        foreignKey: 'property_id'
      });
   }

Modelo INTERES
static associate(models) {

      Interest.belongsTo(models.User,{
        as:"user",
        foreignKey:'user_id'
      });
   }

Modelo Destination
    static associate(models) {
      Destination.hasMany(models.Property, {
        as: "property",
        foreignKey: 'destination_id'
        });
    }

Modelo CATEGORIA
	
    static associate(models) {
      Category.hasMany(models.Property, {
        as: "property",
        foreignKey: 'category_id'
        });
    }


AHORA HAY QUE AGREGAR LAS CLAVES FORÁNEAS DE LA MIGRACIÓN
MIGRACION PROPERTY (/migrations/date-create-property.js)
      category_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'category',
          key:'id'
        }
      },
      destination_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'destination',
          key:'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'user',
          key:'id'
        }
      },

MIGRACION IMAGE (/migrations/date-create-image.js)
      property_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'property',
          key:'id'
        }
      }
 
MIGRACION ORDER (/migrations/date-create-order.js)

      property_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'property',
          key:'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model:'user',
          key:'id'
        }
      },



CREAR LA MIGRACION Y CREACION DE LAS TABLAS
//sequelize db:migrate
node_modules/.bin/sequelize db:migrate