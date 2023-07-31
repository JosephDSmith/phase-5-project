from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

butterfly_tags = db.Table(
    "butterfly_tags",
    db.Column("butterfly_id", db.Integer, db.ForeignKey("butterflies.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id")),
    db.UniqueConstraint("butterfly_id", "tag_id", name="_butterfly_id_tag_id"),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False, name="uq_username")
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    butterflies = db.relationship("Butterfly", backref="user")
    plants = db.relationship("Plant", backref="user")

    serialize_rules = ("-butterflies.user",)

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


class Butterfly(db.Model, SerializerMixin):
    __tablename__ = "butterflies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    genus_species = db.Column(db.String, nullable=False)
    conservation_status = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    tags = db.relationship(
        "Tag", secondary=butterfly_tags, back_populates="butterflies"
    )

    serialize_rules = ("-tags.butterflies", "-user.butterflies")

    def __repr__(self):
        return f"<Name:{self.name}>"


class Plant(db.Model, SerializerMixin):
    __tablename__ = "plants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    genus_species = db.Column(db.String, nullable=False)
    growing_zone = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    serialize_rules = ("-user.plants",)

    def __repr__(self):
        return f"<Name:{self.name}, Genus/Species:{self.genus_species}, Growing Zone:{self.growing_zone}>"


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    butterflies = db.relationship(
        "Butterfly", secondary=butterfly_tags, back_populates="tags"
    )

    serialize_rules = ("-butterflies.tags",)

    def __repr__(self):
        return f"<Name:{self.name}>"
