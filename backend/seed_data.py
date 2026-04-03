from database import SessionLocal, engine
from models import Base, Product

Base.metadata.create_all(bind=engine)

db = SessionLocal()

existing_products = db.query(Product).count()

if existing_products == 0:
    sample_products = [
        {
            "name": "Wireless Mouse",
            "description": "A smooth and responsive wireless mouse.",
            "price": 25.99,
            "category": "Electronics",
            "image_url": "https://via.placeholder.com/150",
            "stock": 10
        },
        {
            "name": "Mechanical Keyboard",
            "description": "A durable keyboard with tactile feedback.",
            "price": 79.99,
            "category": "Electronics",
            "image_url": "https://via.placeholder.com/150",
            "stock": 8
        },
        {
            "name": "USB-C Cable",
            "description": "Fast charging USB-C cable.",
            "price": 12.50,
            "category": "Accessories",
            "image_url": "https://via.placeholder.com/150",
            "stock": 20
        },
        {
            "name": "Laptop Stand",
            "description": "Ergonomic aluminum laptop stand.",
            "price": 34.90,
            "category": "Accessories",
            "image_url": "https://via.placeholder.com/150",
            "stock": 15
        },
        {
            "name": "Phone Case",
            "description": "Shockproof phone case.",
            "price": 18.75,
            "category": "Accessories",
            "image_url": "https://via.placeholder.com/150",
            "stock": 25
        }
    ]

    for item in sample_products:
        db.add(Product(**item))

    db.commit()
    print("Sample products inserted successfully.")
else:
    print("Products already exist. No seed data added.")

db.close()