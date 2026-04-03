from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Shopping Cart API is running"}


@app.get("/products", response_model=list[schemas.ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()


@app.get("/products/{product_id}", response_model=schemas.ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.get("/cart", response_model=list[schemas.CartItemResponse])
def get_cart(db: Session = Depends(get_db)):
    return db.query(models.CartItem).all()


@app.post("/cart", response_model=schemas.CartItemResponse)
def add_to_cart(cart_item: schemas.CartItemCreate, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == cart_item.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing_item = (
        db.query(models.CartItem)
        .filter(models.CartItem.product_id == cart_item.product_id)
        .first()
    )

    if existing_item:
        existing_item.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item

    new_item = models.CartItem(
        product_id=cart_item.product_id,
        quantity=cart_item.quantity
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@app.put("/cart/{cart_item_id}", response_model=schemas.CartItemResponse)
def update_cart_item(
    cart_item_id: int,
    item_update: schemas.CartItemUpdate,
    db: Session = Depends(get_db)
):
    cart_item = db.query(models.CartItem).filter(models.CartItem.id == cart_item_id).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    if item_update.quantity < 1:
        raise HTTPException(status_code=400, detail="Quantity must be at least 1")

    cart_item.quantity = item_update.quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item


@app.delete("/cart/{cart_item_id}")
def delete_cart_item(cart_item_id: int, db: Session = Depends(get_db)):
    cart_item = db.query(models.CartItem).filter(models.CartItem.id == cart_item_id).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()
    return {"message": "Cart item deleted successfully"}