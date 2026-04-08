# Mini Shopping Cart Application

## 1. Project Overview

This project is a single-page shopping cart application developed as part of the Internet Programming assignment. The application allows users to browse products, search and filter items, and manage a shopping cart dynamically.

The system is built using a React frontend and a FastAPI backend connected to a SQLite database. All interactions are handled without page reloads, providing a smooth and responsive user experience.

---

## 2. Features

- View a list of products retrieved from the database
- Filter products by category
- Search products by name
- Add items to the shopping cart
- Update item quantity (+ / -)
- Remove items from the cart
- Real-time cart total calculation
- Stock validation to prevent exceeding available quantity
- Dynamic UI updates without page reload
- User feedback messages for actions (e.g., add/remove)

---

## 3. Technology Stack

### Frontend
- React (with Hooks)
- Vite
- Axios
- CSS

### Backend
- FastAPI
- SQLAlchemy
- SQLite

---

## 4. Project Structure
shopping-cart-assignment/
│
├── backend/
│ ├── main.py
│ ├── models.py
│ ├── schemas.py
│ ├── database.py
│ ├── seed_data.py
│ └── shopping_cart.db
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── public/
│ └── images/
│
└── README.md

---

## 5. How to Run the Backend

1. Navigate to the backend folder:
cd backend

2. Activate virtual environment:
source venv/bin/activate

3. Install dependencies:
pip install fastapi uvicorn sqlalchemy pydantic

4. Initialize database (if needed):
python3 seed_data.py
or 
python seed_data.py 
"please check your own python state"

5. Start the server:
uvicorn main:app --reload

6. Open API docs:
http://127.0.0.1:8000/docs


---

## 6. How to Run the Frontend

1. Navigate to frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start development server:
npm run dev

4. Open in browser:
http://localhost:5173


---

## 7. API Endpoints

### Products
- `GET /products` – Retrieve all products
- `GET /products/{id}` – Retrieve a single product

### Cart
- `GET /cart` – Retrieve all cart items
- `POST /cart` – Add item to cart
- `PUT /cart/{id}` – Update quantity
- `DELETE /cart/{id}` – Remove item

---

## 8. Business Logic

The application includes several business logic rules:

- Users cannot add more items than available stock
- Adding the same product increases quantity instead of creating duplicates
- Quantity cannot be less than 1
- Cart total updates automatically based on changes

---

## 9. Challenges and Solutions

### Challenge 1: Synchronizing frontend and backend data
The frontend needed to stay consistent with backend data after each operation.  
Solution: Reload data from the API after every CRUD operation.

### Challenge 2: Preventing invalid cart operations
Users could potentially exceed stock or create inconsistent states.  
Solution: Added validation logic in the frontend to enforce stock limits.

### Challenge 3: Managing UI responsiveness
Ensuring smooth updates without page reloads required careful state management.  
Solution: Used React hooks such as `useState`, `useEffect`, and `useMemo`.

---

## 10. Future Improvements

- Add user authentication
- Implement order checkout system
- Add product management (admin panel)
- Improve UI with animations and better styling
- Move stock validation to backend for stronger data integrity

---

## 11. Conclusion

This project demonstrates the implementation of a full-stack single-page application using modern web technologies. It satisfies all assignment requirements, including CRUD operations, dynamic updates, and integration with a database.
