from sqlmodel import SQLModel, Field, Session, create_engine
import datetime
from pydantic import validator, EmailStr

class Guests(SQLModel, table = True):
    name: str = Field(index = True,  primary_key = True)
    total: int | None = Field(default= None, index = True)
    attendance: bool | None = Field(default= None)

class CreateGuests(SQLModel):
    name: str = Field(index = True)
    total: int | None = Field(default= None)
    attendance: bool | None = Field(default= None)

class UpdateGuestAttendance(SQLModel):
    total: int | None = Field(default= None, index = True)
    attendance: bool | None = Field(default= None)