import os
import psycopg2
from faker import Faker
import random
import math
import requests
from dotenv import load_dotenv

# Create a Faker instance
faker = Faker()
load_dotenv()

UPLOAD_FOLDER = os.path.abspath('uploads')

def fetch_local_profile_photo(gender):
    try:
        # List all files in the upload folder
        photos = os.listdir(UPLOAD_FOLDER)
        
        # Filter photos based on gender
        gender_prefix = 'woman' if gender == 2 else 'man'
        gender_photos = [photo for photo in photos if photo.startswith(gender_prefix)]
        
        # Select a random photo if available
        if gender_photos:
            return os.path.join(UPLOAD_FOLDER, random.choice(gender_photos))
        else:
            print(f"No {gender_prefix} photos found in the upload folder.")
            return None
    except Exception as e:
        print(f"Error fetching local profile photo: {e}")
        return None


def generate_random_location_within_radius(center_lat, center_lon, radius_km=500):
    # Convert radius from kilometers to degrees (approx.)
    radius_deg = radius_km / 111.32  # 1 degree of latitude is approximately 111.32 km

    # Generate random latitude and longitude within the radius
    lat_offset = random.uniform(-radius_deg, radius_deg)
    lon_offset = random.uniform(-radius_deg, radius_deg) / math.cos(math.radians(center_lat))

    return f"{round(center_lat + lat_offset, 6)},{round(center_lon + lon_offset, 6)}"

def get_random_interests(cur):
    cur.execute("SELECT id FROM interests")
    interest_ids = [row[0] for row in cur.fetchall()]
    return random.sample(interest_ids, random.randint(1, 3)) 

def get_random_relationship_type(cur):
    cur.execute("SELECT id FROM relationship_type ORDER BY RANDOM() LIMIT 1")
    return cur.fetchone()[0]

# Function to generate a central point and generate users around it
def insert_users_with_photos_and_locations(user_count):
    # Establish a database connection
    conn = psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST", "db"),
        port=os.getenv("DB_PORT", "5432")
    )
    cur = conn.cursor()

    # Generate a random central location
    center_lat = 32.2304982
    center_lon = -7.9477194
    for _ in range(user_count):
        firstname = faker.first_name()
        lastname = faker.last_name()
        email = faker.unique.email()  # Ensure unique emails
        # password = faker.password()
        aboutme = faker.sentence()
        username = faker.user_name()
        birthday = faker.date_of_birth(minimum_age=18, maximum_age=65)
        gender_id = random.choice([1, 2])  # Adjust based on your gender IDs
        
        # Generate location within 500 km radius of the central point
        location = generate_random_location_within_radius(center_lat, center_lon)
        # famerate = round(random.uniform(0, 20), 2)
        famerate = 10
        password = '$2b$10$58rnP/qa8ENM0cE28rzNfeRGEOXtzPlbZUebfcA8OEyNKsJ0itALK'


        try:
            # Insert user
            cur.execute(
                """
                INSERT INTO users (firstname, lastname, email, aboutme, password, username, famerate, birthday, gender_id, location, verified_account, setup_finished)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, true, true)
                RETURNING id
                """,
                (firstname, lastname, email, aboutme, password, username, famerate, birthday, gender_id, location)
            )
            user_id = cur.fetchone()[0]

           # Fetch local profile photo based on gender
            photo_path = fetch_local_profile_photo(gender_id)
            if photo_path:
                cur.execute(
                    """
                    INSERT INTO user_photo (user_id, photo_url, upload_date, active)
                    VALUES (%s, %s, NOW(), true)
                    """,
                    (user_id, photo_path)
                )

            # Insert interested_in_gender (opposite gender)
            opposite_gender_id = 1 if gender_id == 2 else 2  # Assuming 1 = Male, 2 = Female
            cur.execute(
                """
                INSERT INTO interested_in_gender (user_id, gender_id)
                VALUES (%s, %s)
                """,
                (user_id, opposite_gender_id)
            )

            interests = get_random_interests(cur)
            for interest_id in interests:
                cur.execute(
                    """
                    INSERT INTO user_interests (user_id, interest_id)
                    VALUES (%s, %s)
                    """,
                    (user_id, interest_id)
                )

            # Insert interested_in_relation for each user
            relationship_type_id = get_random_relationship_type(cur)
            cur.execute(
                """
                INSERT INTO interested_in_relation (user_id, relationship_type_id)
                VALUES (%s, %s)
                """,
                (user_id, relationship_type_id)
            )

        except psycopg2.errors.UniqueViolation:
            print(f"Duplicate email found: {email}. Skipping.")
        except Exception as e:
            print(f"An error occurred: {e}")

    # Commit changes and close the connection
    conn.commit()
    cur.close()
    conn.close()

# Call the function to insert users
insert_users_with_photos_and_locations(500)

print("500 users with photos, interested_in_gender, and locations inserted successfully.")