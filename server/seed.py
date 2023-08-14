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
        db.session.flush()
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
            password_hash="Violin@0094",
        )
        # u1.password_hash = bcrypt.generate_password_hash("Violin@0094").decode("utf-8")

        users.append(u1)

        u2 = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email="a@a.com",
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
        db.session.flush()
        db.session.commit()

        g1 = Grocery(
            name="Apple",
            image="https://i5.walmartimages.com/seo/Red-Delicious-Apples-Each_7320e63a-de46-4a16-9b8c-526e15219a12_3.e557c1ad9973e1f76f512b34950243a3.jpeg",
            category="Produce",
            price="1.99",
            user_id=1,
        )
        groceries.append(g1)

        g2 = Grocery(
            name="Bread",
            image="https://i5.walmartimages.com/asr/4c021455-4cf6-4b7c-812b-54663ed8253b_1.e37b219eaf92e31fa91884b8b0a4e4b1.jpeg",
            category="Bakery",
            price="4.99",
            user_id=1,
        )
        groceries.append(g2)

        g3 = Grocery(
            name="Lettuce",
            image="https://i5.walmartimages.com/asr/c46b512d-6e44-4970-854f-0c26dcfcf01b.327c7d2a1bfa8c768ca7ecf8351a1762.jpeg",
            category="Produce",
            price="1.49",
            user_id=1,
        )
        groceries.append(g3)

        g4 = Grocery(
            name="Fairlife Milk",
            image="https://i5.walmartimages.com/seo/fairlife-Lactose-Free-2-Reduced-Fat-Ultra-Filtered-Milk-52-fl-oz_00fe0997-294b-4c11-ba0b-9eccebeedd3d.7fafc64183c2b93b4a7a0088685436d2.jpeg",
            category="Dairy",
            price="3.49",
            user_id=1,
        )
        groceries.append(g4)

        g5 = Grocery(
            name="Monster Tomahawk Steak",
            image="https://i5.walmartimages.com/asr/a6241175-ce36-460d-b378-d824954516b9.c37644643517be702749abf9eb66238b.jpeg",
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
