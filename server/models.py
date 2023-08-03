from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from better_profanity import profanity

from config import db, bcrypt

order_groceries = db.Table(
    "order_groceries",
    db.Column("grocery_id", db.Integer, db.ForeignKey("groceries.id")),
    db.Column("order_id", db.Integer, db.ForeignKey("orders.id")),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    _password_hash = db.Column(db.String)
    reviews = db.relationship("Review", backref="user")
    orders = db.relationship("Order", backref="user")

    serialize_rules = ("-reviews.user", "orders.user")

    def validate_password(self, password):
        password = password.strip()
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")

        if not any(char.isupper() for char in password):
            raise ValueError("Password must contain at least one uppercase letter.")

        if not any(char.islower() for char in password):
            raise ValueError("Password must contain at least one lowercase letter.")

        if not any(char.isdigit() for char in password):
            raise ValueError("Password must contain at least one digit.")

        if not any(char in '!@#$%^&*(),.?":{}|<>' for char in password):
            raise ValueError(
                'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).'
            )

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("first_name")
    def validate_first_name(self, key, first_name):
        first_name = first_name.strip()
        if not first_name:
            raise ValueError("User must have a first name")
        if len(first_name) > 50:
            raise ValueError("First name must not exceed 50 characters")
        if not first_name.isalpha():
            raise ValueError("First name may only contain letters")
        return first_name

    @validates("last_name")
    def validate_last_name(self, key, last_name):
        last_name = last_name.strip()
        if not last_name:
            raise ValueError("User must have a last name")
        if len(last_name) > 50:
            raise ValueError("Last name must not exceed 50 characters")
        if not last_name.isalpha():
            raise ValueError("Last name may only contain letters")
        return last_name

    @validates("email")
    def validate_email(self, key, email):
        email = email.strip()
        if "@" not in email:
            raise ValueError("Please provide a valid email")
        if "." not in email:
            raise ValueError("Please provide a valid email")
        return email

    @validates("phone_number")
    def validate_phone(self, key, phone_number):
        phone_number = phone_number.strip()
        if len(phone_number) < 10:
            raise ValueError("Phone number must be at least 10 characters long.")
        if not phone_number.isdigit():
            raise ValueError("Phone number may only contain numbers.")
        return phone_number

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
    reviews = db.relationship("Review", backref="grocery")
    orders = db.relationship(
        "Order", secondary="order_groceries", back_populates="groceries"
    )

    serialize_rules = ("-orders.groceries", "-user.groceries", "reviews.grocery")

    ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "gif"]

    @validates("name")
    def validates_name(self, key, name):
        name = name.strip()
        if not name:
            raise ValueError("Grocery item must have a name")
        if len(name) > 50:
            raise ValueError("Name must not exceed 50 characters")
        if not name.isalnum():
            raise ValueError("Grocery names must contain only letters or numbers")
        return name

    @validates("image")
    def validates_image(self, key, image):
        image = image.strip()
        if not image:
            raise ValueError("Grocery item must have an image")
        if "." not in image:
            raise ValueError(
                "Grocery image must have a valid extension (e.g., .png, .jpg, .jpeg, .gif)"
            )
        file_extension = image.rsplit(".", 1)[1].lower()
        if file_extension not in Grocery.ALLOWED_EXTENSIONS:
            raise ValueError(
                "Invalid image file type. Allowed file types: png, jpg, jpeg, gif"
            )
        return image

    @validates("category")
    def validate_category(self, key, category):
        category = category.strip()
        if not category:
            raise ValueError("Category must not be empty")
        return category

    @validates("price")
    def validates_price(self, key, price):
        price = price.strip()
        if not price:
            raise ValueError("Grocery must have a price")
        dollars, cents = price.split(".")
        if not dollars.isdigit() or not cents.isdigit() or len(cents) != 2:
            raise ValueError("Price must be in valid format (e.g., 24.99, .89, 1.00)")
        return price

    def __repr__(self):
        return f"<Name:{self.name}, Price:{self.price}>"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    grocery_id = db.Column(db.Integer, db.ForeignKey("groceries.id"), nullable=False)

    serialize_rules = ("-user.reviews",)

    @validates("content")
    def validates_content(self, key, content):
        content = content.strip()
        if len(content) > 200:
            raise ValueError("Reviews must be less than 200 characters")
        if profanity.contains_profanity(content):
            raise ValueError(
                "Please refrain from using inappropriate language in reviews"
            )
        return content

    @validates("stars")
    def validates_stars(self, key, stars):
        if not stars:
            raise ValueError("Review must include star rating - 1 through 5")
        return stars

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

    @validates("items")
    def validates_items(self, key, items):
        if not items:
            raise ValueError("Order must contain at least one item")

    def __repr__(self):
        return f"<Name:{self.name}>"
