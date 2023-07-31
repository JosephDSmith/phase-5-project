#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from config import db, app, bcrypt
from models import User, Plant, Butterfly, Tag, butterfly_tags

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        User.query.delete()
        Plant.query.delete()
        Butterfly.query.delete()
        Tag.query.delete()
        db.session.execute(butterfly_tags.delete())
        db.session.commit()

        users = []
        butterflies = []
        tags = []
        plants = []

        u1 = User(username=fake.name(), email=fake.email())
        u1.password_hash = bcrypt.generate_password_hash("password1").decode("utf-8")

        users.append(u1)

        u2 = User(username=fake.name(), email=fake.email())
        u2.password_hash = bcrypt.generate_password_hash("password1").decode("utf-8")

        users.append(u2)

        u3 = User(username=fake.name(), email=fake.email())
        u3.password_hash = bcrypt.generate_password_hash("password1").decode("utf-8")

        users.append(u3)

        db.session.add_all(users)
        db.session.commit()

        t1 = Tag(name="beautiful")
        tags.append(t1)

        t2 = Tag(name="colorful")
        tags.append(t2)

        t3 = Tag(name="rare")
        tags.append(t3)

        t4 = Tag(name="exotic")
        tags.append(t4)

        db.session.add_all(tags)
        db.session.commit()

        b1 = Butterfly(
            name="Monarch",
            image="https://wallpaperaccess.com/full/527446.jpg",
            user_id=rc(users).id,
            genus_species="Danaus plexippus",
            conservation_status="endangered",
        )
        butterflies.append(b1)

        b2 = Butterfly(
            name="Blue Morpho",
            image="https://cdn.pixabay.com/photo/2013/06/30/18/56/butterfly-142506_1280.jpg",
            user_id=rc(users).id,
            genus_species="Morpho achilles",
            conservation_status="not endangered",
        )
        butterflies.append(b2)

        b3 = Butterfly(
            name="Glasswinged",
            image="https://cdn.pixabay.com/photo/2021/04/28/17/53/glasswing-butterfly-6214689_1280.jpg",
            user_id=rc(users).id,
            genus_species="Greta oto",
            conservation_status="not endangered",
        )
        butterflies.append(b3)

        b4 = Butterfly(
            name="Saint Francis' satyr",
            image="https://alchetron.com/cdn/saint-francis-satyr-4d941ecc-4836-47b5-bab2-b2e60a03362-resize-750.jpeg",
            user_id=rc(users).id,
            genus_species="Neonympha mitchellii francisci)",
            conservation_status="endangered",
        )
        butterflies.append(b4)

        b5 = Butterfly(
            name="Queen Alexandra's Birdwing",
            image="https://miro.medium.com/v2/resize:fit:768/1*gZ0XvVXzEWSGeMLuRyspEw.jpeg",
            user_id=rc(users).id,
            genus_species="Ornithoptera alexandrae",
            conservation_status="endangered",
        )
        butterflies.append(b5)

        db.session.add_all(butterflies)
        db.session.commit()

        # 1
        butterflies_with_tags = []

        for b in butterflies:
            b.tags.append(rc(tags))
            butterflies_with_tags.append(b)

        db.session.add_all(butterflies_with_tags)
        db.session.commit()

        # 2
        # butterflies_with_tags = [b.tags.append(rc(tags)) for b in butterflies]
        # db.session.add_all(butterflies_with_tags)
        # db.session.commit()

        p1 = Plant(
            name="milkweed",
            genus_species="Asclepias syriaca",
            growing_zone="3-9",
            image="https://cdn.pixabay.com/photo/2012/02/28/15/37/butterfly-18313_1280.jpg",
            user_id=rc(users).id,
        )
        plants.append(p1)

        p2 = Plant(
            name="hyssop",
            genus_species="Hyssopus officinalis",
            growing_zone="3-9",
            image="https://cdn.pixabay.com/photo/2021/08/18/17/58/fritillary-butterfly-6556180_1280.jpg",
            user_id=rc(users).id,
        )
        plants.append(p2)

        p3 = Plant(
            name="asters",
            genus_species="Aster amellus",
            growing_zone="3-8",
            image="https://cdn.pixabay.com/photo/2012/02/26/10/54/garden-17057_1280.jpg",
            user_id=rc(users).id,
        )
        plants.append(p3)

        p4 = Plant(
            name="liatris",
            genus_species="Liatris spicata",
            growing_zone="3-8",
            image="https://cdn.pixabay.com/photo/2018/05/23/11/19/liatris-3423800_1280.jpg",
            user_id=rc(users).id,
        )
        plants.append(p4)

        db.session.add_all(plants)
        db.session.commit()

        print("...data seeding complete!")
