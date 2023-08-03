# #!/usr/bin/env python3

# # Standard library imports

# # Remote library imports


from flask import request, make_response, session, jsonify, abort, render_template
from flask_restful import Resource
from werkzeug.exceptions import NotFound
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
import ipdb

# # Local imports
from config import app, db, api, bcrypt
from models import User, Grocery, Review, Order


class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        email = form_json.get("email")
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"error": "User already exists"}, 409

        try:
            new_user = User(
                email=form_json["email"],
                first_name=form_json["first_name"],
                last_name=form_json["last_name"],
                address=form_json["address"],
                phone_number=form_json["phone_number"],
                is_admin=form_json["is_admin"],
            )
            new_user.password_hash = form_json["password"]
            db.session.add(new_user)
            db.session.commit()
            # Store the user ID in the session
            session["user_id"] = new_user.id

            response = make_response(new_user.to_dict(), 201)
            return response

        except IntegrityError as e:
            db.session.rollback()
            if "UNIQUE constraint failed" in str(e.orig):
                return {"error": "Email already associated with another user"}, 409
            else:
                return {"error": "An unexpected error has occurred"}, 500
        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 422
        finally:
            db.session.close()


api.add_resource(Signup, "/api/signup")


class Login(Resource):
    def post(self):
        json = request.get_json()
        try:
            user = User.query.filter_by(email=json["email"]).first()
            if user.authenticate(json["password"]):
                session["user_id"] = user.id
                response = make_response(user.to_dict(), 200)
                return response
        except:
            return {"error": "Incorrect Email or Password"}, 401


api.add_resource(Login, "/api/login")


class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        response = make_response("", 204)
        return response


api.add_resource(Logout, "/api/logout")


class AuthorizedSessions(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session["user_id"]).first()
            response = make_response(user.to_dict(), 200)
            return response
        except:
            response = make_response("Unauthorized", 401)
            return response


api.add_resource(AuthorizedSessions, "/api/authorized")


class Groceries(Resource):
    def get(self):
        grocery_list = [g.to_dict() for g in Grocery.query.all()]
        response = make_response(
            grocery_list,
            200,
        )
        return response

    def post(self):
        form_json = request.get_json()
        try:
            new_grocery = Grocery(
                name=form_json["name"],
                image=form_json["image"],
                category=form_json["category"],
                price=form_json["price"],
                user_id=session["user_id"],
            )
            db.session.add(new_grocery)
            db.session.commit()

            response = make_response(
                new_grocery.to_dict(),
                201,
            )
            return response

        except IntegrityError as e:
            db.session.rollback()
            return {"error": "An unexpected error has occurred"}, 500

        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 422
        finally:
            db.session.close()


api.add_resource(Groceries, "/api/groceries")


class GroceryByID(Resource):
    def get(self, id):
        grocery = Grocery.query.filter_by(id=id).first()
        if not grocery:
            return {"error": "The item you are looking for cannot be found"}, 404
        response = make_response(grocery.to_dict(), 200)

        return response

    def patch(self, id):
        grocery = Grocery.query.filter_by(id=id).first()
        if not grocery:
            return {"error": "The item you are looking for cannot be found"}, 404
        user = User.query.get(session["user_id"])
        if not user.is_admin:
            return {"error": "You are not authorized to perform this action"}, 401

        form_json = request.get_json()

        try:
            for attr in form_json:
                setattr(grocery, attr, form_json[attr])

            db.session.add(grocery)
            db.session.commit()

            response = make_response(grocery.to_dict(), 200)
            return response

        except IntegrityError as e:
            db.session.rollback()
            return {"error": "An unexpected error has occurred"}, 500

        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 422
        finally:
            db.session.close()

    def delete(self, id):
        grocery = Grocery.query.filter_by(id=id).first()
        if not grocery:
            return {"error": "The item you are looking for cannot be found"}, 404
        user = User.query.get(session["user_id"])
        if not user.is_admin:
            return {"error": "You are not authorized to perform this action"}, 401

        db.session.delete(grocery)
        db.session.commit()

        response = make_response("grocery deleted", 204)

        return response


api.add_resource(GroceryByID, "/api/groceries/<int:id>")


class Reviews(Resource):
    def get(self, id):
        grocery = Grocery.query.get(id)
        if not grocery:
            return {"error": "The grocery item you are looking for cannot be found"}, 404

        review_list = [r.to_dict() for r in grocery.reviews]
        response = make_response(review_list, 200)

        return response

    def post(self):
        form_json = request.get_json()
        try:
            new_review = Review(
                name=form_json["name"],
                genus_species=form_json["genus_species"],
                image=form_json["image"],
                growing_zone=form_json["growing_zone"],
                user_id=session["user_id"],
            )
        except ValueError as e:
            abort(422, e.args[0])

        db.session.add(new_plant)
        db.session.commit()

        response = make_response(
            new_plant.to_dict(),
            201,
        )
        return response


api.add_resource(Reviews, "/api/groceries/<int:id>/reviews")


# class PlantByID(Resource):
#     def get(self, id):
#         plant = Plant.query.filter_by(id=id).first()
#         if not plant:
#             raise NotFound
#         response = make_response(plant.to_dict(), 200)

#         return response

#     def patch(self, id):
#         plant = Plant.query.filter_by(id=id).first()
#         if not plant:
#             raise NotFound
#         if plant.user_id != session["user_id"]:
#             abort(401, "Unauthorized")
#         else:
#             form_json = request.get_json()
#             for attr in form_json:
#                 setattr(plant, attr, form_json[attr])

#             db.session.add(plant)
#             db.session.commit()

#             response = make_response(plant.to_dict(), 200)
#             return response

#     def delete(self, id):
#         plant = Plant.query.filter_by(id=id).first()
#         if not plant:
#             raise NotFound
#         if plant.user_id != session["user_id"]:
#             abort(401, "Unauthorized")
#         db.session.delete(plant)
#         db.session.commit()

#         response = make_response("Plant Deleted", 204)

#         return response


# api.add_resource(PlantByID, "/api/plants/<int:id>")


# class ButterflyTag(Resource):
#     def get(self, id):
#         butterfly = Butterfly.query.get(id)
#         if not butterfly:
#             response = make_response({"error": "Butterfly not found"}, 404)
#         else:
#             tag_list = [tag.to_dict() for tag in butterfly.tags]
#             response = make_response(tag_list, 200)
#         return response

#     def post(self, id):
#         json = request.get_json()
#         tag = Tag.query.filter_by(name=json["name"]).first()
#         if not tag:
#             tag = Tag(name=json["name"])
#         butterfly = Butterfly.query.filter_by(id=id).first()
#         butterfly.tags.append(tag)
#         db.session.add(butterfly)
#         db.session.commit()
#         response = make_response(butterfly.to_dict(), 201)
#         return response


# api.add_resource(ButterflyTag, "/api/butterflies/<int:id>/tag")


# # these will be all front end React unique routes
# @app.route("/")
# @app.route("/authentication")
# @app.route("/butterflies")
# @app.route("/butterflies/:id")
# @app.route("/butterflies/edit/:id")
# @app.route("/butterflies/new")
# @app.route("/plants")
# @app.route("/plants/:id")
# @app.route("/plants/new")
# @app.route("/addtothegarden")
# def index(id=0):
#     return render_template("index.html")


if __name__ == "__main__":
    app.run(port=8000, debug=True)
