#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import db, app, bcrypt
from models import User, Grocery, Review, Order, order_groceries

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Grocery.query.delete()
        Review.query.delete()
        Order.query.delete()
        db.session.execute(order_groceries.delete())
        db.session.commit()

        users = []
        groceries = []
        reviews = []
        orders = []

        u1 = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email="j@yahoo.com",
            address=fake.address(),
            phone_number="1234567890",
            is_admin=True,
        )
        u1.password_hash = bcrypt.generate_password_hash("Violin@0094").decode("utf-8")

        users.append(u1)

        u2 = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            address=fake.address(),
            phone_number="0987654321",
            is_admin=False,
        )
        u2.password_hash = bcrypt.generate_password_hash("Violin@0094").decode("utf-8")

        users.append(u2)

        u3 = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            address=fake.address(),
            phone_number="4569874312",
            is_admin=False,
        )
        u3.password_hash = bcrypt.generate_password_hash("Violin@0094").decode("utf-8")

        users.append(u3)

        db.session.add_all(users)
        db.session.commit()

        g1 = Grocery(
            name="Apple",
            image="https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg",
            category="Produce",
            price="1.99",
            user_id=1,
        )
        groceries.append(g1)

        g2 = Grocery(
            name="Bread",
            image="https://cdn.pixabay.com/photo/2018/04/03/18/26/fresh-bread-3287600_1280.jpg",
            category="Bakery",
            price="4.99",
            user_id=1,
        )
        groceries.append(g2)

        g3 = Grocery(
            name="Lettuce",
            image="https://cdn.pixabay.com/photo/2018/06/17/14/45/salad-3480650_1280.jpg",
            category="Produce",
            price="1.49",
            user_id=1,
        )
        groceries.append(g3)

        g4 = Grocery(
            name="Milk",
            image="https://cdn.pixabay.com/photo/2017/09/11/23/34/milk-bottle-2740848_1280.jpg",
            category="Dairy",
            price="3.49",
            user_id=1,
        )
        groceries.append(g4)

        g5 = Grocery(
            name="2lbs Cubed Steak",
            image="https://cdn.pixabay.com/photo/2019/12/20/14/44/meat-4708595_1280.jpg",
            category="Meat",
            price="14.99",
            user_id=1,
        )
        groceries.append(g5)

        db.session.add_all(groceries)
        db.session.commit()

        r1 = Review(
            content="Incredibly fresh - I love this product!",
            stars=5,
            user_id=rc(users).id,
            grocery_id=rc(groceries).id,
        )
        reviews.append(r1)

        r2 = Review(
            content="Good quality as always!",
            stars=4,
            user_id=rc(users).id,
            grocery_id=rc(groceries).id,
        )
        reviews.append(r2)

        r3 = Review(
            content="Tasty and fresh, I highly reccommend.",
            stars=5,
            user_id=rc(users).id,
            grocery_id=rc(groceries).id,
        )
        reviews.append(r3)

        r4 = Review(
            content="Not my favorite brand...wouldn't reccomend.",
            stars=2,
            user_id=rc(users).id,
            grocery_id=rc(groceries).id,
        )
        reviews.append(r4)

        db.session.add_all(reviews)
        db.session.commit()

        o1 = Order(
            total_items=3,
            subtotal=9.97,
            tax=0.53,
            total_price=10.50,
            user_id=2,
        )
        o1.groceries.append(g2)
        o1.groceries.append(g3)
        o1.groceries.append(g4)
        orders.append(o1)

        db.session.add_all(orders)
        db.session.commit()

        print("...data seeding complete!")
