from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlmodel import create_engine, SQLModel, Session, select
from dotenv import load_dotenv
import os
# development mode
#from models import *
from src.models import *
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
import uvicorn
import re


app = FastAPI()

#Setup API to be called in react
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#SQL setup
load_dotenv()
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
db = os.getenv("DB_NAME")


sqlite_url = f"mysql+pymysql://{user}:{password}@{host}:3307/{db}"
DATABASE_URL = os.getenv("DATABASE_URL", sqlite_url)
# develpoment mode
#engine = create_engine(sqlite_url, echo=True, future = True, pool_pre_ping=True)
engine = create_engine(DATABASE_URL, echo=True, future = True, pool_pre_ping=True)

def create_tables():
    SQLModel.metadata.create_all(engine)


#create_tables()

def get_session():
    with Session(engine) as session:
        yield session
SessionDep = Annotated[Session, Depends(get_session)]


# help sanitize db
def get_database_info():
    """Returns database type and sanitized URL for display."""
    if DATABASE_URL.startswith("sqlite"):
        return {
            "type": "SQLite",
            "url": DATABASE_URL,
        }
    elif DATABASE_URL.startswith("postgresql"):
        # Mask the password in the URL for security
        sanitized = re.sub(r"://([^:]+):([^@]+)@", r"://\1:****@", DATABASE_URL)
        return {
            "type": "PostgreSQL",
            "url": sanitized,
        }
    else:
        return {
            "type": "Unknown",
            "url": "Not configured",
        }

@app.get("/guests")
async def readGuests(session: SessionDep) -> list[Guests]:
    guests = session.exec(select(Guests))
    return guests

@app.post("/addguests")
async def addGuests(user:CreateGuests, session: SessionDep) -> CreateGuests:
    db_guest = Guests(**user.model_dump())
    session.add(db_guest)
    session.commit()
    session.refresh(db_guest)
    return db_guest

@app.get("/guests/{guest_name}")
async def checkGuests(guest_name: str, session: SessionDep) -> Guests:
    guest = session.get(Guests, guest_name)
    if not guest:
        raise HTTPException(status_code=404,detail= "Guest not found")
    return guest

@app.patch("/guests/{guest_name}", response_model=Guests)
async def patchGuests(guest_name:str, user: UpdateGuestAttendance, session: SessionDep):
    db_guest = session.get(Guests, guest_name)
    if not db_guest:
        raise HTTPException(status_code=404, detail= "Guest not found")
    guest_data = user.model_dump(exclude_unset=True)
    db_guest.sqlmodel_update(guest_data)
    session.add(db_guest)
    session.commit()
    session.refresh(db_guest)
    return db_guest

if __name__ == '__main__':
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(host='0.0.0.0', port= port)