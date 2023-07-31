from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

order_groceries = db.Table(
    "order_groceries",
    db.Column("grocery_id", db.Integer, db.ForeignKey("groceries.id")),
    db.Column("order_id", db.Integer, db.ForeignKey("orders.id")),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False, name="uq_username")
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    _password_hash = db.Column(db.String)
    reviews = db.relationship("Review", backref="user")
    orders = db.relationship("Order", backref="user")

    serialize_rules = ("-reviews.user", "orders.user")

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("Please provide a valid email")
        return email

    def __repr__(self):
        return f"<Name:{self.username}, Email:{self.email}>"


class Grocery(db.Model, SerializerMixin):
    __tablename__ = "groceries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    orders = db.relationship(
        "Order", secondary="order_groceries", back_populates="groceries"
    )

    serialize_rules = ("-orders.groceries", "-user.groceries")

    def __repr__(self):
        return f"<Name:{self.name}, Price:{self.price}>"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    serialize_rules = ("-user.reviews",)

    def __repr__(self):
        return f"<Content:{self.content}, Stars:{self.stars}>"


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    items = db.Column(db.String, nullable=False)
    total_items = db.Column(db.Integer, nullable=False)
    tax = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) 
    groceries = db.relationship(
        "Grocery", secondary="order_groceries", back_populates="orders"
    )

    serialize_rules = ("-groceries.orders",)

    def __repr__(self):
        return f"<Name:{self.name}>"
