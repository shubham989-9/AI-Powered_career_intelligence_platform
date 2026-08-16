from getpass import getpass

from app.database import SessionLocal
from app.models.user import User
from app.utils.security import hash_password


def create_admin():

    db = SessionLocal()

    try:

        print("\n===================================")
        print("      HirePulse Admin Creator")
        print("===================================\n")

        email = input("Admin Email: ").strip()
        full_name = input("Admin Name: ").strip()

        password = getpass("Admin Password: ")
        confirm_password = getpass("Confirm Password: ")


        if not email:
            print("Email is required.")
            return

        if not full_name:
            print("Admin name is required.")
            return

        if not password:
            print("Password is required.")
            return

        if password != confirm_password:
            print("Passwords do not match.")
            return


        existing_user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )


        # =================================================
        # Existing account
        # =================================================

        if existing_user:

            if existing_user.role == "Admin":

                print("\nAdmin account already exists.")

            else:

                print(
                    "\nThis email already belongs to a Student account."
                )

                print(
                    "Use another email for the Admin account."
                )

            return


        # =================================================
        # Create Admin
        # =================================================

        admin = User(
            full_name=full_name,
            email=email,
            password=hash_password(password),
            role="Admin",
            is_active=True
        )


        db.add(admin)
        db.commit()
        db.refresh(admin)


        print("\n===================================")
        print("Admin account created successfully!")
        print("===================================")
        print(f"Name  : {admin.full_name}")
        print(f"Email : {admin.email}")
        print("Role  : Admin")
        print("===================================\n")


    except Exception as error:

        db.rollback()

        print("\nFailed to create admin.")
        print("Error:", error)


    finally:

        db.close()


if __name__ == "__main__":
    create_admin()