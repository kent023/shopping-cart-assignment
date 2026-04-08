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
            "image_url": "/images/mouse.jpg",
            "stock": 10
        },
        {
            "name": "Mechanical Keyboard",
            "description": "A durable keyboard with tactile feedback.",
            "price": 79.99,
            "category": "Electronics",
            "image_url": "/images/keyboard.jpg",
            "stock": 8
        },
        {
            "name": "USB-C Cable",
            "description": "Fast charging USB-C cable.",
            "price": 12.50,
            "category": "Accessories",
            "image_url": "/images/cable.jpg",
            "stock": 20
        },
        {
            "name": "Laptop",
            "description": "High-performance laptop for work and play.",
            "price": 999.99,
            "category": "Electronics",
            "image_url": "/images/laptop.jpg",
            "stock": 15
        },
        {
            "name": "Phone Case",
            "description": "Shockproof phone case.",
            "price": 275.75,
            "category": "Accessories",
            "image_url": "/images/phone.jpg",
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